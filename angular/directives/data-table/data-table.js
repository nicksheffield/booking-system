angular.module('app.directives')

.directive('myTable', function($filter) {
	function link(scope, el, attrs) {

		window.dataTable = scope
		scope.items = scope.data.items
		scope.filtered = []

		scope.page = 1

		scope.limits = [{n: 10}, {n: 20}, {n: 50}, {n: 100}]
		scope.limit = scope.limits[0]

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

			if(orders.length) return orders
			if(scope.data.orderBys) return scope.data.orderBys
			return []
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

		const doFilter = () => {
			// item in items | filter: allFilters | orderBy: allSorts()
			scope.page = 1
			const filter = $filter('filter')
			const orderBy = $filter('orderBy')
			scope.filtered = orderBy(filter(scope.data.items, scope.allFilters), scope.allSorts())
			console.log(scope.filtered[0])
		}

		scope.$watch('data.items', doFilter)
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