function getFriend() { /// getting data
    var currentURL = window.location.origin;
    $.ajax({ url: currentURL + "/api/friends", method: "GET" })
        .then(function (userData) {
            console.log("--------------------------------------");
            console.log("URL: " + currentURL + "/api/friends");
            console.log("-----------------------------------------");

            console.log(userData);
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
});