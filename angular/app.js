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
	'ngIdle',
	'ui.router',
	'ui.tinymce',
	'satellizer',
	'19degrees.ngSweetAlert2',

	'app.controllers',
	'app.directives',
	'app.resources',
	'app.services',
	'app.filters',
	'app.routes',
	'app.views',
	'app.auth'
])

console.log('version:', 0.6)