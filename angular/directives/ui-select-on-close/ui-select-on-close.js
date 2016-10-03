angular.module('app.directives')

.directive('uiSelectOnClose', function() {
	function link(scope, element, attrs, $select) {
		console.log($select)

		angular.element($select.searchInput)
			.on('keyup', function() {
				var search = this.value

				_.forEach($select.items, function(item) {
					var a = item.unit_number

					if(search == a) {
						$select.select(item)
					}
				})
			})
	}

	return {
		require: 'uiSelect',
		link: link
	}
})