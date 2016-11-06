angular.module('app.services')

/**
*	This service's job is to take an object, or array of objects, and decorate them.
*	Some of that includes adding custom properties, which we prepend with an underscore.
*	eg.
*		user._age
*
*	But it also adds getters to the objects, so that we may link objects to one another.
*	eg.
*		We want to be able to use the following syntax to get the groups code: user.group.code
*		To do that we add a getter that searches all the groups for one that has the same id as the
*		user's group_id value, and returns that object.
*
*	Some getters have enumerable: true, which means any filters will be able to view the data of the
*	linked objects. For example, viewing all users, you may filter by group code, because the
*	user.group getter is enumerable.
*
*	Be careful with this, as you can end up with infinite loops if two objects reference eachother
*	with getters and both have enumerable: true
*
*	See: http://javascriptplayground.com/blog/2013/12/es5-getters-setters/
**/

.factory('$prepare', function($store) {
	var service = {}

	var enumerable = true
	
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
			enumerable,
			get: () => _.find($store.groups, {id: user.group_id})
		})
		
		return user
	}

	service.groups = function(groups) {
		_.forEach(groups, function(group) {
			
			Object.defineProperty(group, 'type', {
				enumerable,
				get: () => _.find($store.group_types, {id: group.group_type_id})
			})
			
			Object.defineProperty(group, 'users', {
				get: () => _.filter($store.users, {group_id: group.id})
			})
			
			group._isTutor = (id) => !!_.find(group.tutors, {id: $store.user.id})
			
		})
		
		return groups
	}
	
	service.group_types = function(group_types) {
		_.forEach(group_types, function(type) {
			
			Object.defineProperty(type, 'groups', {
				get: () => _.filter($store.groups, {group_type_id: type.id})
			})
			
		})
		
		return group_types
	}
	
	service.products = function(products) {
		_.forEach(products, function(product) {
			product._quantity = ''
			
			Object.defineProperty(product, 'type', {
				enumerable,
				get: () => _.find($store.product_types, {id: product.product_type_id})
			})
			
			Object.defineProperty(product, 'units', {
				get: () => _.filter($store.units, {product_id: product.id})
			})
		})
		
		return products
	}
	
	service.product_types = function(product_types) {
		_.forEach(product_types, function(type) {
			
			Object.defineProperty(type, 'products', {
				get: () => _.filter($store.products, {product_type_id: type.id})
			})
		})
		
		return product_types
	}
	
	service.units = function(units) {
		_.forEach(units, function(unit) {
			
			Object.defineProperty(unit, 'product', {
				enumerable,
				get: () => _.find($store.products, {id: unit.product_id})
			})
		})
		
		return units
	}
	
	service.bookings = function(bookings) {
		_.forEach(bookings, function(booking) {
			if(booking.created_at) booking.created_at = new Date(booking.created_at)
			if(booking.due_at) booking.due_at = new Date(booking.due_at)
			if(booking.pickup_at) booking.pickup_at = new Date(booking.pickup_at)
			if(booking.taken_at) booking.taken_at = new Date(booking.taken_at)
			if(booking.closed_at) booking.closed_at = new Date(booking.closed_at)

			// low is top of table
			booking._priority = 0

			if(!booking.taken_at) {
				booking._priority = 1
				booking._status = 'Booked'
			}

			if(booking.taken_at && !booking.returned_at) {
				booking._priority = 2
				booking._status = 'Issued'
			}

			if(booking.closed_at) {
				booking._priority = 3
				booking._status = 'Returned'
			}


			_.forEach(booking.products, function(product) {
				if(product.pivot.returned_at) product.pivot.returned_at = new Date(product.pivot.returned_at)
			})
			
			Object.defineProperty(booking, 'user', {
				enumerable,
				get: () => _.find($store.users, {id: booking.user_id})
			})
			
			Object.defineProperty(booking, '_products', {
				get: function() {
					var products = []

					_.forEach(booking.products, function(product) {
						products.push(_.find($store.products, {id: product.id}))
					})

					return products
				}
			})
		})
		
		return bookings
	}

	return service
})