song1="";
song2="";
leftWX=0;
leftWY=0;
rightWX=0;
rightWY=0;
score=0;
score2=0;
song1s="";
song2s="";
function preload(){
    song1=loadSound("song1.mp3");
    song2=loadSound("song2.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}
function draw(){
    image(video,0,0,600,500);
   
    song1s=song1.isPlaying();
    song2s=song2.isPlaying();
    if(score>0.2){
        fill("red");
        stroke("red");
        circle(leftWX,leftWY,20);
        song2.stop();
        if(song1s==false){
            song1.play();
            document.getElementById("song").innerHTML="Playing Harry Potter Theme Song";
        }
    }
    if(score2>0.2){
        fill("blue");
        stroke("blue");
        circle(rightWX, rightWY,20);
        song1.stop();
        if(song2s==false){
            song2.play();
            document.getElementById("song").innerHTML="Playing Peter Pan Theme Song";  
        }
    }
}
function modelLoaded(){
    console.log("PoseNet Is Initialized");
}
function gotPoses(results){
    if(results.length>0){
        score2=results[0].pose.keypoints[10].score;
        score=results[0].pose.keypoints[9].score;
        console.log(results);
        leftWX=results[0].pose.leftWrist.x;
        leftWY=results[0].pose.leftWrist.y;
        console.log("leftWristX = "+leftWX+" leftWristY = "+leftWY);
        rightWX=results[0].pose.rightWrist.x;
        rightWY=results[0].pose.rightWrist.y;
        console.log("rightWristX = "+rightWX+" rightWristY = "+rightWY);
    }
}