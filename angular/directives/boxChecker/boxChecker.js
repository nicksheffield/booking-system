angular.module('app.directives')

.directive('boxChecker', function() {
	function link(scope, el, attrs) {
		el
			.on('mouseover', function(e) {
				if(boxChecker.mousedown && boxChecker.shift) {
					scope.boxChecker = boxChecker.setState
					scope.$apply()
				}
			})
			.on('mousedown', function(e) {
				boxChecker.setState = !scope.boxChecker
				boxChecker.mousedown = true
				scope.boxChecker = boxChecker.setState
				scope.$apply()
			})
			.on('click', (e) => e.preventDefault())
			.on('mouseup', () => boxChecker.mousedown = false)
	}

	return {
		restrict: 'A',
		link: link,
		scope: {
			'boxChecker': '='
		}
	}
})

var boxChecker = {
	mousedown: false,
	setState: false
}

$(window)
	.on('mouseup', () => boxChecker.mousedown = false)
	.on('keydown', (e) => {
		if(e.which == 16) {
			boxChecker.shift = true
		}
	})
	.on('keyup', (e) => {
		if(e.which == 16) {
			boxChecker.shift = false
		}
	})