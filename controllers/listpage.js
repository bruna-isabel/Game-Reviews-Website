var game = {
  "info": [
    {
      "title":"Roblox",
      "year": 2019,
      "description":"A game where you have to build your own robots with blocks but without being destroyed by the monster" 
    },
    {
      "title": "League of Angels",
      "year": 2014,
      "description": "A game full of adventure. There are some rules you need to follow in order to stay alive!Will you manage to cope?;)"

    },
    {
      "title": "Fireboy and Watergirl",
      "year": 2002,
      "description": "You need to cooperate with your lover to get out of this tunel alive. A very exciting game with a lot of stages"
    },

  ]
}
$(document).ready(function() {
  var gameTemplate = $("gametemplate").html()

var compiledCharacterTemplate = Handlebars.compile(gameTemplate)
$(".listofgames").html(compiledCharacterTemplate(info))
})