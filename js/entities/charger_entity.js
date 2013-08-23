game.Charger = me.ObjectEntity.extend({
  init: function (x, y, settings) {
    this.parent(x, y, settings);
    this.soundClip = null;
  },

  onCollision: function () {
  }

});
