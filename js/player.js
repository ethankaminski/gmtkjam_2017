Class.makeClass(Movable, function Player(x, y) {
	this.body = new Sprite(game.images['idlemag.png'], x, y, tileSize, tileSize * 2);
	this.velocity = new Point();
	this.friction = 0.01;
	this.elasticity = 0.7;

	this.rot = 0;
})

Player.prototype.render = function() {
	if (this.velocity.x < 0) {
		this.left = true;
	} else {
		this.left = false;
	}
	var vertSpinThreshold = 30;
	if (mouseState.button || Math.abs(this.velocity.y) > vertSpinThreshold) {
		this.body.image = game.images['magneticmag.png'];
		this.body.height = tileSize * 1.5;
		if ((game.tick % 10) >= 5) {
			this.body.frame = this.left ? 1 : 2;
		} else {
			this.body.frame = this.left ? 0 : 3;
		}
		if (this.anchor) {
			var vec = this.anchor.pos.minus(this.body);
			var rad = vec.length();
			var angle = Math.atan2(vec.y, vec.x);
			this.rot = this.left ? -angle : angle;
		} else {
			var minRot = Math.PI / 6
			this.rot += minRot;
		}
	} else {
		this.body.image = game.images['idlemag.png'];
		this.body.height = tileSize * 2;
		this.body.frame = this.left ? 0 : 1;
		this.rot = 0;
	}

	ctx.save();
	ctx.translate(this.body.x, this.body.y);
	ctx.rotate(this.rot);
	ctx.translate(-this.body.x, -this.body.y);
	this.body.render();
	ctx.restore();

	if (this.anchor) {
		this.drawGrapple();
	}
	this.drawMagnetism();
}

Player.prototype.drawGrapple = function() {
	ctx.beginPath();

	var center = this.body//.plus(new Point(tileSize * 0.8, tileSize * 0.8).times(0.5));
	var vec = this.anchor.pos.minus(center);
	var rad = vec.length();
	var angle = Math.atan2(vec.y, vec.x);
	var arc = Math.min(Math.PI / 6, 25 / rad);
	var gradient = ctx.createRadialGradient(center.x, center.y, rad, center.x, center.y, 0);
	gradient.addColorStop(0,"rgba(0,0,200,0.0)");
	gradient.addColorStop(1,"rgba(0,0,127,0.7)");
	ctx.fillStyle = gradient;
	ctx.moveTo(center.x, center.y);
	ctx.arc(center.x, center.y, rad, angle - arc/2, angle + arc/2);
	//ctx.arc(center.x, center.y, rad, 0, 1);
	ctx.fill();
}
