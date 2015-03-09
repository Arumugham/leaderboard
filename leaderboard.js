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
			return PlayersList.find({ createdBy: Meteor.userId()},{ sort: { score: -1, name: 1 }});
 		},
 		'selectedClass': function(){
 			var playerID = this._id;
 			var selectedPlayer = Session.get('selectedPlayer');
 			if(playerID == selectedPlayer){
 				return "selected"
 			}
 		},
 		'count': function(){
 			return PlayersList.find({createdBy: Meteor.userId()}).count()
 		},
 		'showSelectedPlayer': function(){
 			var selectedPlayer = Session.get('selectedPlayer');
 			return PlayersList.findOne(selectedPlayer);
 		}
 	});
 	Template.leaderboard.events({
 		'click .player': function(){
 			var playerID = this._id;
 			Session.set('selectedPlayer', playerID);
 		},
 		'click .increment': function(){
 			var selectedPlayer = Session.get('selectedPlayer');
 			PlayersList.update(selectedPlayer, {$inc: {score : 5}});
 		},
 		'click .decrement': function(){
 			var selectedPlayer = Session.get('selectedPlayer');
 			PlayersList.update(selectedPlayer, {$inc: {score : -5}});
 		},
 		'click .remove':function(){
 			var selectedPlayer = Session.get('selectedPlayer');
 			if(window.confirm("Are you sure, you want to remove?")){
 				PlayersList.remove(selectedPlayer);
 			}
 			
 		}
 	});
 	Template.addPlayerForm.events({
 		'submit form': function(event){
 			event.preventDefault();
 			var playerName = event.target.playerName.value;
 			var playerScore = parseInt(event.target.playerScore.value);
 			var currentUserID = Meteor.userId();
 			PlayersList.insert({
 				name: playerName,
 				score: playerScore,
 				createdBy: currentUserID
 			});
 			event.target.playerName.value = "";
 			event.target.playerScore.value = "";
 		}	
 	});
}
if(Meteor.isServer){
	console.log("Server here maga!!");
	//PlayersList.remove({});
}


