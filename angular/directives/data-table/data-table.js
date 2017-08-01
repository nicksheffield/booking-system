angular.module('app.directives')

.directive('myTable', function($filter) {
	function link(scope, el, attrs) {

		window.dataTable = scope
		scope.items = scope.data.items
		scope.filtered = []

		scope.data.page = 1

		scope.limits = scope.data.limits || [10, 25, 50, 100]
		scope.data.limit = scope.limits[0]

		scope.buttons = scope.data.buttons.reduce((s, name) => {
			s[name] = true
			return s
		},{})

		scope.cols = scope.data.cols.map(col => {
			col.getProp = item => {
				if(!item) return
				return String(col.getter ? col.getter(item) : item[col.prop])
			}

			col.sorter = {dir: null}

			col.sorter.switch = () => {
				scope.cols.filter(c => c !== col).forEach(c => c.sorter.dir = null)
				col.sorter.dir = (!col.sorter.dir ? '+' : (col.sorter.dir === '+' ? '-' : null))
			}

			if(!col.filter) col.filter = { type: 'string' }
			if(typeof col.filter.value === 'undefined') col.filter.value = ''

			return col
		})
		
		scope.filters = scope.cols.map(col => col.getProp())

		scope.allSorts = () => {
			const orders = []

			scope.cols.forEach(col => {
				let sorter = col.sorter
				if(sorter.dir) {
					orders.push(sorter.dir + col.prop)
				}
			})

			if(orders.length) return orders
			if(scope.data.orderBys) return scope.data.orderBys
			return []
		}

		scope.allFilters = (value, index, array) => {
			let filtered = true

			scope.cols.forEach(col => {
				if(col.filter.type === 'checkbox-dropdown') {
					if(col.filter.value) {
						var filterVal = col.getProp(value)

						if(!col.filter.value.filter(x => x.checked && x[col.filter.display.text] === filterVal).length) {
							filtered = false
						}
					}
				} else {
					let filterVal = (typeof col.filter.value === 'string' ? col.filter.value : (
						col.filter.value !== null ? col.filter.value[col.filter.display.text] : ''
					))

					if(col.getProp(value).toLowerCase().indexOf(filterVal.toLowerCase()) === -1) {
						filtered = false
					}
				}
				
			})

			return filtered
		}

		const doFilter = () => {
			scope.data.page = 1
			const filter = $filter('filter')
			const orderBy = $filter('orderBy')
			scope.filtered = orderBy(filter(scope.data.items, scope.allFilters), scope.allSorts())
		}

		scope.data.allSorts = scope.allSorts
		scope.data.allFilters = scope.allFilters

		if(scope.data.items.hasOwnProperty('$resolved')) {
			scope.data.items.$promise.then(doFilter)
		}

		scope.$watch('data.items', doFilter, true)
		scope.$watch('data.cols', doFilter, true)
	}

	return {
		restrict: 'E',
		link: link,
		replace: true,
		templateUrl: 'directives/data-table/data-table.html',
		scope: {
			data: '='
		}
	}
})