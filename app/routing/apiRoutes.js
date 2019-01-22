// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    var newScore= req.body.scores
    var totalCurrentScore = 0
    var bestMatch=100
    var bestMatchID=0
    console.log(friends)
    console.log(newScore)
    for (i=0; i<friends.length; i++){
        for (j=0; j<friends[i].scores.length; j++){
            totalCurrentScore = totalCurrentScore + Math.abs(friends[i].scores[j] - newScore[j])
            console.log(i + " " + j + " "+totalCurrentScore)
        }
        if (i==0){
            bestMatch=totalCurrentScore
        }
        else if(totalCurrentScore<bestMatch){
                bestMatch=totalCurrentScore
                bestMatchID=i
            
        }
        totalCurrentScore=0;
    }
      friends.push(req.body);
      console.log(totalCurrentScore)

      res.json(friends[bestMatchID]);
    

  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function(req, res) {
    // Empty out the arrays of data
    friends.length = [];
    waitListData.length = [];

    res.json({ ok: true });
  });
};
