function Item(name){	
	this.sprite = new PIXI.Sprite(assets[name].texture);
	this.sprite.position.x = 0;
	this.sprite.position.y = 0;
	this.sprite.scale.x = 1;
	this.sprite.scale.y = 1;
	
	
	var speed = 1000;
	
	this.update = function(delta){
		
		this.sprite.y += speed * delta;
	};
}