angular.module('app.services')

.factory('$bookingFilter', function($rootScope, $store) {
	var service = {}

	// ------------------------------------------------
	// Open Status
	// ------------------------------------------------

	service.open = localStorage.filterOpen == "true"

	service.saveOpen = function() {
		localStorage.filterOpen = service.open
	}

	service.toggleOpen = function() {
		service.open = !service.open
		service.saveOpen()
	}

	// ------------------------------------------------
	// Filter Options
	// ------------------------------------------------

	service.defaults = {
		before: '',
		after: '',
		overdue: false,
		closed: false,
		issued: true,
		booked: true,
		limit: 10,
		page: 1
	}

	service.options = _.clone(service.defaults)

	service.process = function() {
		service.options.limit = parseInt(service.options.limit)
		service.options.page = parseInt(service.options.page)

		for(var prop in service.options) {
			if(service.options[prop] == 'true')  service.options[prop] = true
			if(service.options[prop] == 'false') service.options[prop] = false
		}

		service.inDOM   = _.clone(service.options)

		if(service.inDOM.before) service.inDOM.before = new Date(parseInt(service.inDOM.before + '000'))
		if(service.inDOM.after)  service.inDOM.after  = new Date(parseInt(service.inDOM.after + '000'))
	}

	service.applyParams = function(params) {
		service.options = _.merge(service.options, params)
		service.process()
	}

	service.clear = function() {
		service.inDOM = _.clone(service.defaults)
		service.apply()
	}

	service.apply = function() {
		service.options = _.clone(service.inDOM)

		if(service.options.before) service.options.before = Math.floor(new Date(service.options.before).valueOf() / 1000)
		if(service.options.after)  service.options.after  = Math.floor(new Date(service.options.after).valueOf() / 1000)
	}

	return service
})