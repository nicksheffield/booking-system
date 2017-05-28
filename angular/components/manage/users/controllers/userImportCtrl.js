angular.module('app.controllers')

.controller('userImportCtrl', function($scope, $q, $invalidate, $store, $location, User) {

	$scope.users = []
	$scope.errors = []
	
	$scope.$watch('file', function(newVal, oldVal) {
		if(newVal) {
			$scope.users = []
			$scope.errors = []
			var lines = newVal.split('\n')

			var cols = lines.shift().split(',')

			lines.forEach(line => {
				var newUser = new User()

				var values = line.split(',')

				values.forEach((val, i) => {
					if(cols[i] == 'group_id') {
						var group = $store.get('groups', {code: val})
						
						if(group) {
							newUser._group = group
							newUser.group_id = newUser._group.id
						} else {
							newUser._nogroup = val
							$scope.errors.push({message: 'Group "' + val + '" not found'})
						}
					} else {
						newUser[cols[i]] = val
					}
				})

				$scope.users.push(newUser)
			})
		}
	})

	$scope.import = function() {
		if(!$scope.users.length) return

		if($scope.errors.length) {
			if(!confirm('There ' + ($scope.errors.length == 1 ? 'is an unresolved issue' : 'are ' + $scope.errors.length + ' unresolved issues') + '. Are you sure you want to import?')) {
				return
			}
		}

		var promises = $scope.users.map(user => user.$save().$promise)

		$q.all(promises).then(function(values) {
			$invalidate.add('users')
			$location.path('/manage/user')
		})
	}
	
})

.directive("fileread", function () {
	return {
		scope: {
			fileread: "="
		},
		link: function (scope, element, attributes) {
			element.bind("change", function (changeEvent) {
				var reader = new FileReader();
				reader.onload = function (loadEvent) {
					scope.$apply(function () {
						scope.fileread = loadEvent.target.result;
					});
				}
				reader.readAsText(changeEvent.target.files[0]);
				
				element.val(null)
			});
		}
	}
})