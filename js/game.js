/* Game namespace */

var game = {
  // Run on page load.
  onload: function () {
    me.sys.pauseOnBlur = false;

    // Initialize the video.
    if (!me.video.init("screen", 640 * .5, 480 * .5, true, 'auto')) {
      alert("Your browser does not support HTML5 canvas.");
      return;
    }

    // add "#debug" to the URL to enable the debug Panel
    if (document.location.hash === "#debug") {
      window.onReady(function () {
        me.plugin.register.defer(debugPanel, "debug");
      });
    }

    // Initialize the audio.
    me.audio.init("mp3,ogg");

    // Set a callback to run when loading is complete.
    me.loader.onload = this.loaded.bind(this);

    // Load the resources.
    me.loader.preload(game.resources);

    // Initialize melonJS and display a loading screen.
    me.state.change(me.state.LOADING);
  },


  // Run on game resources loaded.
  loaded: function () {
    me.state.set(me.state.MENU, new game.TitleScreen());
    me.state.set(me.state.PLAY, new game.PlayScreen());

    me.entityPool.add("mainPlayer", game.PlayerEntity);
    me.entityPool.add("remotePlayer", game.RemotePlayerEntity, true);
    me.entityPool.add("charger", game.Charger);
    
    me.input.bindKey(me.input.KEY.LEFT, "left");
    me.input.bindKey(me.input.KEY.RIGHT, "right");
    me.input.bindKey(me.input.KEY.UP, "up");
    me.input.bindKey(me.input.KEY.DOWN, "down");

    // Start the game.
    me.state.change(me.state.PLAY);

    if (typeof(Firebase) == "undefined") {
      alert("No network!! Sorry your on your own :(");
    }
  }
};
