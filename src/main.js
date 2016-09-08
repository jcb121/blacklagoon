	var width = 1536;
	var height = 1024;
	
	var renderer = PIXI.autoDetectRenderer(width, height);
	
	//Add the canvas to the HTML document
	document.body.appendChild(renderer.view);
	
	//Create a container object called the `stage`
	var stage = new PIXI.Container();
	
	var assets = {};
	var objects = {};
	

	
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
		
		
		//objects.reel = new Reel(['coin', 'token1', 'token2', 'item1', 'item2', 'item3', 'item4']);
		objects.reel = new Reel(['coin', 'token1', 'token2', 'item1']);
		stage.addChild(objects.reel.container);
		
		
		var machine = new Item('machine');
		machine.sprite.position.x = 0;
		machine.sprite.position.y = 0;
		machine.sprite.scale.x = 1;
		machine.sprite.scale.y = 1;
		stage.addChild(machine.sprite);
		
		
		
		var spin = new PIXI.Sprite(assets.coin.texture);
		spin.position.x = width/2;
		spin.position.y = height - 500;
		spin.scale.x = 1;
		spin.scale.y = 1;
		stage.addChild(spin);
		
		
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
		objects.reel.update(delta);
	}
	
	function draw(){
		renderer.render(stage);
	}
