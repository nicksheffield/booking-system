angular.module('app.directives')

.directive('dropdown2', function() {
	function link(scope, element, attrs) {
		const config = scope.config
		const items = scope.items

		scope.unique = parseInt(Math.random() * 99999)

		scope.selected = config.multiple ? [] : null

		scope.context = 'blurred'

		scope.simpleItems = scope.items.map(item => {
			return {
				id: item[config.id],
				text: item[config.text]
			}
		})

		scope.initialize = () => {
			// if(scope.ngModel) {
			// 	if(config.multiple) {
			// 		scope.selected = scope.ngModel.map(realItem =>
			// 			scope.simpleItems.find(simpleItem =>
			// 				simpleItem.id === realItem[config.id]))
			// 	} else {
			// 		scope.selected = scope.ngModel
			// 	}
			// }

			if(config.multiple) {
				if(scope.ngModel) {
					scope.selected = scope.ngModel.map(realItem =>
						scope.simpleItems.find(simpleItem =>
							simpleItem.id === realItem[config.id]))
				}
				
				if(!scope.selected.length && config.disableOnEmpty) {
					scope.ngModel = scope.items
				}
			} else {
				if(scope.ngModel) {
					scope.selected = scope.ngModel
				}
			}

			scope.updateInput()
		}

		scope.focus = () => {
			scope.context = 'focused'
			scope.updateInput()
		}

		scope.blur = () => {
			scope.context = 'blurred'
			scope.updateInput()
		}

		scope.isFocused = () => {
			return scope.context === 'focused'
		}

		scope.isBlurred = () => {
			return scope.context === 'blurred'
		}

		scope.isSelected = (item) => {
			if(config.multiple) {
				return !!scope.selected.find(i => i === item)
			} else {
				return scope.selected === item
			}
		}

		scope.hasSelected = () => {
			if(config.multiple) {
				return !!scope.selected.length
			} else {
				return !!scope.selected
			}
		}

		scope.getRealSelected = (item) => {
			return scope.items.find(y => y[config.id] === item.id)
		}

		scope.updateInput = () => {
			if(scope.context === 'blurred') {
				if(config.multiple) {
					scope.input = ''
				} else {
					scope.input = scope.selected ? scope.selected.text : ''
				}
			}

			if(scope.context === 'focused' && !config.multiple) {
				scope.input = ''
			}

			if(config.multiple) {
				config.placeholder = [
					scope.selected.length,
					scope.selected.length === 1 ? 'item' : 'items',
					'selected'
				].join(' ')
			}
		}
		
		scope.choose = (item) => {
			scope.select(item)

			if(config.multiple) {
				scope.updateInput()
			} else {
				scope.blur()
			}
		}

		scope.select = (item) => {
			if(config.multiple) {
				if(scope.isSelected(item)) {
					scope.selected = scope.selected.filter(x => x !== item)
				} else {
					scope.selected.push(item)
				}

				if(!scope.selected.length && config.disableOnEmpty) {
					scope.ngModel = scope.items
				} else {
					scope.ngModel = scope.selected.map(x => {
						return scope.getRealSelected(x)
					})
				}
				
				
			} else {
				scope.selected = item
				scope.ngModel = scope.getRealSelected(item)
			}
		}

		scope.clear = () => {
			if(config.multiple) {
				scope.selected = []

				if(config.disableOnEmpty) {
					scope.ngModel = scope.items
				} else {
					scope.ngModel = []
				}
			} else {
				scope.selected = null
				scope.ngModel = null
			}

			scope.updateInput()
		}

		element
			.on('focus', '.ns-dropdown2-input', () => {
				scope.$apply(scope.focus)
			})

		angular.element('html')
			.on('click', function(e) {
				let target = angular.element(e.target)

				if(scope.isFocused() && target.closest('#dropdown-' + scope.unique).length === 0) {
					scope.$apply(() => scope.blur())
				}
			})
		
		scope.initialize()
	}

	return {
		link,
		restrict: 'E',
		replace: true,
		templateUrl: 'directives/dropdown2/dropdown2.html',
		scope: {
			'ngModel': '=',
			'items': '=',
			'config': '='
		}
	}
})