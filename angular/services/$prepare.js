angular.module('app.services')

.factory('$prepare', function($store) {
	var service = {}
	
	service.users = function(users) {
		_.forEach(users, service.user)
		
		return users
	}
	
	service.user = function(user) {
		if(user.admin === 2) user._role = 'Manager'
		if(user.admin === 1) user._role = 'Staff'
		if(user.admin === 0) user._role = 'Student'
		
		var duration = moment.duration(moment().diff(moment(user.dob)));
		
		user._age = duration.asYears().toFixed(0)

		if(user.dob) user.dob = new Date(user.dob)
			
		Object.defineProperty(user, 'group', {
			get: function() {
				return _.find($store.groups, (group) => group.id == user.group_id)
			}
		})
			
		return user
	}

	service.groups = function(groups) {
		_.forEach(groups, function(group) {
			
			Object.defineProperty(group, 'type', {
				get: function() {
					return _.find($store.group_types, (type) => type.id == group.group_type_id)
				}
			})
			
			Object.defineProperty(group, 'users', {
				get: function() {
					return _.filter($store.users, (user) => user.group_id == group.id)
				}
			})
			
		})
		
		return groups
	}
	
	service.group_types = function(group_types) {
		_.forEach(group_types, function(type) {
			
			Object.defineProperty(type, 'groups', {
				get: function() {
					return _.filter($store.groups, (group) => group.group_type_id == type.id)
				}
			})
			
		})
		
		return group_types
	}
	
	service.products = function(products) {
		_.forEach(products, function(product) {
			product._quantity = ''
			
			Object.defineProperty(product, 'type', {
				get: function() {
					return _.find($store.product_types, (type) => type.id == product.product_type_id)
				}
			})
			
			Object.defineProperty(product, 'units', {
				get: function() {
					return _.filter($store.units, (unit) => unit.product_id == product.id)
				}
			})
		})
		
		return products
	}
	
	service.product_types = function(product_types) {
		_.forEach(product_types, function(type) {
			
			Object.defineProperty(type, 'products', {
				get: function() {
					return _.filter($store.products, (product) => product.product_type_id == type.id)
				}
			})
		})
		
		return product_types
	}
	
	service.units = function(units) {
		_.forEach(units, function(unit) {
			
			Object.defineProperty(unit, 'product', {
				get: function() {
					return _.find($store.product_types, (product) => product.id == unit.product_id)
				}
			})
		})
		
		return units
	}
	
	service.bookings = function(bookings) {
		_.forEach(bookings, function(booking) {
			booking.due_at = new Date(booking.due_at)
			booking.pickup_at = new Date(booking.pickup_at)
			
			Object.defineProperty(booking, 'user', {
				get: function() {
					return _.find($store.users, (user) => user.id == booking.user_id)
				}
			})
		})
		
		return bookings
	}

	return service
})