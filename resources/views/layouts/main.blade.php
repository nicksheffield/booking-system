<html>
<head>
	<title>Test - @yield('title')</title>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha/css/bootstrap.min.css">
	<style>
		header {
			margin: 1em 0;
		}
	</style>
</head>
<body>

	<nav class="navbar navbar-light bg-faded">
		<a class="navbar-brand" href="#">Test</a>
		<ul class="nav navbar-nav pull-right">
			@if(Auth::guest())
				<li class="nav-item"><a href="/register" class="nav-link">Register</a></li>
				<li class="nav-item"><a href="/login" class="nav-link">Login</a></li>
			@else
				<li class="nav-item"><a href="/logout" class="nav-link">Logout</a></li>
			@endif
		</ul>
	</nav>
	<div class="container">
		@yield('content')
	</div>
</body>
</html>