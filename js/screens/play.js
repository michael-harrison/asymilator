game.PlayScreen = me.ScreenObject.extend({
  init: function () {
    this.parent(true);

    var current_game = this;

    if (typeof(Firebase) == "function") {
      var db = new Firebase("https://asymilate.firebaseio.com/");
      db.on('child_added', function (snapshot) {
        var session = snapshot.val();
        current_game.addPlayer(session);
      });

      var db = new Firebase("https://asymilate.firebaseio.com/");
      db.on('value', function (snapshot) {
        var player_sessions = snapshot.val();
        for (var session_object_name in player_sessions) {
          var session = player_sessions[session_object_name];
          current_game.addPlayer(session);
        }
      });
    }
  },

  /**
   *  action to perform on state change
   */
  onResetEvent: function () {
    me.levelDirector.loadLevel("level01");

    me.game.add(new me.ColorLayer("background", "#000000", 0), 0);

    me.input.registerPointerEvent("mousemove", me.game.viewport, function (event) {
      // publish a "mousemove" message
      me.event.publish("mousemove", [event]);
      // don't propagate this event furthermore
      return false;
    });
  },

  draw: function () {
  },

  addPlayer: function (player_session) {
    if (player_session.id == undefined || player_session.x == undefined || player_session.y == undefined) {
      return;
    }

    // Fix for Firebase bug
    player_session.id = fixSessionId(player_session.id);
    player_session.x = fixXCoordinate(player_session.x);
    player_session.y = fixYCoordinate(player_session.y);
    //---------------------

    var local_player = me.game.getEntityByName('mainPlayer')[0];
    var player = me.game.getEntityByName(player_session.id)[0];
    if (player || local_player == null) {
      return;
    }

    if (player_session.id != null) {
      if (local_player.session.id == player_session.id) {
        return;
      }


      var player_ref = new Firebase("https://asymilate.firebaseio.com/" + player_session.id);
      player_ref.on('value', function (snapshot) {
        var session = snapshot.val();

        // Fix for Firebase bug
        session.id = fixSessionId(session.id);
        session.x = fixXCoordinate(session.x);
        session.y = fixYCoordinate(session.y);
        //---------------------

        remote_player = me.game.getEntityByName(session.id);
        if (remote_player.length > 0) {
          remote_player = remote_player[0];
          remote_player.pos.setV(new me.Vector2d(session.x, session.y));
        }
      });


      var remote_player = me.entityPool.newInstanceOf('remotePlayer', player_session.x, player_session.y, {
        spritewidth: 24,
        spriteheight: 24,
        isRemote: true,
        image: 'droid_001_remote'
      });

      remote_player.name = player_session.id;


      me.game.add(remote_player, 4);
      me.game.sort();
    }
  },

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent: function () {
    me.input.releasePointerEvent("mousemove", me.game.viewport);
  }
});
