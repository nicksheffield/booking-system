// https://github.com/HackedByChinese/ng-idle

var idleTimeout = 5 // this is how long (in seconds) to give warning for

angular.module('app.controllers')

.config(function(IdleProvider, KeepaliveProvider) {
	// configure Idle settings
	IdleProvider.idle(15 * 60) // in seconds (15 minutes)
	IdleProvider.timeout(idleTimeout)
	KeepaliveProvider.interval(2) // in seconds (2 seconds)
})

.run(function($auth, Idle){
	// start watching when the app runs. also starts the Keepalive service by default.

	// only start watching if the user is currently logged in
	if($auth.isAuthenticated()) {
		Idle.watch()
	}
})

.controller('idleCtrl', function($scope, $location, $state, $http, $store, $auth, Idle) {

	window.$state = $state

	setInterval(function() {
		if(!$state.$current.self.data) return
		if(!$auth.isAuthenticated() && $state.$current.self.data.conditions.indexOf('auth') !== -1) {
			$location.path('login')
		}
	}, 1000)

	$scope.$on('IdleStart', function() {
		// the user appears to have gone idle
		// console.log('IdleStart')
	})

	$scope.$on('IdleWarn', function(e, countdown) {
		// follows after the IdleStart event, but includes a countdown until the user is considered timed out
		// the countdown arg is the number of seconds remaining until then.
		// you can change the title or display a warning dialog from here.
		// you can let them resume their session by calling Idle.watch()
		$scope.$apply(function() {
			$scope.showWarnDialog(countdown)
		})
	})

	$scope.$on('IdleTimeout', function() {
		// the user has timed out (meaning idleDuration + timeout has passed without any activity)
		// this is where you'd log them

		$auth.logout().then(function() {
			$scope.hideDialog()
			$store.user = {}
			$store.resetBooking()
			$http.get('/api/logout')
			$location.path('login')
		})
	})

	$scope.$on('IdleEnd', function() {
		// the user has come back from AFK and is doing stuff. if you are warning them, you can use this to hide the dialog
		$scope.$apply(function() {
			$scope.hideDialog()
		})
	})

	$scope.$on('Keepalive', function() {
		// do something to keep the user's session alive
		// console.log('Keepalive')
	})

	$scope.dialog = {
		show: false,
		title: '',
		text: '',
		progressBar: 100
	}

	$scope.showWarnDialog = function(countdown) {
		const progressScaler = scale().domain(1, idleTimeout).range(0, 100)

		$scope.dialog.show = true
		$scope.dialog.title = 'You are idle'
		$scope.dialog.text = 'You will be logged out in <strong>' + countdown + '</strong> seconds'
		$scope.dialog.progressBar = progressScaler(countdown)
	}

	$scope.hideDialog = function() {
		$scope.dialog.show = false
	}
})

// https://gist.github.com/dsuket/51129efc9f20b9a0dd18
/**
Usage:
```javascript
	var userScale = scale()
		.domain(0, 10)
		.range(0,100);
	userScale(2);
	// => 20

	userScale.range(100, 0);
	userScale(2);
	// => 80
```
*/
function scale() {
	var domain = [];
	var range = [];

	var _scale = function(x) {
		if (domain.length < 2) {return _scale;}
		if (range.length < 2) {return _scale;}

		x = Math.max(x, domain.min);
		x = Math.min(x, domain.max);
		var x2 = distance(domain[0], x);
		var rangeVal = x2/domain.distance * range.distance;
		return range[0] + rangeVal;
	};
	function distance(x1, x2) {
		if (x1 instanceof Array) {
			x2 = x1[1];
			x1 = x1[0];
		}
		// return Math.max(x1, x2) - Math.min(x1, x2);
		return x2 - x1;
	}

	function initDistance(obj) {
		obj.distance = distance(obj);
		obj.min = Math.min.apply(Math, obj);
		obj.max = Math.max.apply(Math, obj);
		return obj;
	}
	_scale.domain = function(/* start, end */) {
		domain = Array.prototype.slice.call(arguments, 0, 2);
		initDistance(domain);
		return _scale;
	};
	_scale.range = function(/* start, end */) {
		range = Array.prototype.slice.call(arguments, 0, 2);
		initDistance(range);
		return _scale;
	};
	return _scale;
}