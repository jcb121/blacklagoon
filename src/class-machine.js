function Machine(name){
	var self = this;
	
	var reel_count = 5;
	var side_offset = width/ 100 * 11;
	var beam_width = width/ 100 * 1.56;
	var slot_width = width/100 * 14.45;
	var top_offset = height/100 * 13.84;
	var reel_height = height/100 * 65;
	
	var reel_slots = [];
	for(var i = 0; i < reel_count; i++){
		reel_slots[i] = {
			x:side_offset + (slot_width + beam_width) * i,
			y:top_offset,
			width:slot_width,
			height:reel_height
		}
	}
	var reels = [
		new Reel(['coin', 'token1', 'token2', 'item1', 'item2', 'item3', 'item4'], reel_slots[0]),
		new Reel(['coin', 'token1', 'token2', 'item1', 'item2', 'item3', 'item4'], reel_slots[1]),
		new Reel(['coin', 'token1', 'token2', 'item1', 'item2', 'item3', 'item4'], reel_slots[2]),
		new Reel(['coin', 'token1', 'token2', 'item1', 'item2', 'item3', 'item4'], reel_slots[3]),
		new Reel(['coin', 'token1', 'token2', 'item1', 'item2', 'item3', 'item4'], reel_slots[4])
	];
	
	
	
	this.container = new PIXI.Container();
	this.container.position.x = 0;
	this.container.position.y = 0;
	this.container.height = height;
	this.container.width = width;
	
	for(var i = 0; i < reels.length; i++){
		this.container.addChild(reels[i].container);
	}
	
	this.sprite = new PIXI.Sprite(assets[name].texture);
	this.sprite.position.x = 0;
	this.sprite.position.y = 0;
	this.sprite.height = height;
	this.sprite.width = width;
	this.sprite.interactive = true;
	this.container.addChild(this.sprite);
	
	
	this.sprite.click = function(mouseData){
		self.spin();
	}
	
	this.spin = function(){		
		
		var ready = true;
		
		for(var i = 0; i < reels.length; i++){
			if(reels[i].is_spinning()){
				ready = false;
				console.log('spin in progress');
				break;
			}
		}
		
		if(ready){
			reels.forEach(function(reel){
				reel.spin();
			})
		}
	}
	
	this.update = function(delta){
		reels.forEach(function(reel){
			reel.update(delta);
		})
	}
	
}