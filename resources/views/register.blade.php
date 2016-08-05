@extends('layouts.main')

@section('title', 'Regsiter')

@section('content')
	
	<header>
		<div class="container">
			<h1>Registration</h1>
		</div>
	</header>

	<div class="container">
		<form action="/register" method="post">
			<input type="hidden" name="_token" value="{{ csrf_token() }}">

			<div class="form-group">
				<label for="username">Username</label>
				<input type="text" id="username" name="username" class="form-control">
			</div>
			<div class="form-group">
				<label for="password">Password</label>
				<input type="text" id="password" name="password" class="form-control">
			</div>
			<div class="form-group">
				<input type="submit" class="btn btn-primary">
			</div>
		</form>
	</div>
@endsection