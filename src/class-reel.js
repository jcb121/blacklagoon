function Reel(_items, location){
	var self = this;
	
	var item_spaced_height = location.height /3
	
	var item_height = item_spaced_height / 100 * 80;
	var item_spacing = item_spaced_height /100 * 20;
	var item_width = item_height;
	
	var spinning = false;
	var spin_speed = 1000;
	var spin_travelled;
	var spin_travel;
		
	var width = location.width;
	var height = _items.length * item_height + _items.length * item_spacing;
	
	
	
	this.container = new PIXI.Container();
	this.container.position.x = location.x;
	this.container.position.y = location.y + location.height/2 - height /2 + item_spacing /2;
	
	this.container.width = width;
	this.container.height = height;
	
	var items = [];
	_items.forEach(function(item, index){
		
		var sprite = new PIXI.Sprite(assets[item].texture);
		
		sprite.x = width/2 - item_width/2;
		sprite.y =  index * item_height + index * item_spacing;
		sprite.height = item_height;
		sprite.width = item_width;
		items.push(sprite);
		self.container.addChild(sprite);	
	})
	
	this.is_spinning = function(){
		return spinning;
	}
	
	this.spin = function(){
				
		if(!spinning){
			spinning = true;
			
			spin_travelled = 0;
			spin_travel = Math.ceil(Math.random() * 20) * (item_height + item_spacing);
		}
	}
	
	this.query = function(position){
		
	}
	
	this.update = function(delta){
		
		if(spinning){
			var diff = false;
			var step_distance = spin_speed * delta; 
			
			if(spin_travelled + step_distance > spin_travel){
				diff = spin_travel - spin_travelled;
				spinning = false;
			}
			
			items.forEach(function(item){
				
				if(diff === false){
					item.y += step_distance;
				}else{
					item.y += diff;
				}
				
				while(item.y >= height){
					item.y -= height;
				}
			})
			
			if(diff === false){
				spin_travelled += step_distance;
			}else{
				spin_travelled += diff;
			}
		}	
	}
}