@extends('layouts.app')

@section('content')
<header layout="row" align="center">
	<img src="/images/yoobee_logo_light.svg" alt="">
	<h2>Reset Password</h2>
</header>

<div class="panel panel-default">
	<div class="panel-body">
		<form class="form-horizontal" role="form" method="POST" action="{{ url('/password/reset') }}">
			{{ csrf_field() }}

			<input type="hidden" name="token" value="{{ $token }}">
			<input type="hidden" name="email" value="{{ $email }}">

			{{-- <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}" layout="row" align="center">
				<label for="email">E-Mail Address</label>

				<div>
					<input id="email" type="email" class="form-control" name="email" value="{{ $email or old('email') }}">

					@if ($errors->has('email'))
						<span class="help-block">
							<strong>{{ $errors->first('email') }}</strong>
						</span>
					@endif
				</div>
			</div> --}}

			<div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}" layout="row" align="center">
				<label for="password">Password</label>

				<div>
					<input id="password" type="password" class="form-control" name="password">

					@if ($errors->has('password'))
						<span class="help-block">
							<strong>{{ $errors->first('password') }}</strong>
						</span>
					@endif
				</div>
			</div>

			<div class="form-group{{ $errors->has('password_confirmation') ? ' has-error' : '' }}" layout="row" align="center">
				<label for="password-confirm">Confirm Password</label>
				<div>
					<input id="password-confirm" type="password" class="form-control" name="password_confirmation">

					@if ($errors->has('password_confirmation'))
						<span class="help-block">
							<strong>{{ $errors->first('password_confirmation') }}</strong>
						</span>
					@endif
				</div>
			</div>

			<div class="form-group" layout="row" align="center">
				<label></label>
				<button type="submit" class="btn btn-primary">
					<i class="fa fa-check"></i> Set Password
				</button>
			</div>
		</form>
	</div>
</div>
@endsection
