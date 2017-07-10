angular.module('app.directives')

.directive('dropdown', function($timeout) {
	function link(scope, el, attrs) {

		scope.nullable = attrs.nullable !== undefined
		scope.listDown = true
		scope.filter_val = ''
		scope.filter_text = ''
		scope.short = attrs.short !== undefined
		scope.placeholder = attrs.placeholder !== undefined ? attrs.placeholder : 'Search...'

		var elem = el[0]
		var dropdownList = el.find('.ns-dropdown-list')
		var ignoreBlur = false

		function checkHeight() {
			var offset = $(elem).offset()
			
			dropdownList.removeClass('ns-dropdown-hide')
			var listHeight = dropdownList.height()

			if(window.innerHeight > offset.top + el.height() + listHeight) {
				dropdownList.removeClass('ns-dropdown-list-up')
			} else {
				dropdownList.addClass('ns-dropdown-list-up')
			}
		}

		scope.orderFunc = function(i) {
			if(scope.orderBy) {
				return scope.orderBy(i)
			} else {
				return false
			}
		}

		scope.hideFunc = function(item, index, array) {
			if(scope.hide) {
				return scope.hide(item, index, array)
			} else {
				return {}
			}
		}

		scope.text = function(item) {
			if(!scope.display.text) return ''
			if(typeof scope.display.text == 'function') {
				return scope.display.text(item)
			} else {
				return item[scope.display.text]
			}
		}

		scope.subtext = function(item) {
			if(!scope.display.subtext) return ''
			if(typeof scope.display.subtext == 'function') {
				return scope.display.subtext(item)
			} else {
				return item[scope.display.subtext]
			}
		}

		scope.select = function(item) {
			dropdownList.addClass('ns-dropdown-hide')

			var target = el.find('[data-id=' + item.id + ']')

			el.find('.ns-dropdown-item.focused').removeClass('focused')
			target.addClass('focused')

			$timeout(function() {
				scope.ngModel = attrs.clone !== undefined ? _.clone(item) : item

				if(typeof scope.change == 'function') scope.change(item)

				scope.filter_text = scope.text(item)
				scope.filter_val = ''
			})
		}

		scope.clear = function() {
			scope.ngModel = null
			scope.filter_text = ''
			dropdownList.addClass('ns-dropdown-hide')
		}

		scope.$watch('ngModel', function(newVal) {
			if(newVal) scope.filter_text = scope.text(scope.ngModel)
			else scope.filter_text = ''
		})

		el
		.on('mousedown', '.ns-dropdown-list', function(e) {
			ignoreBlur = true
		})
		.on('focus', 'input', function(e) {
			scope.$apply(function() {
				scope.filter_text = ''
				dropdownList.removeClass('ns-dropdown-hide')
				ignoreBlur = false
				checkHeight()

				$timeout(function() {
					if(el.find('.ns-dropdown-item.focused').length === 0) {
						el.find('.ns-dropdown-item').first().addClass('focused')
					}

					if(el.find('.ns-dropdown-item.focused')[0]) {
						el.find('.ns-dropdown-list')[0].scrollTop = el.find('.ns-dropdown-item.focused')[0].offsetTop
					}
				})
			})
		})
		.on('blur', 'input', function(e) {
			if(!ignoreBlur) {
				scope.$apply(function() {
					if(scope.ngModel) {
						scope.filter_text = scope.text(scope.ngModel)
					} else {
						scope.filter_text = ''
					}
					
					dropdownList.addClass('ns-dropdown-hide')
				})

				scope.filter_val = ''
			}
		})
		.on('keydown', 'input', function(e) {
			var focused = el.find('.ns-dropdown-item.focused')
			var index = focused.index()
			
			$timeout(function() {
				scope.filter_val = scope.filter_text

				if(el.find('.ns-dropdown-item.focused').length === 0) {
					el.find('.ns-dropdown-item').first().addClass('focused')
				}
			})

			if(e.which == 13) { // enter
				e.preventDefault()
				if(scope.filtered.length) {
					scope.select(scope.filtered[index])
					$(this).trigger('blur')
				}
			}

			if(e.which == 27) { // esc
				e.preventDefault()
				$(this).trigger('blur')
				scope.filter_text = ''
			}

			if(e.which == 38) { // up
				e.preventDefault()
				if(index >= 0) {
					el
						.find('.ns-dropdown-item.focused')
						.removeClass('focused')
						.prev()
						.addClass('focused')
				}
			}

			if(e.which == 40) { // down
				e.preventDefault()
				if(index < scope.filtered.length - 1) {
					el
						.find('.ns-dropdown-item.focused')
						.removeClass('focused')
						.next()
						.addClass('focused')
				}
			}

			if(e.which == 38 || e.which == 40) { // up or down
				var target = el.find('.ns-dropdown-item.focused')[0]
				var list = el.find('.ns-dropdown-list')[0]

				if(target && target.offsetTop < list.scrollTop) { // above the top edge
					list.scrollTop = target.offsetTop
				} else if(target && target.offsetTop + target.clientHeight > list.clientHeight + list.scrollTop) { // below the bottom edge
					list.scrollTop = target.offsetTop + target.clientHeight - list.clientHeight
				}
			}

			if(e.which == 9) { // tab
				var highlighted = el.find('.focused')
				var id = highlighted.data('id')

				var item = scope.filtered.find(i => i.id == id)

				if(!item) item = scope.filtered[0]

				scope.select(item)
			}
		})
	}

	return {
		link,
		restrict: 'E',
		replace: true,
		templateUrl: 'directives/dropdown/dropdown.html',
		scope: {
			'data': '=',
			'ngModel': '=',
			'display': '=',
			'orderBy': '=',
			'hide': '=',
			'change': '=',
			'icon': '@'
		}
	}
})