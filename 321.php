\\IGNOR
<?php 
session_start();

require "../lib.php";
require "../web.php";

src\Core\DB::exec("INSERT INTO users SET id=?,pw=?,name=?",['admin','1234','관리자']);

if( src\Core\DB::fetch("SELECT count(*) count FROM books ",[])->count  ==  0 ){
	$f = fopen("작가와의만남.csv","r");
	$count = 0;
	while($row = fgetcsv($f)){
		foreach ($row as $key => $value) {
			$row[$key] = iconv("EUC-KR","UTF-8",$row[$key]);
		}
		if( $count == 2 ){
			src\Core\DB::exec("INSERT INTO books SET title = ?,artist = ?,student = ?,date = ?,week = ?,time = ?,img = ?",[
				$row[0],
				$row[1],
				$row[2],
				$row[3],
				$row[4],
				$row[5],
				$row[0].".jpg"
			]);
		}else{
			$count++;
		}
	}
}

src\Core\Route::init();
