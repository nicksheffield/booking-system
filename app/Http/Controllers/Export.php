<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Models\Unit;
use App\Models\User;

use Carbon\Carbon;

class Export extends Controller
{
	public function units()
	{
		$units = Unit::all();
		$str = "product_name,unit_number,serial_number,asset_number";

		foreach($units as $unit) {
			$arr = [
				$unit->product ? $unit->product->name : '',
				$unit->unit_number,
				$unit->serial_number,
				$unit->asset_number
			];

			$str .= "\n" . implode(',', $arr);
		}

		return $str;
	}

	public function users()
	{
		$users = User::all();
		$str = "Full Name,Email (Student) (Contact),Mobile Phone (Student) (Contact),Take2 ID (Student) (Contact),Date of Birth - New (Student) (Contact),Admin,Intake";

		foreach($users as $user) {
			$arr = [
				$user->name,
				$user->email,
				$user->phone,
				$user->id_number,
				$user->dob ? Carbon::parse($user->dob)->format('d-m-Y') : null,
				$user->admin,
				$user->group ? $user->group->code : null
			];

			$str .= "\n" . implode(',', $arr);
		}

		return $str;
	}

}
