angular.module('app.controllers')

.controller('userImportCtrl', function($scope, $q, $invalidate, $store, $location, $csv, $xlsx, sweetAlert, User) {

	$scope.users = []
	$scope.errors = []
	$scope.skips = []
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
		
		if(file && type == 'csv') {
			data = $csv.parse(file)
		} else if(file && type == 'xlsx') {
			data = $xlsx.parse(file)
		}

		$scope.users = []
		$scope.skips = []

		data.forEach(row => {
			var user = new User()

			// standard stuff
			if(row['Full Name']) {
				user.name  = row['Full Name']
			} else {
				user.name  = row['Preferred Name (Student) (Contact)'] + ' ' + row['Last Name (Student) (Contact)']
			}

			user.email     = row['Email (Student) (Contact)']
			user.phone     = row['Mobile Phone (Student) (Contact)']
			user.id_number = row['Take2 ID (Student) (Contact)']
			user.password  = 'Yoobee01'
			user._add      = true

			if(row.Admin) {
				user.admin = row.Admin
			}

			// date stuff
			var date = row['Date of Birth - New (Student) (Contact)']

			if(type == 'xlsx') {
				if(date.indexOf('/') !== -1) {
					user.dob = moment(date, 'MM-DD-YYYY')._d
				} else {
					date = XLSX.SSF.parse_date_code(date)
					user.dob = new Date([date.y, date.m, date.d].join('-'))
				}
			} else {
				user.dob = moment(date, 'DD-MM-YYYY')._d
			}

			// group stuff
			var group = $store.get('groups', {code: row.Intake})

			if(group) {
				user._group = group
				user.group_id = user._group.id
			} else {
				user._nogroup = row.Intake
			}


			// skip stuff
			var userExists = $store.users.find(u => u.id_number == user.id_number)
			
			if(userExists) {
				$scope.skips.push(user)

				return
			}

			$scope.users.push(user)
		})
		
	}

	$scope.import = function() {
		if(!$scope.users.length) return

		if($scope.errors.length) {
			sweetAlert.swal({
				titleText: 'Unresolved Issues',
				html: 'Do you still want to import all these users?',
				showCancelButton: true,
				cancelButtonText: "I'll fix the issues",
				confirmButtonText: "Yeah it's fine"
			})
			.then(go)
		} else {
			sweetAlert.swal({
				titleText: 'Good to go',
				html: 'You are about to import <b>' + $scope.users.filter(u => u._add).length + '</b> ' + ($scope.users.filter(u => u._add).length == 1 ? ' user' : ' users'),
				showCancelButton: true,
				cancelButtonText: "Not yet",
				confirmButtonText: "Sweet let's do it"
			})
			.then(go)
		}

		function go() {
			var promises = $scope.users
				.filter(u => u._add)
				.map(u => u.$save().$promise)

			$q.all(promises).then(function(values) {
				$invalidate.add('users')
				$location.path('/user')
			})
		}
	}

	$scope.checkedUsers = function() {
		return $scope.users.filter(u => u._add)
	}
	
})