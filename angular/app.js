angular.module('app.controllers', [])
angular.module('app.directives', [])
angular.module('app.resources', [])
angular.module('app.services', [])
angular.module('app.filters', [])
angular.module('app.routes', [])
angular.module('app.views', [])
angular.module('app.auth', [])

angular.module('app', [
	'ngResource',
	'ngSanitize',
	'satellizer',
	'ui.bootstrap',
	'ui.bootstrap.tpls',
	'ui.router',
	'ui.select',

	'app.controllers',
	'app.directives',
	'app.resources',
	'app.services',
	'app.filters',
	'app.routes',
	'app.views',
	'app.auth'
])