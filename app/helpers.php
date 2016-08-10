<?php

function randInt($length) {
	$min = '';
	$max = '';

	for($i=0; $i<$length; $i++) {
		$min .= '0';
		$max .= '9';
	}

	return random_int((int)$min, (int)$max);
}