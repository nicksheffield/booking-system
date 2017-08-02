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

		scope.simplifyItems = () =>{
			 scope.simplifiedItems = scope.data.items.map(x => {
				const obj = {}

				if(!x.id) return {'error': 'No id on item given to data-table', 'object': x}

				obj.id = x.id

				scope.data.cols.forEach(col => {
					let propNames = col.prop.split('.')
// TODO this thing
					obj[col.prop] = col.getProp(x)
				})

				return obj
			})

			return scope.simplifiedItems
		}

		scope.getRealItem = (obj) => {
			return scope.data.items.find(x => x.id === obj.id)
		}
		
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
			let passFilter = true

			scope.cols.forEach(col => {
				let filterVal
				const filter = col.filter
				const config = filter.config

				if(!col.filter.value) return

				if(filter.type === 'dropdown2') {
					if(config.multiple) {
						// If disableOnEmpty is turned on for this dropdown2
						// then when nothing is chosen, everything is chosen, and we should even show items that don't necessarily even have a value for this col
						// but if we have a different amount of items chosen than there are total, then the user is trying to do a meaningful filter
						// so get rid of the rows with no value for this column
						if(!col.getProp(value) && filter.value.length !== filter.items.length && config.disableOnEmpty) {
							passFilter = false
							return
						}

						filterVal = filter.value.reduce((s,x) => {
							s.push(x[config.text])
							return s	
						}, []).join(', ')

						if(filterVal.toLowerCase().indexOf(col.getProp(value).toLowerCase()) === -1) {
							passFilter = false
						}
					} else {
						filterVal = filter.value[config.text]
						if(col.getProp(value).toLowerCase().indexOf(filterVal.toLowerCase()) === -1) {
							passFilter = false
						}
					}
				} else {
					filterVal = String(filter.value)
					if(col.getProp(value).toLowerCase().indexOf(filterVal.toLowerCase()) === -1) {
						passFilter = false
					}
				}

				
			})

			return passFilter
		}

		const doFilter = () => {
			scope.data.page = 1
			const filter = $filter('filter')
			const orderBy = $filter('orderBy')
			scope.filtered = orderBy(filter(scope.simplifiedItems, scope.allFilters), scope.allSorts())
			console.log('scope.simplifiedItems', scope.simplifiedItems)
			console.log('scope.data.items', scope.data.items)
		}

		scope.data.allSorts = scope.allSorts
		scope.data.allFilters = scope.allFilters

		if(scope.data.items.hasOwnProperty('$resolved')) {
			scope.data.items.$promise.then(doFilter)
		}

		scope.$watch('data.items', scope.simplifyItems, true)
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