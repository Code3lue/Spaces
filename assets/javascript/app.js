$(document).ready(function() { 

 $('#myModal').modal('show');

  $('a').click(function(e) {
    return false;
});

  
  

});



$('.btTxt').click(function(e) {
     $('.selected').removeClass('selected');

     // removes the previous selected class
   $(this).addClass('selected');
  // $(this).unbind('data-clicked', click);
  // $(this).attr('data-clicked', 'yes') // adds the class to the clicked image


});
/*
$('images').click(function(e) {
  $(this).removeAttr('data-clicked');
  $(this).attr('data-clicked', 'yes');
});*/







$(".startButton").on("click", function(event) {

    event.preventDefault();

   
  
 /*var isClicked = $('').data('clicked');

    if(isClicked == 'yes') {

      console.log("this is clicked");

      else {
        console.log("nothing clicked");
      };*/


    if($("#exampleInputName2").val().length < 5 ) {

        $("#exampleInputName2").popover('show');
       
     };

    if($('#exampleInputName2').val().length >= 5) {

      var input = $("#exampleInputName2").val().trim();

      localStorage.setItem("username", JSON.stringify(input));

      window.location = ($(".selected").parent().attr('href'));

                 return false;

             $('#myModal').modal('hide');
        

};


        

    /* var input = $("#exampleInputName2").val().trim();
     var user = $(".user");

     user.html(input);*/


  
});

var retrievedObj = localStorage.getItem('username');

//console.log('username: ', JSON.parse(retrievedObj));

var user = $('#userName')

user.html(retrievedObj);

$("#checkIn").on("click", function() {
    console.log("Latitude: " + userLat);
    console.log("Longitude: " + userLong);
    $("#check").modal("show");
});


//setting up variables that will be defined later
var userLat;
var userLong;
var comment;
var map;
var tName;
var tLatitude;
var tLongitude;
var tcomment;
var features = [];

//google's initialize map function, set to grab your location and make a flag saying 'You are Here'
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 32.080695, lng: -81.093864},
        zoom: 11
    });

    var infoWindow = new google.maps.InfoWindow({map: map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
//grabs user location, defines the earlier variables userLat & userLong, console logs it            
            userLat = position.coords.latitude;
            userLong = position.coords.longitude;

            console.log(userLat);
            console.log(userLong);

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here.');
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
    // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    } // End of if statement for geolocation

// places star shaped markers where the latitude and longitude are named. (Lines 219-262)
    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    var icons = {
        food: {
            name: 'Cool Place',
            icon: iconBase + 'star.png'
        },
    };

    // You've created a function within a function here
    // Which means this addMarker function isn't going to be able to be called outside of initMap()
    function addMarker(feature) {
        var marker = new google.maps.Marker({
            position: feature.position,
            icon: icons[feature.type].icon,
            map: map
        });
    }

    features = [
        {
            position: new google.maps.LatLng(32.1419598, -81.2447829),
            type: 'food'
        },
        {
            position: new google.maps.LatLng(32.1418871, -81.2480659),
            type: 'food'
        },
        {
            position: new google.maps.LatLng(32.1423232, -81.2506408),
            type: 'food'
        },
        {
            position: new google.maps.LatLng(32.1423232, -81.2506408),
            type: 'food'
        },
        {
            position: new google.maps.LatLng(32.003152,-81.121158),
            type: 'food'
        },
    ];

    for (var i = 0, feature; feature = features[i]; i++) {
        addMarker(feature);
    }
} // End of initMap() function

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
} // End of handleLocationError()
// On click functions - Pulls up check-in modal


// Initialize Firebase
 var config = {
    apiKey: "AIzaSyDY9mayUU0bidNM0OprwoAhLYaQOZW64TY",
    authDomain: "spaces-9d176.firebaseapp.com",
    databaseURL: "https://spaces-9d176.firebaseio.com",
    storageBucket: "spaces-9d176.appspot.com",
    messagingSenderId: "325121183296"
  };
  firebase.initializeApp(config);
var database = firebase.database();

//my idea is to make a new marker (using the users stored location), push it to the function that posts the markers, then re-run the map function with the new marker included. 
    function newMarker(){
    var mapMark = "{position: new google.maps.LatLng(" + tLatitude + "," + tLongitude + "), type: 'food'},"
    features.push(mapMark);
    icon: icons[feature.type].icon,
    addMarker(feature);
    initMap();
};


//closes modal, grabs location and comment
$("#checkButton").on("click", function(){
    $("#check").modal("hide");
    comment = $("#comment").val().trim();
    console.log(comment);

    var newUser = {
        userName: userName,
        Latitude: userLat,
        Longitude: userLong,
        comment: comment
    }
//pushes this all to firebase
    database.ref().push(newUser);

    // You might need to load all your database children a different place
    // So if you are having an issue loading these, try moving them to their own function
    // And call that function when the page is loaded
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {
        console.log(childSnapshot.val());

        var tName = childSnapshot.val().userName;
        var tLatitude = childSnapshot.val().Latitude;
        var tLongitude = childSnapshot.val().Longitude;
        var tcomment = childSnapshot.val().comment;

        console.log(tName);
        console.log(tLatitude);
        console.log(tLongitude);
        console.log(tcomment);

        newMarker();
    });
}); // Added a ; here

// What is the difference between newMarker and addMarker?
// If this function isn't working right, it could be because you need to pass variables into this function

//my idea is to make a new marker (using the users stored location), push it to the function that posts the markers, then re-run the map function with the new marker included. 
    function newMarker(){
    var mapMark = "{position: new google.maps.LatLng(" + tLatitude + "," + tLongitude + "), type: 'food'},"
    features.push(mapMark);
    addMarker(feature);
    initMap();
};

//Hannah's notes.
// Go through and make sure you understand the functions that need to happen:
// 1: On page load
//      * Get user data
//      * Store data in localStorage/variables
//      * Initialize the Firebase database
//      * Pull from Firebase
//      * Then after you've got your data from the user and from Firebase,
//      * Create an array with all locations that need to be plotted
//      * Then render your map
//      * Map will probably be the last thing you should process on load (until the user does something)
// 2: On user input
//      * Get user data
//      * Push to Firebase
// Once the location is pushed to Firebase, then maybe refresh the page, which will inturn repull Firebase database which will then render your map, this time including the new location from the user