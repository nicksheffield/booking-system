<!DOCTYPE html>
<html lang="en" ng-app="app">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<base href="/">
	
	<title ng-bind="pageTitle">Booking</title>
	
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700">
	<link rel="stylesheet" href="dist/style.min.css">
	
	<script src="dist/libs.min.js"></script>
	<script src="dist/app.min.js"></script>
</head>
<body class="{{ bodyClass }}" layout="full-col" ng-controller="idleCtrl">
	<div class="wrapper" layout="row sm-col" ratio="1">
		<sidebar></sidebar>

		<div class="frame" ratio="1" layout="col" ui-view></div>
		
		<loader></loader>

		<div class="dialog" ng-show="dialog.show" ng-cloak>
			<div class="content">
				<h1>{{ dialog.title }}</h1>
				<p ng-bind-html="dialog.text"></p>
				<div class="progress-bar">
					<div class="progress-bar-bar" ng-style="{
						width: dialog.progressBar + '%'
					}"></div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>