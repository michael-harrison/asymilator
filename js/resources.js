game.resources = [
  /*
   * Graphics
   */
  // Tile Sets
  {name: "level01_tiles", type: "image", src: "data/img/map/level01_tiles.bmp"},
  {name: "metatiles32x32", type: "image", src: "data/img/map/metatiles32x32.png"},
  // Sprites
  {name: "droid_001", type: "image", src: "data/img/sprites/001.png"},
  {name: "droid_001_low_power", type: "image", src: "data/img/sprites/001_low_power.png"},
  {name: "droid_001_remote", type: "image", src: "data/img/sprites/001_black.png"},
  {name: "charger", type: "image", src: "data/img/sprites/charger.png"},
  
  /*
   * Sound Effects
   */
  {name: "charge", type: "audio", src: "data/sfx/", channel : 2},

  /*
   * Maps
   */
  {name: "level01", type: "tmx", src: "data/map/level01.tmx"}

  /* Graphics. 
   * @example
   * {name: "example", type:"image", src: "data/img/example.png"},
   */

  /* Atlases 
   * @example
   * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
   */

  /* Maps. 
   * @example
   * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
   * {name: "example01", type: "tmx", src: "data/map/example01.json"},
   */

  /* Background music. 
   * @example
   * {name: "example_bgm", type: "audio", src: "data/bgm/", channel : 1},
   */

  /* Sound effects. 
   * @example
   * {name: "example_sfx", type: "audio", src: "data/sfx/", channel : 2}
   */
];
