//======== DATA LOAD Linking routes to data sources=====//
var friendsData = require("../data/friends");


//================ROUTING=================//
module.exports = function(app) {
    // API GET Requests
    //
    // ---------------------------------------------------------------------------
    var friendsTotal =[];
    app.get("/api/friends", function(req, res) {
      res.json(friendsData);
    });

    app.post("/api/friends", function(req, res) {
      console.log("from apiroutes: ",req.body.scores);
  
      // Receive user details (name, photo, scores)
      var user = req.body;
  
      // parseInt for scores
      for(var i = 0; i < user.scores.length; i++) {
        user.scores[i] = parseInt(user.scores[i]);
      }
  
      // Best Match is the first in the array by default
      var bestMatchIndex = 0;
      
  
      // comparison of the scores with the data in the friends.js and the new user
      //  The difference between each friend and the user is pushed in to a new array and the one with the least difference is the best match
      for(var i = 0; i < friendsData.length; i++) {
        var totalDifference = 0;
        for(var j = 0; j < friendsData[i].scores.length; j++) {
          var difference = Math.abs(user.scores[j] - friendsData[i].scores[j]);
          totalDifference += difference;
        }
        console.log("TotalDifference: ",totalDifference);
        friendsTotal.push(totalDifference);

      }
      var bestMatchIndex=friendsTotal.indexOf(Math.min.apply(null,friendsTotal))
      console.log("Minimum value ",bestMatchIndex);

      // once match is found push the new user into the friendsData array
      friendsData.push(user);
  
      // Display the best match on a modal
      res.json(friendsData[bestMatchIndex]);
    });
  };
