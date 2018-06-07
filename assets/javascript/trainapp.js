$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyBkOX_jQsWzMqZnZSIe-tkNw6rlLbaKUA8",
        authDomain: "trainapp-b7188.firebaseapp.com",
        databaseURL: "https://trainapp-b7188.firebaseio.com",
        projectId: "trainapp-b7188",
        storageBucket: "",
        messagingSenderId: "942653445503"
    };
    firebase.initializeApp(config);
    console.log("I am loaded!");
    var database = firebase.database();


    $(".btn").on("click", function (event) {
        event.preventDefault();
        var train = $("#train-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var trainTime = $("#first-input").val().trim();
        var freq = $("#freq-input").val().trim();
        var trainTimeConverted = moment(trainTime, "h:mm").subtract(1, "years");
        console.log(trainTimeConverted);
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("h:mm"));
        var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
        var tRemainder = diffTime % freq;
        console.log(tRemainder);
        var tMinutesTillTrain = freq - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        nextTrain = moment(nextTrain).format("HH:mm A");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("h:mm"));
        var newRow = $("<tr>");
        var newTd1 = $("<td>").text(train);
        var newTd2 = $("<td>").text(destination);
        var newTd3 = $("<td>").text(freq);
        var newTd4 = $("<td>").text(nextTrain);
        var newTd5 = $("<td>").text(tRemainder);

        newRow.append(newTd1, newTd2, newTd3, newTd4, newTd5);
        $("tbody").append(newRow);


        var newTrain = {
            Train: train,
            Destination: destination,
            FirstTime: trainTime,
            Freq: freq
        }
        database.ref().push(newTrain);

        console.log(newTrain.Train);
        console.log(newTrain.Destination);
        console.log(newTrain.FirstTime);
        console.log(newTrain.Freq);

        $("#train-input").val("");
        $("#destination-input").val("");
        $("#first-input").val("");
        $("#freq-input").val("");

        //this isn't really working right now 
        $("#train-table > tbody").append("<tr><td>" + newTrain.Train + "</td><td>" + newTrain.Destination + "</td><td>" +
        freq + "</td><td>" + nextTrain + "</td><td>" + tRemainder + "</td></tr>");
      });


        database.ref().on("child_added", function (childSnapshot, prevChild) {
            console.log(childSnapshot.val());

            var train = childSnapshot.val().Train;
            var destination = childSnapshot.val().Destination;
            var trainTime = childSnapshot.val().FirstTime;
            var freq = childSnapshot.val().Freq;

        });

    });
