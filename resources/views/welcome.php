<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title ng-bind="pageTitle">Booking</title>
	<link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha/css/bootstrap.min.css" rel="stylesheet">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
	<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet">
	<link rel="stylesheet" href="components/flexy/flexy.min.css">
	<link rel="stylesheet" href="dist/style.min.css">
	<script src="dist/libs.min.js"></script>
	<script src="dist/app.min.js"></script>
</head>
<body class="{{ bodyClass }}" layout="row" ui-view></body>
</html>