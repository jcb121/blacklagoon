function Reel(_items, location){
	var self = this;
	
	var item_spaced_height = location.height /3
	
	var item_height = item_spaced_height / 100 * 80;
	var item_spacing = item_spaced_height /100 * 20;
	var item_width = item_height;
	
	var spinning = false;
		
	var width = location.width;
	var height = _items.length * item_height + _items.length * item_spacing;
	
	var velocity = 0;
	var friction = 0.95;
	var spin_travelled = 0;
	var spin_travel = 1;
	
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
	
	function apply_stop_force(){
		if (spin_travelled < spin_travel ) return;
		
		// bouncing past bound; gives a minus number
		var distance = spin_travel - spin_travelled;
		var force = distance * 0.3;
		// calculate resting position with this force; creates negative force
		var rest = spin_travelled + (velocity + force) / ( 1 - friction );
				
		// apply force if resting position is out of bounds
		if ( rest > spin_travel ) {
			apply_force( force );
			return;
		}
		// if in bounds, apply force to align at bounds
		force = distance * 0.3 - velocity;
		apply_force( force );
		spinning = false;
	}
	
	function apply_force(force){
		velocity += force;
	}
	
	this.is_spinning = function(){
		return spinning;
	}
	
	this.spin = function(){
		if(!spinning){
			spinning = true;
			spin_travel = (Math.ceil(Math.random() * 10 ) + items.length) * (item_height + item_spacing);
			spin_travelled = 0;
			
			//force needed to spin the exact amount of travel;
			var force = spin_travel * (1 - friction);
			
			//increase the force to over shoot the target causing bounce;
			apply_force(force * 1.2);
		}
	}
	
	this.update = function(){
		apply_stop_force();
		
		velocity *= friction;
		var step = velocity;
		
		spin_travelled += step;
		
		items.forEach(function(item){
			item.y += step;
			
			while(item.y < 0){
				item.y += height;
			}
			while(item.y >= height){
				item.y -= height;
			}
		})
	}
}