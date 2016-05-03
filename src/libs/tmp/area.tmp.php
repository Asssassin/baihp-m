<?php
$json = isset($_GET['json']) ? TRUE : FALSE;
$utf8 = isset($_GET['utf8']) ? TRUE : FALSE;
$prov = isset($_GET['province']) ? intval($_GET['province']) : 0;
$city = isset($_GET['city']) ? intval($_GET['city']) : 0;
$zone = isset($_GET['zone']) ? intval($_GET['zone']) : 0;
$street = isset($_GET['street']) ? intval($_GET['street']) : 0;

/* 列出所有省份 */
if($prov < 1 && $city < 1 && $zone < 1 && $street < 1){
	echo '[{"ID":1,"Name":"\u76f4\u8f96\u5e02"},{"ID":16,"Name":"\u6c5f\u82cf"},{"ID":17,"Name":"\u6c5f\u897f"},{"ID":18,"Name":"\u8fbd\u5b81"},{"ID":19,"Name":"\u5185\u8499\u53e4"},{"ID":20,"Name":"\u5b81\u590f"},{"ID":21,"Name":"\u9752\u6d77"},{"ID":22,"Name":"\u5c71\u4e1c"},{"ID":23,"Name":"\u5c71\u897f"},{"ID":24,"Name":"\u9655\u897f"},{"ID":25,"Name":"\u56db\u5ddd"},{"ID":26,"Name":"\u897f\u85cf"},{"ID":27,"Name":"\u65b0\u7586"},{"ID":15,"Name":"\u5409\u6797"},{"ID":14,"Name":"\u6e56\u5357"},{"ID":2,"Name":"\u5e7f\u4e1c"},{"ID":3,"Name":"\u6d59\u6c5f"},{"ID":4,"Name":"\u5b89\u5fbd"},{"ID":5,"Name":"\u798f\u5efa"},{"ID":6,"Name":"\u7518\u8083"},{"ID":7,"Name":"\u5e7f\u897f"},{"ID":8,"Name":"\u8d35\u5dde"},{"ID":9,"Name":"\u6d77\u5357"},{"ID":10,"Name":"\u6cb3\u5317"},{"ID":11,"Name":"\u6cb3\u5357"},{"ID":12,"Name":"\u9ed1\u9f99\u6c5f"},{"ID":13,"Name":"\u6e56\u5317"},{"ID":28,"Name":"\u4e91\u5357"}]';
	exit;
}

/* 列出指定省份下的城市 */
if($prov > 0 && $city < 1 && $zone < 1 && $street < 1){
	echo '[{"ID":181,"Name":"\u5357\u4eac"},{"ID":182,"Name":"\u65e0\u9521"},{"ID":183,"Name":"\u5f90\u5dde"},{"ID":184,"Name":"\u5e38\u5dde"},{"ID":185,"Name":"\u626c\u5dde"},{"ID":186,"Name":"\u5357\u901a"},{"ID":187,"Name":"\u8fde\u4e91\u6e2f"},{"ID":188,"Name":"\u6dee\u5b89"},{"ID":189,"Name":"\u76d0\u57ce"},{"ID":190,"Name":"\u82cf\u5dde"},{"ID":191,"Name":"\u9547\u6c5f"},{"ID":192,"Name":"\u5bbf\u8fc1"},{"ID":193,"Name":"\u6cf0\u5dde"}]';
	exit;
}

/* 获取指定城市数据 */
if($city > 0){
	/* 是否获取指定区域数据 */
	if($zone < 1){
		echo '[{"ID":746,"Name":"\u4e91\u9f99"},{"ID":1756,"Name":"\u4e30\u53bf"},{"ID":1755,"Name":"\u6c9b\u53bf"},{"ID":1754,"Name":"\u7762\u5b81"},{"ID":1753,"Name":"\u94dc\u5c71"},{"ID":1752,"Name":"\u65b0\u6c82"},{"ID":1751,"Name":"\u90b3\u5dde"},{"ID":1750,"Name":"\u6cc9\u5c71"},{"ID":1749,"Name":"\u8d3e\u6c6a"},{"ID":1748,"Name":"\u4e5d\u91cc"},{"ID":1747,"Name":"\u9f13\u697c"},{"ID":1757,"Name":"\u5f90\u5dde\u5468\u8fb9"}]';
	}else{
		/* 获取指定城市的指定区域所有街道数据 */
		if($zone > 1000){
			echo '[{"ID":3276,"Name":"\u4e5d\u91cc"},{"ID":3277,"Name":"\u91d1\u5c71\u6865"},{"ID":3278,"Name":"\u5f6d\u57ce\u5e7f\u573a"},{"ID":3279,"Name":"\u9f13\u697c\u5468\u8fb9"}]';
		}else{
			exit('not data');
		}
	}
}
?>
<?php
// $get_url_query = $_SERVER["QUERY_STRING"];
//
// parse_str($get_url_query, $query_arr);
//
// // var_dump($query_arr);
//
// $query_len = count($query_arr);
//
// foreach ($query_arr as $k => $v) :
// 	if ($query_len == 1 && $k == "province") :
// 		echo '<a class="item" data-metas="city, 1">市 1</a><a class="item" data-metas="city, 2">市 2</a><a class="item" data-metas="city, 3">市 3</a><a class="item" data-metas="city, 4">市 4</a><a class="item" data-metas="city, 5">市 5</a><a class="item" data-metas="city, 6">市 6</a><a class="item" data-metas="city, 7">市 7</a><a class="item" data-metas="city, 8">市 8</a><a class="item" data-metas="city, 9">市 9</a>';
// 	elseif ($query_len == 2 && $k == "city") :
// 		foreach ($query_arr as $k => $v) :
// 			if ($k == 'city') :
// 				echo '<a class="item" data-metas="zone, 1">区 1</a><a class="item" data-metas="zone, 2">区 2</a><a class="item" data-metas="zone, 3">区 3</a><a class="item" data-metas="zone, 4">区 4</a><a class="item" data-metas="zone, 5">区 5</a>';
// 			endif;
// 		endforeach;
// 	elseif ($query_len == 3 && $k == "zone") :
// 		foreach ($query_arr as $k => $v) :
// 			if ($k == 'city') :
// 				foreach ($query_arr as $k => $v) :
// 					if ($k == 'zone') :
// 						echo '<a class="item" data-metas="street, 1">街 1</a><a class="item" data-metas="street, 2">街 2</a><a class="item" data-metas="street, 3">街 3</a><a class="item" data-metas="street, 4">街 4</a><a class="item" data-metas="street, 5">街 5</a>';
// 					endif;
// 				endforeach;
// 			endif;
// 		endforeach;
// 	endif;
// endforeach;
?>
