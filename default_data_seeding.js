module.exports =function(){ var keystone = require('keystone'), Event = keystone.list('Event'), Person = keystone.list('Person'), Section = keystone.list('Section');
    
var events = [
{ front_description1: "Building your own MIDI controller & mashing up music at home: the code",
  front_description2: "A meet-up/workshop designed for any would-be hacker. <i>It is alright if you do not yet know how to code. This is for anyone who is interested in coding.</i>",
  title: "MIDI: the code",
  venue: "The only white building on some planet in the Andromeda galaxy 2.5 million light-years away",
  facebook_url : "http://facebook.com/",
  time: new Date("2013,03,10,14:30")
},
{ front_description1: "Building your own MIDI controller & mashing up music at home: the hardware",
  front_description2: "A meet-up/workshop designed for any secondary, JC or Poly student who wants to do something cool with her or his time.",
  title: "MIDI: the hardware",
  venue: "Room 1729 in the 'Black Knight' satellite which is orbitting the nearest white dwarf star",
  facebook_url : "http://facebook.com/",
  time: new Date("2013,03,17,16:00")

},
{ front_description1: "Learning how to code with Mad Tea Lab (a JavaScript crash course)",
  front_description2: "A meet-up for any teenager (doesn't matter if you are a boy or girl) who wanna get a head start to become a programmer.",
  title: "coding with MTL",
  venue: "The Large Hadron Collider, CERN, Geneva",
  facebook_url : "http://facebook.com/"

}

];
var people = [
    { name: "Maria Metropolis", webimage: "http://unaffiliatedcritic.com/wp-content/uploads/2013/02/METROPOLIS-19271.png", facebook:"https://www.facebook.com/pages/Metropolis-Movie/535910513205453", website:"http://en.wikipedia.org/wiki/Metropolis_%281927_film%29", linkin:"http://www.imdb.com/title/tt0017136/"
},
    { name: "HAL 9000", webimage: "http://www.fanboy.com/wp-content/uploads/2014/05/Hal_9000_by_JohnnySlowhand.jpg", facebook:"https://www.facebook.com/pages/HAL-9000/103850222987473", website:"http://en.wikipedia.org/wiki/HAL_9000", twitter:"https://twitter.com/hal9000_"
},
    { name: "C-3PO", webimage: "http://img4.wikia.nocookie.net/__cb20091202210619/starwars/images/thumb/6/66/C-3PO.jpg/500px-C-3PO.jpg",facebook:"https://www.facebook.com/SW.C3PO", twitter:"https://twitter.com/c3po"
}
];
var sections = [
    { title: "quote", words: "“Tell me and I forget. Teach me and I remember. <br>Involve me and I learn.” - Benjamine Franklin"},
    { title: "about HacKIDemia header", words:"Technology is advancing<br> at an exponential rate."},
    { title: "about HacKIDemia words", words:"HacKIDemia is a non-profit organization that encourages, inspires and guides <br>the next generations of young people to change the world with technology."},
    { title: "about HacKIDemia link", words:"check out HacKIDemia's main website" },
    { title: "about the team header", words: "The Maker Movement is important <br>to the future of humanity."},
{ title: "about the team words", words:"Our mission is to teach and inspire young earthlings to<br> hack their way through life & build things of their imagination."},
{title: "join us header", words:"Want to be part of the team?"},
{title: "join us words", words: "Awesome! We are looking for more mentors & organisers too."},
{title: "join us button", words: "Join us now and let's make a difference <br>in the current education!"}

];

sections.forEach(function(ele,index,array){
    var a = new Section.model(ele); a.save(function(err){
    if (err){ return console.log(err) }else{ console.log(ele.title+' added'); }});
});


people.forEach(function(ele,index,array){
    var a = new Person.model(ele); a.save(function(err){
    if (err){ return console.log(err) }else{ console.log(ele.name+' added'); }});
});

events.forEach(function(ele,index,array){
    var a = new Event.model(ele); a.save(function(err){
    if (err){ return console.log(err) }else{ console.log(ele.title +' added'); }});
});

}
