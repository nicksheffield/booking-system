angular.module('app.services')

.factory('$bookingFilter', function($rootScope, $store, $stateParams) {
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
		limit: 10
	}

	service.options = _.merge(_.clone(service.defaults), JSON.parse(localStorage.filterOptions || '{}'), $stateParams)
	service.inDOM   = _.merge(_.clone(service.defaults), JSON.parse(localStorage.filterOptions || '{}'), $stateParams)

	if(service.inDOM.before) service.inDOM.before = new Date(parseInt(service.inDOM.before + '000'))
	if(service.inDOM.after)  service.inDOM.after  = new Date(parseInt(service.inDOM.after + '000'))
	if(service.inDOM.limit)  service.inDOM.limit  = parseInt(service.inDOM.limit)

	service.saveOptions = function() {
		localStorage.filterOptions = JSON.stringify(service.options)
	}

	service.clear = function() {
		service.inDOM = _.clone(service.defaults)
		service.saveOptions()
	}

	service.apply = function() {
		service.options = _.clone(service.inDOM)

		if(service.options.before) service.options.before = Math.floor(new Date(service.options.before).valueOf() / 1000)
		if(service.options.after)  service.options.after  = Math.floor(new Date(service.options.after).valueOf() / 1000)

		service.saveOptions()
	}

	return service
})