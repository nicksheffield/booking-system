<?php

namespace App\Http\Controllers;

use Mail;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class Test extends Controller
{
	/**
	 * Send an e-mail reminder to the user.
	 *
	 * @param  Request  $request
	 * @param  int  $id
	 * @return Response
	 */
	public function sendMessage(Request $request)
	{
		$message = $request->message;

		Mail::send('email', ['message' => $message], function ($m) {
			$m->from('hello@app.com', 'Your Application');

			$m->to('numbereft@gmail.com', 'Nick Sheffield')->subject('Your Reminder!');
		});
	}
}