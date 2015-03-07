console.log("hello boss!!");
PlayersList = new Mongo.Collection('players');
// PlayersList.insert({ name: "Sachin", score: 20 });
// PlayersList.insert({ name: "Laxman", score: 15 });
// PlayersList.insert({ name: "Rahul", score: 10 });
// PlayersList.insert({ name: "Kohli", score: 5 });
// PlayersList.insert({ name: "Dhoni", score: 25 });
// PlayersList.insert({ name: "Rohit", score: 0 });

if(Meteor.isClient){
	console.log("Hello Client");
	Template.leaderboard.helpers({
 		'player':function(){
 			return PlayersList.find({},{ sort: { score: -1, name: 1 }});
 		},
 		'selectedClass': function(){
 			var playerID = this._id;
 			var selectedPlayer = Session.get('selectedPlayer');
 			if(playerID == selectedPlayer){
 				return "selected"
 			}
 		},
 		'count': function(){
 			return PlayersList.find().count()
 		}
 	});
 	Template.leaderboard.events({
 		'click .player': function(){
 			var playerID = this._id;
 			Session.set('selectedPlayer', playerID);
 			var selectedPlayer = Session.get("selectedPlayer");
 			console.log(selectedPlayer);
 		},
 		'click .increment': function(){
 			var selectedPlayer = Session.get('selectedPlayer');
 			PlayersList.update(selectedPlayer, {$inc: {score : 5}});
 		},
 		'click .decrement': function(){
 			var selectedPlayer = Session.get('selectedPlayer');
 			PlayersList.update(selectedPlayer, {$inc: {score : -5}});
 		}

 	});
}
if(Meteor.isServer){
	console.log("Server here maga!!");
	//PlayersList.remove({});
}


