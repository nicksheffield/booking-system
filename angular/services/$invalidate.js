angular.module('app.services')

.factory('$invalidate', function($rootScope, $auth, $store, $interval, $load) {
	var service = {
		invalidated: []
	}
	
	service.add = function(type) {
		if(type instanceof Array) {
			_.forEach(type, function(t) {
				if(service.invalidated.indexOf(t) === -1){
					service.invalidated.push(t)
				}
			})
		} else {
			service.invalidated.push(type)
		}
	}
	
	service.all = function() {
		if($store.user.admin) {
			service.add(['user', 'users', 'groups', 'group_types', 'product_types', 'products', 'units', 'bookings'])
		} else {
			service.add(['user', 'groups'])
		}
	}
	
	service.load = function() {
		var invalid = []
		
		_.forEach(service.invalidated, function(i) {
			switch(i) {
				case 'user': invalid.push($load.user().$promise); break;
				case 'users': invalid.push($load.users().$promise); break;
				case 'units': invalid.push($load.units().$promise); break;
				case 'groups': invalid.push($load.groups().$promise); break;
				case 'products': invalid.push($load.products().$promise); break;
				case 'bookings': invalid.push($load.bookings().$promise); break;
				case 'group_types': invalid.push($load.group_types().$promise); break;
				case 'product_types': invalid.push($load.product_types().$promise); break;
			}
		})

		// console.log('invalidated', invalid.length)
		
		service.invalidated = []
		
		return invalid
	}
	
	service.add(['groups'])
	
	if($auth.isAuthenticated()) {
		$load.user().$promise.then(function() {
			service.all()
			service.load()
		})
	}
	
	// invalidate everything every 5 minutes
	$interval(function() {
		service.all()
	}, 5 * 60 * 1000)

	return service
})