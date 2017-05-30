angular.module('app.controllers')

.controller('userImportCtrl', function($scope, $q, $invalidate, $store, $location, $csv, User) {

	$scope.users = []
	$scope.errors = []
	$scope.loader = {}
	$scope.reloading = false

	function getValue(cols, line, col) {
		var index = _.indexOf(cols, col)

		console.log(col, index)

		return line[index]
	}

	$scope.reload = function() {
		$scope.reloading = true
		$invalidate.add('groups')

		$q.all($invalidate.load()).then(function() {
			if($scope.loader.load) $scope.loader.load()
			$scope.reloading = false
		})
	}
	
	$scope.loader.loaded = function(file) {
		if(file) {
			$scope.users = []
			$scope.errors = []

			var csv = $csv(file)

			var fields = {
				'Student': 'name',
				'Intake': 'group',
				'Email (Student) (Contact)': 'email',
				'Take2 ID (Student) (Contact)': 'id_number',
				'Date of Birth - New (Student) (Contact)': 'dob',
				'Mobile Phone (Student) (Contact)': 'phone',
				'Preferred Name (Student) (Contact)': 'fname',
				'Last Name (Student) (Contact)': 'lname'
			}

			var cols = csv.shift()

			cols = cols.map(col => fields[col] ? fields[col] : col)

			csv.forEach(line => {
				var newUser = new User()

				line.forEach((val, i) => {
					var col = cols[i]

					// if(!fields[col]) return

					if(col == 'group') {
						var group = $store.get('groups', {code: val})
						
						if(group) {
							newUser._group = group
							newUser.group_id = newUser._group.id
						} else {
							newUser._nogroup = val
							var error = _.find($scope.errors, {message: 'Class "' + val + '" not found'})

							if(!error) {
								$scope.errors.push({message: 'Class "' + val + '" not found', count: 1, type: 'group', group_code: val})
							} else {
								error.count++
							}
						}
					} if(col == 'name') {
						newUser.name = getValue(cols, line, 'fname') + ' ' + getValue(cols, line, 'lname')
					} else {
						newUser[col] = val
					}
				})

				if(!newUser.password) {
					newUser.password = 'Yoobee01'
				}

				newUser._add = true

				$scope.users.push(newUser)
			})
		}
	}

	$scope.import = function() {
		if(!$scope.users.length) return

		if($scope.errors.length) {
			if(!confirm('There ' + ($scope.errors.length == 1 ? 'is an unresolved issue' : 'are ' + $scope.errors.length + ' unresolved issues') + '. Are you sure you want to import?')) {
				return
			}
		} else {
			if(!confirm('Are you sure you want to import ' + ($scope.users.filter(u => u._add).length == 1 ? ' this user?' : 'these ' + $scope.users.filter(u => u._add).length + ' users?'))) {
				return
			}
		}

		var promises = $scope.users
			.filter(u => u._add)
			.map(u => u.$save().$promise)

		$q.all(promises).then(function(values) {
			$invalidate.add('users')
			$location.path('/manage/user')
		})
	}

	$scope.checkedUsers = function() {
		return $scope.users.filter(u => u._add)
	}
	
})

.directive('fileread', function() {
	return {
		scope: {
			fileread: '=',
			loader: '='
		},
		link: function(scope, element, attributes) {
			var file = null

			if(!scope.loader) scope.loader = {}

			element.bind('change', function(changeEvent) {
				file = changeEvent.target.files[0]
				scope.loader.load()
				// element.val(null)
			})

			scope.loader.load = function() {
				var reader = new FileReader()
				
				reader.readAsText(file)

				reader.onload = function(loadEvent) {
					scope.$apply(function() {
						scope.fileread = loadEvent.target.result
						scope.loader.loaded(loadEvent.target.result)
					})
				}
			}
		}
	}
})