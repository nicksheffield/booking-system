angular.module('app.directives')

.directive('selectDark', function() {
	function link(scope, element, attrs, $select) {
		element.addClass('ui-select-dark')
		console.log('el', element)
	}

	return {
		restrict: 'A',
		require: 'uiSelect',
		link: link
	}
})