function GameSession(x, y) {
  this.prefix = "asymilate_";
  this.id = this.find();
  this.counter = 0;

  if (this.id === null) {
    var now = new Date();
    this.id = this.prefix + this.generateId();
    localStorage.setItem(this.id, now.toISOString());
    localStorage.setItem('player_x', x);
    localStorage.setItem('player_y', y);
    this.x = x;
    this.y = y;
  } else {
    this.x = parseInt(localStorage.getItem('player_x'));
    this.y = parseInt(localStorage.getItem('player_y'));
  }
  
  this.persistSession();
}

GameSession.prototype.resetAll = function() {
    var keysToRemove = new Array();
    var i;
    for (i = 0; i < localStorage.length; i++){
        if (localStorage.key(i).substr(0, this.prefix.length) == this.prefix){
            keysToRemove[keysToRemove.length] = localStorage.key(i);
        }
    }

    for (i = 0; i < keysToRemove.length; i++) {
        localStorage.removeItem(keysToRemove[i]);
    }
};

GameSession.prototype.persistSession = function () {
  if (typeof(Firebase) == "undefined") {
    // No Network
    return;
  }

  var db = new Firebase("https://asymilate.firebaseio.com/");
  // Create a new session
  db.child(this.id).child("x").set(this.x);
  db.child(this.id).child("y").set(this.y);
  db.child(this.id).child("id").set(this.id);
};

GameSession.prototype.update = function (x, y) {
  if (typeof(Firebase) == "undefined") {
    // No Network
    return;
  }

  localStorage.setItem('player_x', x);
  localStorage.setItem('player_y', y);

  if (this.counter == 5) {
    var db = new Firebase("https://asymilate.firebaseio.com/");
    db.child(this.id).child("x").set(x);
    db.child(this.id).child("y").set(y);
    this.counter = 0;
  } else {
    this.counter++;
  }
};

GameSession.prototype.find = function () {
  var session_id = null;

  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).substr(0, this.prefix.length) == this.prefix) {
      session_id = localStorage.key(i);
    }
  }

  return (session_id);
};

GameSession.prototype.destroy = function () {
  var session_id = this.find();
  if (session_id !== null) {
    localStorage.removeItem(session_id);
  }
};

GameSession.prototype.generateId = function () {
  var chars = "0123456789";
  var string_length = 20;
  var random_string = '';

  for (var i = 0; i < string_length; i++) {
    var random_number = Math.floor(Math.random() * chars.length);
    random_string += chars.substring(random_number, random_number + 1);
  }

  return(random_string);
};
