<?php
$get_url_query = $_SERVER["QUERY_STRING"];

parse_str($get_url_query, $query_arr);

// var_dump($query_arr);

$query_len = count($query_arr);

foreach ($query_arr as $k => $v) :
	if ($query_len == 1 && $k == "province") :
		echo '<a class="item" data-metas="city, 1">市 1</a><a class="item" data-metas="city, 2">市 2</a><a class="item" data-metas="city, 3">市 3</a><a class="item" data-metas="city, 4">市 4</a><a class="item" data-metas="city, 5">市 5</a><a class="item" data-metas="city, 6">市 6</a><a class="item" data-metas="city, 7">市 7</a><a class="item" data-metas="city, 8">市 8</a><a class="item" data-metas="city, 9">市 9</a>';
	elseif ($query_len == 2 && $k == "city") :
		foreach ($query_arr as $k => $v) :
			if ($k == 'city') :
				echo '<a class="item" data-metas="zone, 1">区 1</a><a class="item" data-metas="zone, 2">区 2</a><a class="item" data-metas="zone, 3">区 3</a><a class="item" data-metas="zone, 4">区 4</a><a class="item" data-metas="zone, 5">区 5</a>';
			endif;
		endforeach;
	elseif ($query_len == 3 && $k == "zone") :
		foreach ($query_arr as $k => $v) :
			if ($k == 'city') :
				foreach ($query_arr as $k => $v) :
					if ($k == 'zone') :
						echo '<a class="item" data-metas="street, 1">街 1</a><a class="item" data-metas="street, 2">街 2</a><a class="item" data-metas="street, 3">街 3</a><a class="item" data-metas="street, 4">街 4</a><a class="item" data-metas="street, 5">街 5</a>';
					endif;
				endforeach;
			endif;
		endforeach;
	endif;
endforeach;
?>
