angular.module('app.directives')

.directive('myTable', function($filter) {
	function link(scope, el, attrs) {

		window.dataTable = scope
		scope.items = scope.data.items
		scope.filtered = []

		scope.data.page = 1

		scope.limits = scope.data.limits || [10, 25, 50, 100]
		scope.data.limit = scope.data.limit || scope.limits[0]
		scope.data.buttons = scope.data.buttons ? scope.data.buttons : []

		scope.buttons = scope.data.buttons.reduce((s, name) => {
			s[name] = true
			return s
		},{})

		scope.cols = scope.data.cols.map(col => {
			col.getProp = item => { //goto
				if(!item) return
				// return String(col.getter ? col.getter(item) : item[col.prop])
				var val = typeof col.prop === 'function' ? col.prop(item) : item[col.prop]
				return String(val)
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
					let val = col.getProp(x)
					
					obj[col.name] = val ? (isNaN(val) ? val : parseFloat(val)) : ''
				})

				if(scope.data.additionalProps) {
					scope.data.additionalProps.forEach(col => {
						let val = typeof col.prop === 'function' ? col.prop(x) : x[col.prop]

						obj[col.name] = val ? (isNaN(val) ? val : parseFloat(val)) : ''
					})
				}
				
				return obj
			})

			return scope.simplifiedItems
		}

		scope.getRealItem = (obj) => {
			return scope.data.items.find(x => x.id === obj.id)
		}
		
		scope.filters = scope.cols.map(col => col.getProp())

		scope.allSorts = () => {
			const col = scope.cols.find(col => !!col.sorter.dir)
			if(col) return `${col.sorter.dir}'${col.name}'`
			if(scope.data.orderBys) return scope.data.orderBys
			return []
		}

		scope.allFilters = (item, index, array) => {
			let passFilter = true

			// check everything about this item against all active filters
			scope.cols
				.filter(col => col.filter.value)
				.forEach(col => {
					// if this filter is a dropdown
					if(col.filter.type === 'dropdown2') {
						// if this filter is a multi-value dropdown
						if(col.filter.config.multiple) {
							// if this filter has been applied, and this item has no value
							if(!item[col.name] && col.filter.value.length !== col.filter.items.length) {
								// then the item doesn't pass the filter
								passFilter = false
							// if this filter has NOT been applied, and this item has no value
							} else {
								if(col.filter.value.length) {
									// if none of the filter values contain this items value...
									let pass
									
									if(col.filter.value.length !== col.filter.items.length) {
										pass = col.filter.value.reduce((s, x) => {
											return s || lookIn(item[col.name], x[col.filter.config.text])
										}, false)
									} else {
										pass = true
									}

									// then the item doesn't pass the filter
									if(!pass) passFilter = false
								}
							}
						// if this filter is a single-value dropdown
						} else {
							// if the items value for this column doesn't contain the value chosen in the dropdown
							if(!lookIn(item[col.name], col.filter.value[col.filter.config.text])) {
								// then the item doesn't pass the filter
								passFilter = false
							}
						}
					// if this column's filter is a text input
					} else {
						// if this items property doesn't contain the filter value
						if(!lookIn(item[col.name], col.filter.value)) {
							// then the item doesn't pass the filter
							passFilter = false
						}
					}
				})

			return passFilter
		}

		const lookIn = (haystack, needle) => {
			haystack = String(haystack).toLowerCase()
			needle   = String(needle).toLowerCase()

			return haystack.indexOf(needle) !== -1
		}

		const doFilter = () => {
			scope.data.page = 1
			const filter = $filter('filter')
			const orderBy = $filter('orderBy')
			scope.filtered = orderBy(
				filter(scope.simplifiedItems, scope.allFilters),
			scope.allSorts())
		}

		scope.data.allSorts = scope.allSorts
		scope.data.allFilters = scope.allFilters

		if(scope.data.items && scope.data.items.hasOwnProperty('$resolved')) {
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