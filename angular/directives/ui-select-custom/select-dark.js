angular.module('app.directives')

.directive('selectDark', function() {
	function link(scope, element, attrs, $select) {
		element.addClass('ui-select-dark')
	}

	return {
		restrict: 'A',
		require: 'uiSelect',
		link: link
	}
})