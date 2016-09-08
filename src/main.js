	//var width = 1536;
	var width = 800;
	var height = (width /3) * 2;
	
	var renderer = PIXI.autoDetectRenderer(width, height);
	
	document.body.appendChild(renderer.view);
	
	var stage = new PIXI.Container();
	var assets = {};
	var machine;

	
	PIXI.loader
	.add('machine', 'images/4OfAKing_slot_background_2.png')
	.add('coin', 'images/scatter.png')
	.add('token1', 'images/01_01.png')
	.add('token2', 'images/03_01.png')
	.add('item1', 'images/04_symbol_01.png')
	.add('item2', 'images/05_01.png')
	.add('item3', 'images/07_01.png')
	.add('item4', 'images/symbol_06_01.png')
	.load(function (loader, resources) {
		assets = resources;
		setup();
	});
		
	function setup(){
		
		
		machine = new Machine('machine');
		stage.addChild(machine.container);
				
		main();
	}
	
	var then = Date.now();
	function main(){
		var now = Date.now();
		var delta = now - then;
		
		update(delta / 1000);
		draw();
		
		then = now;
		requestAnimationFrame(main);
	}
	
	function update(delta){
		machine.update(delta);
	}
	
	function draw(){
		renderer.render(stage);
	}
