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
	var configurable = true
	
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
			configurable,
			get: () => _.find($store.groups, {id: user.group_id})
		})
		
		Object.defineProperty(user, 'bookings', {
			get: () => _.filter($store.bookings, {user_id: user.id})
		})
		
		Object.defineProperty(user, 'notes', {
			get: () => _.filter($store.notes, {user_id: user.id})
		})
		
		return user
	}

	service.group = function(group) {
		group._isTutor = (id) => !!_.find(group.tutors, {id: $store.user.id})

		Object.defineProperty(group, 'type', {
			enumerable,
			configurable,
			get: () => _.find($store.group_types, {id: group.group_type_id})
		})
		
		Object.defineProperty(group, 'users', {
			get: () => _.filter($store.users, {group_id: group.id})
		})

		return group
	}

	service.groups = function(groups) {
		_.forEach(groups, service.group)
		
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
				configurable,
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

	service.unit = function (unit) {
		if(unit.bookings) {
			unit.bookings = unit.bookings.map(b => {
				if(b.pivot.returned_at) b.pivot.returned_at = new Date(b.pivot.returned_at)
				return b
			})
		}

		Object.defineProperty(unit, 'product', {
			enumerable,
			configurable,
			get: () => _.find($store.products, { id: unit.product_id })
		})
	}
	
	service.units = function(units) {
		_.forEach(units, service.unit)
		
		return units
	}

	service.booking = function(booking) {
		function transformDate(originalDate) {
			if(!originalDate) return undefined
			if(originalDate instanceof Date) return originalDate
			// Transform date string into what looks like an ISO string
			var iso = originalDate.replace(' ', 'T').concat('.000Z')
			
			// Transform that into a unix timestamp
			var unix = moment(originalDate).add(moment().utcOffset(), 'minutes').format('x')
			
			// Return a date object based on the timestamp
			return new Date(parseInt(unix))
		}

		if(booking.created_at)    booking.created_at    = transformDate(booking.created_at)
		if(booking.due_at)        booking.due_at        = transformDate(booking.due_at)
		if(booking.pickup_at)     booking.pickup_at     = transformDate(booking.pickup_at)
		if(booking.taken_at)      booking.taken_at      = transformDate(booking.taken_at)
		if(booking.closed_at)     booking.closed_at     = transformDate(booking.closed_at)
		if(booking.cancelled_at)  booking.cancelled_at  = transformDate(booking.cancelled_at)

		// low is top of table
		booking._priority = 0

		if(!booking.taken_at) {
			booking._priority = 1
			booking._status = 'Booked'
		}

		if(booking.taken_at && !booking.returned_at) {
			booking._priority = 2
			booking._status = 'Issued'

			if(booking.due_at.valueOf() < new Date().valueOf()) {
				booking._overdue = true
				booking._timeoverdue = moment().diff(booking.due_at, 'days')
			}
		}

		if(booking.closed_at) {
			booking._priority = 3
			booking._status = 'Closed'
		}

		if(booking.cancelled_at) {
			booking._priority = 4
			booking._status = 'Cancelled'
		}

		_.forEach(booking.products, function(product) {
			if(product.pivot.returned_at) product.pivot.returned_at = new Date(product.pivot.returned_at)
		})
		
		if(!booking.user) {
			Object.defineProperty(booking, 'user', {
				enumerable,
				configurable,
				get: () => _.find($store.users, {id: booking.user_id})
			})
		}
		
		Object.defineProperty(booking, 'created_by', {
			get: () => _.find($store.users, {id: booking.created_by_id})
		})
		
		Object.defineProperty(booking, 'issued_by', {
			get: () => _.find($store.users, {id: booking.issued_by_id})
		})
		
		Object.defineProperty(booking, 'closed_by', {
			get: () => _.find($store.users, {id: booking.closed_by_id})
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

		return booking
	}
	
	service.bookings = function(bookings) {
		_.forEach(bookings, service.booking)
		
		return bookings
	}
	
	service.notes = function(notes) {
		_.forEach(notes, function(note) {

			Object.defineProperty(note, 'history', {
				enumerable,
				configurable,
				get: function() {
					function getParent(a, n) {
						if(n.revision_of) {
							var parent = _.find($store.notes, {id: n.revision_of})

							a.push(parent)

							return getParent(a, parent)
						} else {
							return a
						}
					}

					return _.sortBy(getParent([], note), (note) => -(new Date(note.created_at).valueOf()))
				}
			})

			Object.defineProperty(note, 'user', {
				get: () => _.find($store.users, {id: note.user_id})
			})

			Object.defineProperty(note, 'writer', {
				get: () => _.find($store.users, {id: note.writer_id})
			})
		})
		
		return notes
	}

	service.kit = function(kit) {
		
		Object.defineProperty(kit, '_products', {
			get: function() {
				var products = []

				_.forEach(kit.products, function(product) {
					products.push(_.find($store.products, {id: product.id}))
				})

				return products
			}
		})

		return kit
	}

	service.kits = function(kits) {
		_.forEach(kits, service.kit)

		return kits
	}

	return service
})