function Reel(_items){
	var self = this;
	
	var item_height = 222;
	var item_width = 222;
	var item_spacing = 50;
	
	
	
	var width = item_width;
	var height = _items.length * item_height + _items.length * item_spacing;

	
	this.container = new PIXI.Container();
	this.container.position.x = 175;
	this.container.position.y = -100;
	this.container.scale.x = 1;
	this.container.scale.y = 1;
	
	this.container.width = width;
	this.container.height = height;
	
	var items = [];
	var spinning = false;
	var reelSetup = false;
	var spin_duration;
	var speed = 10;
	
	_items.forEach(function(item, index){
		var temp = new Item(item);
		temp.sprite.x = 0;
		temp.sprite.y =  index * item_height + index * item_spacing;
		
		console.log(temp.sprite.y);
		
		temp.sprite.height = 222;
		temp.sprite.width = 222;
		temp.sprite.scale.x = 1;
		temp.sprite.scale.y = 1;
		
		items.push(temp)
		self.container.addChild(temp.sprite);
	})
	
	var border = new PIXI.Graphics();;
	border.lineStyle(5, 0xFF0000);
	border.drawRect(this.container.x, this.container.y, width, height);
	stage.addChild(border);
	

	

	
	this.spin = function(){
		
	}
	this.update = function(delta){
		
		items.forEach(function(item){
			item.update(delta);
			if(item.sprite.y > height){
				item.sprite.y = 0;
			}
			
		})
	}
}