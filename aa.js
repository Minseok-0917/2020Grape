<style>
	#calendar .grid{ display: grid; grid-template-columns: repeat(7,1fr); }
	#calendar .grid>div:nth-child(7n+1){ color:red; }
	#calendar .grid>div:nth-child(7n){ color:blue; }
	#calendar .grid>div{ height: 80px;  }
	#calendar .grid>div.week{ height: 40px; }
	#calendar .grid>div:empty{ background: #e8e8e8; }
</style>
<section id="calendar">
	<div class="container">
		<h3>예약하기</h3>



		<a href="/calendar/<?= $prevY ?>/<?= $prevm ?>"><</a>
		<a href="/calendar/<?= $nextY ?>/<?= $nextm ?>">></a>
		<div class="item-container grid">
			<div class="week">일</div>
			<div class="week">월</div>
			<div class="week">화</div>
			<div class="week">수</div>
			<div class="week">목</div>
			<div class="week">금</div>
			<div class="week">토</div>
			<?php if( $mw != 0 ){ ?>
				<?php for($i=0; $i<$mw; $i++,$count++){ ?>
					<div></div>
				<?php }	 ?>
			<?php } ?>
			<?php for($i=1; $i<=$ml; $i++,$count++){ ?>
				<div class="item">
					<?= $i ?>
				<?php 
					  $a =  strtotime("$year-$month-$i");
					  // $w = date("w",strtotime("$a"));
				 ?>
				 <?php foreach ($view as $v){
				 	$start =  strtotime($v->date);
				 	$end   =  strtotime("{$v->date} +1 months");
				 	$w     = date("w", $a);
				 	if( $start <= $a && $a <= $end ){
				 		if (['일요일','월요일','화요일','수요일','목요일','금요일','토요일'][$w] === $v->week) {
				 			echo "<p class='bidx' data-idx={$v->idx}>{$v->title}</p>";
				 		}
				 	}
				 }?>
				</div>
			<?php } ?>
			<?php for($i=$count; $i<=42; $i++){ ?>
				<div></div>
			<?php } ?>
		</div>
	</div>
</section>
<script>

	$(document)
	.on("click","#calendar .item",async function(){
		const datas = await Promise.all([
			...[...$(this).find(".bidx")]
				.map( v => $(v).data("idx") )
				.map( v => fetch(`/getBook/${v}`).then( data => data.json()))
		]);
		console.log(datas);

		/*
		bidx fetch 
		list -> 

		

		*/
	})
	// init();
</script>
