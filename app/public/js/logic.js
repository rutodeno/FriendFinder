function getFriend() { /// getting data
    var currentURL = window.location.origin;
    $.ajax({ url: currentURL + "/api/friends", method: "GET" })
        .then(function (userData) {
            console.log("--------------------------------------");
            console.log("URL: " + currentURL + "/api/friends");
            console.log("-----------------------------------------");

            //console.log(userData);

            matchFriend(userData);
        })
}

function postFriend(friends) {
    $.post("/api/friends", friends, function (data) {

        if (data) {
            console.log("Friend data has been added");
        } else {
            console.log("Friend data has NOT been added");
        }

        $("#name").val(""); // clear form
        $("#image").val("");
        $("#num1").val("");
        $("#num2").val("");
        $("#num3").val("");
        $("#num4").val("");
        $("#num5").val("");

    })
}

function clearFreindsList() {
    var currentURL = window.location.origin;
    $.ajax({ url: currentURL + "/api/clear", method: "POST" })
}

$("#clear").on("click", function () {
    console.log("Cleared friends list");
    clearFreindsList();
})


$(document).ready(function (){

    $("#submitBtn").on("click", function (event) {

        event.preventDefault();
        var friendData = {
            name: $("#name").val().trim(),
            photo: $("#image").val().trim(),
    
            scores: [   $("#num1").val().trim(),
                        $("#num2").val().trim(),
                        $("#num3").val().trim(),
                        $("#num4").val().trim(),
                        $("#num5").val().trim()
                    ]
        }
    
        postFriend(friendData) // posing data to api
        getFriend(); // getting data from api
    
        $("#myModal").modal() // creating the modal 
    });

})


function matchFriend(friendData) {

    var bigScoresArray = [];
    var scoreTracker = [];

    for (var j = 0; j < friendData.length; j++) {

        var intConvert = friendData[j].scores;
        var scoreArry = [];
        for (var i = 0; i < intConvert.length; i++) {

            var x = parseInt(intConvert[i]);

            scoreArry.push(x);
        }

        bigScoresArray.push(scoreArry);

        scoreTracker.push(bigScoresArray[j].reduce(getSum));

    }

    var differenceArray = [];

    for ( var i  = 0 ;  i < (scoreTracker.length -1) ; i++){
        
        var diff = Math.abs(scoreTracker[scoreTracker.length-1] - scoreTracker[i]);
        
        differenceArray.push(diff);

    }
    
    // person with the loweset difference is most likely one with common interest.
    var lowestNum = Math.min(...differenceArray);

    var bffIndex = differenceArray.indexOf(lowestNum); // gets index of the number

   $("#friendInfo").html("Your best match is: <h3>"+friendData[bffIndex].name +"</h3><br/>"
                        +"<image src="+friendData[bffIndex].photo+" width ='200' height ='200'>");

    console.log(friendData[bffIndex]);

    function getSum(total, sum) {
        return total + sum;
    }
}

