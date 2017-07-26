angular.module('app.directives')

.directive('myTable', function($filter) {
	function link(scope, el, attrs) {

		window.scope = scope
		scope.items = scope.data.items

		scope.buttons = scope.data.buttons.reduce((s, name) => {
			s[name] = true
			return s
		},{})

		scope.cols = scope.data.cols.map(col => {
			col.getProp = item => {
				if(!item) return
				return col.getter ? col.getter(item) : item[col.prop]
			}

			col.sorter = {dir: null}
			col.sorter.switch = () => col.sorter.dir = (!col.sorter.dir ? '+' : (col.sorter.dir === '+' ? '-' : null))
			col.filter = ''

			return col
		})
		
		scope.filters = scope.cols.map(col => {
			return col.getProp()
		})

		scope.allSorts = () => {
			const orders = []

			scope.cols.forEach(col => {
				let sorter = col.sorter
				if(sorter.dir) {
					orders.push(sorter.dir + col.prop)
				}
			})

			return orders
		}

		scope.allFilters = (value, index, array) => {
			let filtered = true

			scope.cols.forEach(col => {
				let filterVal = (typeof col.filter === 'string' ? col.filter : (
					col.filter !== null ? col.filter[col.dropdown.display.text] : ''
				))

				if(col.getProp(value).toLowerCase().indexOf(filterVal.toLowerCase()) === -1) {
					filtered = false
				}
			})

			return filtered
		}
	}

	return {
		restrict: 'E',
		link: link,
		replace: true,
		templateUrl: 'directives/data-table/data-table.html',
		scope: {
			data: '=',
			page: '=',
			filtered: '='
		}
	}
})