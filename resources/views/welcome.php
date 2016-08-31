<!DOCTYPE html>
<html lang="en" ng-app="app">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<title ng-bind="pageTitle">Booking</title>
	
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
	<link rel="stylesheet" href="components/flexy/flexy.min.css">
	<link rel="stylesheet" href="dist/style.min.css">
	
	<script src="dist/libs.min.js"></script>
	<script src="dist/app.min.js"></script>
</head>
<body class="{{ bodyClass }}" layout="full-col">
	<div layout="row sm-col" ratio="1" ui-view></div>
	<loader></loader>
</body>
</html>