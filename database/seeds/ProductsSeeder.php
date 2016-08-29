<?php

use Illuminate\Database\Seeder;

class ProductsSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::table('products')->delete();

		$items = [
			[
				'id' => 1,
				'name' => 'Panasonic GH4 Camera',
				'product_type_id' => 1
			],
			[
				'id' => 2,
				'name' => 'Panasonic BLF19E Battery',
				'product_type_id' => 1
			],
			[
				'id' => 3,
				'name' => 'Panasonic Battery Charger',
				'product_type_id' => 1
			],
			[
				'id' => 4,
				'name' => '14mm Prime Lens',
				'product_type_id' => 2
			],
			[
				'id' => 5,
				'name' => '24mm Prime Lens',
				'product_type_id' => 2
			],
			[
				'id' => 6,
				'name' => '35mm Prime Lens',
				'product_type_id' => 2
			],
			[
				'id' => 7,
				'name' => '50mm Prime Lens',
				'product_type_id' => 2
			],
			[
				'id' => 8,
				'name' => '85mm Prime Lens',
				'product_type_id' => 2
			],
			[
				'id' => 9,
				'name' => '22-55 Zoom Lens',
				'product_type_id' => 2
			],
			[
				'id' => 10,
				'name' => '70-300mm Zoom Lens',
				'product_type_id' => 2
			],
			[
				'id' => 11,
				'name' => 'Miller Tripod',
				'product_type_id' => 3
			],
			[
				'id' => 12,
				'name' => 'Tascam DR-70D Audio Recorder',
				'product_type_id' => 4
			],
			[
				'id' => 13,
				'name' => 'Tascam Bag',
				'product_type_id' => 4
			],
			[
				'id' => 14,
				'name' => 'Audio-Technica ATH-M40x Headphones',
				'product_type_id' => 4
			],
			[
				'id' => 15,
				'name' => 'Shotgun, Pistol Grip and Windshield',
				'product_type_id' => 4
			],
			[
				'id' => 16,
				'name' => 'Boom Pole',
				'product_type_id' => 4
			],
			[
				'id' => 17,
				'name' => 'XLR Lead',
				'product_type_id' => 4
			],
			[
				'id' => 18,
				'name' => '800 watt Redhead',
				'product_type_id' => 5
			],
			[
				'id' => 19,
				'name' => 'Ikan IB 500 LED Light',
				'product_type_id' => 5
			],
			[
				'id' => 20,
				'name' => 'Light Stand',
				'product_type_id' => 5
			],
			[
				'id' => 21,
				'name' => 'Light Disc',
				'product_type_id' => 5
			],
			[
				'id' => 22,
				'name' => 'Gel',
				'product_type_id' => 5
			],
			[
				'id' => 23,
				'name' => 'Diffusion',
				'product_type_id' => 5
			],
			[
				'id' => 24,
				'name' => 'Pegs',
				'product_type_id' => 5
			],
			[
				'id' => 25,
				'name' => 'V-Lock Battery',
				'product_type_id' => 5
			],
			[
				'id' => 26,
				'name' => 'B-Lock Battery Charger',
				'product_type_id' => 5
			],
			[
				'id' => 27,
				'name' => 'Tape',
				'product_type_id' => 5
			],
			[
				'id' => 28,
				'name' => 'Redrock Should Mount',
				'product_type_id' => 6
			],
			[
				'id' => 29,
				'name' => 'Redrock Follow Focus',
				'product_type_id' => 6
			],
			[
				'id' => 30,
				'name' => 'Glidetrack Slider',
				'product_type_id' => 6
			],
			[
				'id' => 31,
				'name' => 'ProAim Camera Dolly',
				'product_type_id' => 6
			],
			[
				'id' => 32,
				'name' => 'Kessler Pocket Jib',
				'product_type_id' => 6
			],
			[
				'id' => 33,
				'name' => 'Clapper Board',
				'product_type_id' => 6
			],
		];

		foreach($items as $item) {
			App\Models\Product::create($item);
		}
	}
}
