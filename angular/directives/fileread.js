angular.module('app.directives')

.directive('fileread', function() {
	return {
		scope: {
			fileread: '=',
			loader: '='
		},
		link: function(scope, element, attributes) {
			var file = null

			if(!scope.loader) scope.loader = {}

			element.bind('change', function(changeEvent) {
				file = changeEvent.target.files[0]
				scope.loader.load()
				// element.val(null)
			})

			scope.loader.load = function() {
				var reader = new FileReader()
				
				reader.readAsText(file)

				reader.onload = function(loadEvent) {
					scope.$apply(function() {
						scope.fileread = loadEvent.target.result
						scope.loader.loaded(loadEvent.target.result)
					})
				}
			}
		}
	}
})