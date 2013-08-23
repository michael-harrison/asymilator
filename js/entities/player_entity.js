/*
 Main Player
 */

game.PlayerEntity = me.ObjectEntity.extend({
  init: function (x, y, settings) {
    this.parent(x, y, settings);

    this.session = new GameSession(x, y);
    this.pos.setV(new me.Vector2d(this.session.x, this.session.y));

    this.gravity = 0.0;
    this.origVelocity = new me.Vector2d(1.5, 1.5);
    this.setVelocity(this.origVelocity.x, this.origVelocity.y);
    this.setFriction(0.5, 0.5);
    this.direction = new me.Vector2d(0.0, 1.0);

    me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

    this.droidCharging = false;
    this.maxDriodMoves = 1000;
    this.lowPowerPercentage = 0.3;
    this.droidCharge = this.maxDriodMoves;

    // selected flag
    this.selected = false;

    // to memorize where we grab the square
    this.grabOffset = new me.Vector2d(0, 0);

    // white : unselected
    // red : selected
    this.color = "white";

    // store the id of the corresponding 
    // touch event (when selected)
    this.pointerId = null;

    // register required events
    this.moveCallback = this.onMoveEvent.bind(this);
    me.event.subscribe("mousemove", this.moveCallback);
    me.input.registerPointerEvent('mousedown', this, this.onStartEvent.bind(this));
    me.input.registerPointerEvent('mouseup', this, this.onEndEvent.bind(this));
  },

  /**
   * callback for move event
   */
  onMoveEvent: function (e) {
    if (this.selected === true) {
      if (this.pointerId === e.pointerId) {
        // follow the mouse/finger
        this.pos.set(e.gameX, e.gameY);
        this.pos.sub(this.grabOffset);
      }
    }
  },

  /**
   * callback for event click
   */
  onStartEvent: function (e) {
    if (this.selected === false) {
      this.pointerId = e.pointerId;
      this.selected = true;
      this.color = "red";
      // e.gameX/e.gameY are the game canvas coordinates
      this.grabOffset.set(e.gameX, e.gameY);
      this.grabOffset.sub(this.pos);
      // don't propagate this event furthemore
      return false;
    }
  },

  /**
   * callback for event click
   */
  onEndEvent: function (e) {
    if (this.selected === true) {
      this.pointerId = undefined;
      this.selected = false;
      this.color = "white";
      // don't propagate this event furthemore
      return false;
    }
  },

  checkInput: function () {
    var direction = new me.Vector2d(0.0, 0.0);

    if (me.input.isKeyPressed('left')) {
      direction.x = -1.0;
    } else if (me.input.isKeyPressed('right')) {
      direction.x = 1.0;
    } else if (me.input.isKeyPressed('up')) {
      direction.y = -1.0;
    } else if (me.input.isKeyPressed('down')) {
      direction.y = 1.0;
    }

    if (direction.x != 0.0 || direction.y != 0.0) {
      this.vel.x += direction.x * this.accel.x * me.timer.tick;
      this.vel.y += direction.y * this.accel.y * me.timer.tick;
      this.session.update(this.pos.x, this.pos.y);
      if (this.droidCharge > 0) {
        this.charge(-1);
      }

    }
  },

  charge: function (charge_unit) {
    // Charging
    if (charge_unit > 0) {
      if (this.droidCharge < this.maxDriodMoves) {
        this.droidCharge += charge_unit;
      }
    } else if (!this.droidCharging) {
      this.droidCharge += charge_unit;
    }

    if (this.renderable != undefined) {
      if (this.droidCharge / this.maxDriodMoves < this.lowPowerPercentage) {
        this.renderable.image.src = '/data/img/sprites/001_low_power.png';
      } else {
        if (this.droidCharging && this.droidCharge < this.maxDriodMoves) {
          this.renderable.image.src = '/data/img/sprites/001_charging.png';          
        } else {
          this.renderable.image.src = '/data/img/sprites/001.png';          
        }
      }
    }

    console.info(this.droidCharge);
  },

  update: function () {
    if (!this.isRemote) {
      this.checkInput();

      this.updateMovement();
    }

    var collision = me.game.collide(this);
    if (collision) {
      if (collision.obj.name == "charger") {
        if (!this.droidCharging) {
          me.audio.play('charge');
          this.droidCharging = true;
        }
        this.charge(1);
      }

    } else {
      if (this.droidCharging) {
        this.droidCharging = false;
      }

    }

    this.parent();

    // else inform the engine we did not perform
    // any update (e.g. position, animation)
    return true;
  },

  /**
   * called when the object is destroyed
   */
  destroy: function () {
    // unregister events
    me.event.unsubscribe("mousemove", this.moveCallback);
    me.input.releasePointerEvent('mousedown', this);
    me.input.releasePointerEvent('mouseup', this);
  }
});