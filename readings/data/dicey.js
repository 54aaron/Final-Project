var readings;
var roll;
var rolling = false;
var stage = 1;
var score = 0;

console.log("it lives");

if (!!window.EventSource) {
    var source = new EventSource('/events');

    source.addEventListener('open', function(e) {
        console.log("Events Connected");
      }, false);

      source.addEventListener('error', function(e) {
        if (e.target.readyState != EventSource.OPEN) {
          console.log("Events Disconnected");
        }
      }, false);

      source.addEventListener('test', function(e) {
        console.log(e);
      }, false);

      source.addEventListener('message', function(e) {
        readings = JSON.parse(e.data);
        console.log(readings);

        if( roll != 1 && readings.X < 3 && readings.Y < 3 && readings.Z > 5 ){
            roll = 1;
            console.log("roll: ");
            console.log(roll);

            document.getElementById("pic").src="1.gif";
            document.getElementById("roll").innerHTML="1";

        }else if( roll != 2 && readings.X < -8 && readings.Y < 3 && readings.Z < 3 ){
            roll = 2;
            console.log("roll: ");
            console.log(roll);

            document.getElementById("pic").src="2.gif";
            document.getElementById("roll").innerHTML="2";
            
        }else if( roll != 3 && readings.X < 3 && readings.Y < 3 && readings.Z < -8 ){
            roll = 3;
            console.log("roll: ");
            console.log(roll);

            document.getElementById("pic").src="3.gif";
            document.getElementById("roll").innerHTML="3";

        }else if( roll != 4 && readings.X > 5 && readings.Y < 3 && readings.Z < 3 ){
            roll = 4;
            console.log("roll: ");
            console.log(roll);

            document.getElementById("pic").src="4.gif";
            document.getElementById("roll").innerHTML="4";

        }else if( roll != 5 && readings.X < 3 && readings.Y < -5 && readings.Z < 3 ){
            roll = 5;
            console.log("roll: ");
            console.log(roll);

            document.getElementById("pic").src="5.gif";
            document.getElementById("roll").innerHTML="5";

        }else if( roll != 6 && readings.X < 3 && readings.Y > 5 && readings.Z < 3 ){
            roll = 6;
            console.log("roll: ");
            console.log(roll);

            // var img = '<img src="6.gif" width="' + randDim() + '" style = position:absolute; "left:' + randX() +'; top:' + randY() + '">'
            // console.log(img);
            // $('body').append(img);

            document.getElementById("pic").src="6.gif";
            document.getElementById("roll").innerHTML="6";

        }else{
            rolling = true;
            console.log("rolling rolling rolling");
        }

      }, false);

}

function randDim(){
    var dim =  Math.ceil(Math.random() * (50 - 10) + 10) + "%";
    return dim;
}

function randY(){
    var y =  Math.ceil(Math.random() * (1280 - 10) + 10) + "";
    return y;
}

function randX(){
    var x = Math.ceil(Math.random() * (1920 - 10) + 10) + "";
    return x;
}


