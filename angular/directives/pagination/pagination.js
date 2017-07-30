angular.module('app.directives')

.directive('pagination', function($state, $store, $auth, $queryString) {
	function link(scope, el, attrs) {
		
		window.pagination = scope

		scope.totalPages = []
		scope.pages = []

		const calculatePagesAmount = () => {
			var arr = []
			var n = Math.ceil(scope.data.length / scope.limit)

			for(let i=0; i<n; i++) {
				arr.push({number: i + 1})
			}

			return arr
		}

		const setPages = () => {
			let displayedPages = []

			scope.totalPages.forEach(p => {
				let currentPage = scope.page

				let pageToAdd = p.number

				let distance = 1

				if(currentPage === 1 || currentPage === scope.totalPages.length) {
					distance = 2
				}

				if(pageToAdd >= currentPage - distance && pageToAdd <= currentPage + distance) {
					displayedPages.push(p)
				}
			})

			return displayedPages
		}

		const calculatePages = () => {
			scope.totalPages = calculatePagesAmount()
			scope.pages = setPages()
		}

		scope.$watch('data', calculatePages)
		scope.$watch('limit', calculatePages)

		scope.goto = p => {
			if(!p) return
			
			scope.page = p.number
			calculatePages()
		}

		scope.first = arr => arr[0]
		scope.last  = arr => arr[arr.length - 1]

		scope.next = p => scope.totalPages[scope.totalPages.indexOf(scope.totalPages.find(page => page.number === p)) + 1]
		scope.prev = p => scope.totalPages[scope.totalPages.indexOf(scope.totalPages.find(page => page.number === p)) - 1]
	}

	return {
		restrict: 'E',
		replace: true,
		link: link,
		templateUrl: 'directives/pagination/pagination.html',
		scope: {
			page: '=',
			limit: '=',
			data: '='
		}
	}
})