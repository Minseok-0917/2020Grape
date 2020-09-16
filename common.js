<section>
	<div class="container">
		<h3>그래프</h3>
		<div class="box flex">
			<input type="text" name="search" id="search">
			<button id="searchBtn">선택</button>
		</div>
		<div class="box flex">
			<div class="item-container flex">
				<div class="artist">
					<canvas id="acircle" width="500" height="500"></canvas>
					<div class="bar flex">
						<div class="name"></div>
						<div class="line"></div>
					</div>
				</div>
				<div class="student">
					<canvas id="scircle" width="500" height="500"></canvas>
					<div class="bar flex">
						<div class="name"></div>
						<div class="line"></div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<script>
		let artists = [];
		let student = [];
		const atx = acircle.getContext("2d");
		const stx = scircle.getContext("2d");
		searchBtn.addEventListener("click",function(){
			getData(search.value);
		})
		const getData = async function(search=null){
			await fetch('/Getlist').then( data => data.json() ).then( result => {
				if( search ){
					result = result.filter( ({title,artist}) => title.includes(search) || artist.includes(search) )
				}
				artists = Object.entries(result.reduce( (acc,v) => {
					 acc[v.artist] = (acc[v.artist] || 0) + 1;
					return acc;
				}, {})).map(([name, count]) => ({ name, count })).sort( (a,b) => b.count-a.count ).map(CreateColor)
				student = Object.entries(result.reduce( (acc,v) => {
					acc[v.school] = (acc[v.school] || 0 ) +1;
					return acc;
				},{})).map( ([name,count]) => ({name,count}) ).sort( (a,b) => b.count-a.count ).map(CreateColor)
			});
			circle(atx,artists);
			bar($(".artist .bar"),artists);
			circle(stx,student);
			bar($(".student .bar"),student);
		}
		getData();
		function circle(ctx,datas){
			const s = 2/datas.reduce( (acc,v) => acc+v.count,0);
			datas.reduce( (acc,v) => {
				ctx.beginPath();
				ctx.moveTo(250,250);
				ctx.fillStyle = v.color;
				console.log(v.color);
				ctx.arc(250,250,120,Math.PI*(acc+1.5),Math.PI*(1.5+acc+s*v.count));
				ctx.fill();
				return acc+s*v.count;
			},0);
		}
		function bar(parent,datas){
			const max = Math.max(...datas.flatMap( v => v.count ));
			const s = 100/max;
			$(parent).find(".name").empty();
			$(parent).find(".line").empty();
			datas.forEach( v => {
				$(parent).find(".name").append(`<div class="row">${v.name}</div>`)
				const html = $(`<div class="row flex"><div></div>${v.count}</div>`);
				html.find("div").css({ width:s*v.count+"%",background:v.color });
				$(parent).find(".line").append(html);
			} )
		}
		function CreateColor(data){
			data.color = '#'+Math.round(Math.random()*0xeeeeee ).toString(16);
			return data;
		}
</script> 
