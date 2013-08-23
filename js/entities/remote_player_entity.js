/*
 Remote Player
 */

game.RemotePlayerEntity = me.ObjectEntity.extend({
  init: function (x, y, settings) {
    this.parent(x, y, settings);
    this.gravity = 0.0;
    this.origVelocity = new me.Vector2d( 1.5, 1.5 );
    this.setVelocity( this.origVelocity.x, this.origVelocity.y );
    this.setFriction( 0.5, 0.5 );
  }
});