angular.module('app.controllers')

.controller('userImportCtrl', function($scope, $q, $invalidate, $store, $location, $csv, $xlsx, User) {

	$scope.users = []
	$scope.errors = []
	$scope.loader = {}
	$scope.reloading = false

	function getValue(cols, line, col) {
		var index = _.indexOf(cols, col)

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

	$scope.$watch('users', function(newVal, oldVal) {
		$scope.calculateErrors()
	}, true)

	$scope.calculateErrors = function() {
		var errors = []

		$scope.users
			.filter(u => u._add)
			.forEach(user => {
				if(user._nogroup) {
					var error = _.find(errors, {message: 'Class "' + user._nogroup + '" not found'})

					if(!error) {
						errors.push({message: 'Class "' + user._nogroup + '" not found', count: 1, type: 'group', group_code: user._nogroup})
					} else {
						error.count++
					}
				}
			})

		$scope.errors = errors
	}
	
	$scope.loader.loaded = function(file, type) {
		var data

		console.log('loaded', type)
		
		if(file && type == 'csv') {
			data = $csv.parse(file)
		} else if(file && type == 'xlsx') {
			data = $xlsx.parse(file)
		}

		$scope.users = []

		data.forEach(row => {
			var user = new User()

			// standard stuff
			user.name      = row['Preferred Name (Student) (Contact)'] + ' ' + row['Last Name (Student) (Contact)']
			user.email     = row['Email (Student) (Contact)']
			user.phone     = row['Mobile Phone (Student) (Contact)']
			user.id_number = row['Take2 ID (Student) (Contact)']
			user.password  = 'Yoobee01'
			user._add      = true

			// date stuff
			var date = row['Date of Birth - New (Student) (Contact)']

			if(type == 'xlsx') {
				date = XLSX.SSF.parse_date_code(date)
				user.dob = new Date([date.y, date.m, date.d].join('-'))
			} else {
				user.dob = new Date(date)
			}

			// group stuff
			var group = $store.get('groups', {code: row.Intake})

			if(group) {
				user._group = group
				user.group_id = user._group.id
			} else {
				user._nogroup = row.Intake
			}

			$scope.users.push(user)
		})
		
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