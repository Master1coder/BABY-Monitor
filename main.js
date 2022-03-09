objects=[];
status="";
song="";

function preload(){
    song=loadSound("alert.wav");
}


function setup(){
    canvas=createCanvas(400,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(400,400);
    video.hide();
    objectdetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="Status: Detecting BABY";
}

function modelloaded(){
    console.log("model has loaded");
    status=true;
}

function gotresults(error,results){
if(error){
console.log(error);
}
console.log(results);
objects=results;
}

function draw(){
    image(video,0,0,400,400);
    if(status!=""){
objectdetector.detect(video,gotresults)
for(i=0;i<objects.length;i++){
    document.getElementById("status").innerHTML="Status: Objects Detected";
   
    percent=floor(objects[i].confidence*100);
    text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
    noFill();
    stroke("#ff0000");
    rect(

        objects[i].x,objects[i].y,objects[i].width,objects[i].height
    );
    if(objects[i].label=="person"){
document.getElementById("object").innerHTML="BABY Found";
console.log("stop");
song.stop();
    }
    else{
        document.getElementById("object").innerHTML="BABY Not Found";
        console.log("play");
        song.play();
    }
}
if(objects.length==0){
    document.getElementById("object").innerHTML="BABY Not Found";
    console.log("play");
    song.play();
}
    }
}

