Asymilate CampJS
===

Recently I went to [CampJS](http://campjs.com/) over the weekend of 10th/11th August 2013. In the spirit of the event, I made 
something over the weekend and learnt heaps.  With dreams of grandeur I embarked upon making a multi-player game.  Rather 
than battle with coding and game design I chose to base the multi-player game on a known game [Paradroid](http://en.wikipedia.org/wiki/Paradroid), 
a game I had played in my teenage years.    
  
After looking at heaps of [Javascript Game Platforms](http://www.designyourway.net/blog/resources/javascript-html5-game-engines-libraries-51-examples/)
I decided on [MelonJS](http://melonjs.org/) an open source engine that utilised [Tiled](http://www.mapeditor.org/) which
helps you build orthogonal, isometric and staggered maps for games.  Earlier in the week I saw a talk by [Olli](https://twitter.com/dev_doctor) about 
[Firebase](https://www.firebase.com/) a SaaS that provides you with a JSON data store and events!! Cool, the pieces 
are falling into place.

### Friday the 9th

With time for coding a priority I begun searching for some out of the box graphics and found that 
around 10 years ago a group of programmers had re-imagined the Paradroid game: the [SDL Paradriod Port](http://paradroid.sourceforge.net/).  
They had made it open source so I took the opportunity to use the graphics which slotted into place nicely.  Latter that 
day I begun learning with the [tutorial](http://melonjs.github.io/tutorial/) provided by MelonJS and downloaded 
some sample projects.  I was on my way for a day of learning the MelonJS framework.  Time to head to CampJS with 
[Anton Katunin](https://twitter.com/antulik) squeezing me into his turbo charged mini.  Just a note: coding as a passnger 
while traversing mountainous roads while possible is not recommended :P

### Saturday the 10th

After consuming maybe a little too may beers the night before I sluggishly started coding again but before diving into using 
Firebase I took the opportunity to have a look at [PubNub](http://www.pubnub.com/blog/lightweight-multiplayer-html5-games-with-pubnub-and-melonjs/), [WebRTC](http://www.webrtc.org/) and 
some [NodeJS/SocketIO](http://buildnewgames.com/real-time-multiplayer/) with the help of [Jaap van Hardeveld](https://twitter.com/JaapRood).    
In the end I wanted to make the game fairly light weight and compatible with most browsers.  So to eliminate the need 
to run a NodeJS server and have the game work on browsers other than just Firefox & Chrome I chose Firebase.  Besides 
I had already had my appetite wet from the talk early in the week.  So I spent the rest of the day recovering from my hangover with _hair of the dog_ (aka more beer),  
doing a crash course in Firebase and incorporating it into my game while attending some really cool sessions: Building Apps for Firefox OS ([Angelina Fabbro](https://twitter.com/angelinamagnum)), 
Angular FTW ([Glen Maddern](https://twitter.com/glenmaddern)) and Building Games for the Web with HTML5 ([Hugh Kennedy](https://twitter.com/hughskennedy)).  
    
### Sunday the 11th

Sunday morning came round and the buzz was around [FirefoxOS](http://www.mozilla.org/en-US/firefox/os/) which is Mozzilla's 
entry to the mobile computing market.  I spent the morning talking to the helpful guys from Mozzila: [Paul Theriault](https://twitter.com/creativemisuse) 
and [Angelina Fabbro](https://twitter.com/angelinamagnum).  After only a few tweaks to my project I was running on FirefoxOS 
but alas I still had much work to do regarding multiple players and the associated game play so I had to keep the focus on the desktop :( 
While feverishly coding in time for the demo I still managed to fit in a few sessions catching Glen's followup to AngularJS talk, Understanding JavaScript 
Inheritance ([Sebastian Porto](https://twitter.com/sebasporto)) and Higher-Order Fun ([Katie Miller](https://twitter.com/codemiller)).  

### The demo
Time was fast approaching for the demo and I still had much to finish off on the game play so I cut it back to a demo of
just the multi-player element.  I set up a bare bones web server via ruby using a one liner in the project root: `ruby -run -e -httpd . -p 8080` and 
shared on the LAN for any willing to give it a go.  After a few seconds I had about 30 payers - success!!  All be it on a very small map - have to
work on getting more levels with bigger maps :)

You don't have to run a local server, you can check it out now through the Github Page site on this repo: [Asymilator](http://michael-harrison.github.io/asymilator/). Enjoy!
