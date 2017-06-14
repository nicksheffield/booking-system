angular.module('app.directives')

.directive('dropdown', function($timeout) {
	function link(scope, el, attrs) {
		scope.nullable = attrs.nullable !== undefined
		scope.listDown = true
		scope.filter_val = ''

		var elem = el[0]
		var dropdownList = el.find('.ns-dropdown-list')
		var ignoreBlur = false

		function checkHeight() {
			window.elem = elem
			var offset = $(elem).offset()
			
			dropdownList.removeClass('ns-dropdown-hide')
			var listHeight = dropdownList.height()

			// console.log('el.height()', el.height())

			// console.log(window.innerHeight, offset.top + el.height() + listHeight, window.innerHeight > offset.top + el.height() + listHeight)

			if(window.innerHeight > offset.top + el.height() + listHeight) {
				dropdownList.removeClass('ns-dropdown-list-up')
			} else {
				dropdownList.addClass('ns-dropdown-list-up')
			}
		}

		scope.text = function(item) {
			if(typeof scope.display.text == 'function') {
				return scope.display.text(item)
			} else {
				return item[scope.display.text]
			}
		}

		scope.subtext = function(item) {
			if(typeof scope.display.subtext == 'function') {
				return scope.display.subtext(item)
			} else {
				return item[scope.display.subtext]
			}
		}

		scope.select = function(item) {
			dropdownList.addClass('ns-dropdown-hide')

			var target = $('[data-id=' + item.id + ']')

			el.find('.ns-dropdown-item.focused').removeClass('focused')
			target.addClass('focused')

			$timeout(function() {
				scope.ngModel = item

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

					el.find('.ns-dropdown-list')[0].scrollTop = el.find('.ns-dropdown-item.focused')[0].offsetTop
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
			'icon': '@'
		}
	}
})