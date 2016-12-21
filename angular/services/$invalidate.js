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
		if($auth.getPayload() && $auth.getPayload().admin) {
			// if logged in as admin
			service.add([
				'user',
				'users',
				'groups',
				'group_types',
				'product_types',
				'products',
				'units'
			])
		} else {
			// if not logged in, or logged in as student
			service.add([
				'user',
				'groups',
				'products',
				'units',
			])
		}
	}

	service.except = function(types) {
		service.all()

		types.forEach(function(type) {
			service.invalidated = _.reject(service.invalidated, (t) => t == type)
		})
	}
	
	service.load = function() {
		var invalid = []
		
		_.forEach(service.invalidated, function(i) {
			var thing
			
			switch(i) {
				case 'user':
					thing = $load.user()
					$store.user = thing
					invalid.push(thing.$promise);
				break;
				case 'users':
					thing = $load.users()
					$store.users = thing
					invalid.push(thing.$promise);
				break;
				case 'units':
					thing = $load.units()
					$store.units = thing
					invalid.push(thing.$promise);
				break;
				case 'groups':
					thing = $load.groups()
					$store.groups = thing
					invalid.push(thing.$promise);
				break;
				case 'products':
					thing = $load.products()
					$store.products = thing
					invalid.push(thing.$promise);
				break;
				case 'bookings':
					thing = $load.bookings()
					$store.bookings = thing
					invalid.push(thing.$promise);
				break;
				case 'group_types':
					thing = $load.group_types()
					$store.group_types = thing
					invalid.push(thing.$promise);
				break;
				case 'product_types':
					thing = $load.product_types()
					$store.product_types = thing
					invalid.push(thing.$promise);
				break;
			}
		})
		
		service.invalidated = []
		
		return invalid
	}
	
	service.add(['groups'])
	
	if($auth.isAuthenticated()) {
		service.all()
	}
	
	// invalidate everything every 5 minutes
	$interval(function() {
		service.all()
	}, 5 * 60 * 1000)

	return service
})