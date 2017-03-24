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

      window.location.replace($(".selected").parent().attr('href'));

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



function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 32.080695, lng: -81.093864 },
        zoom: 11
    });
    var infoWindow = new google.maps.InfoWindow({ map: map });
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}