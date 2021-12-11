song = "";
RightWristX =0;
RightWristY =0;
scoreRightWrist =0;

function preload() {
song = loadSound("music.mp3");    
}

function setup() {
canvas = createCanvas(600,500);
canvas.center();

video = createCapture(VIDEO);
video.hide();

posenet = ml5.poseNet(video,modelLoaded);
posenet.on('pose',gotposes);
}

function modelLoaded() {
console.log('PoseNet is Initialised');    
}

function gotposes(results) {
if (results.length > 0) {
console.log(results);
scoreRighttWrist = results[0].pose.keypoints[10].score;

RightWristX = results[0].pose.rightWrist.x;
RightWristY = results[0].pose.rightWrist.y;
console.log("RightWristX: " + RightWristX + "RightWristY: " + RightWristY);
}    
}

function draw() {
image(video,0,0,600,500);

fill("#FF0000");
stroke("#FF0000");

if (scoreRightWrist>0.2) {
circle(RightWristX,RightWristY,20);
}

if (RightWristY>0 && RightWristY<=100) {
song.stop();
}
else if (RightWristY>400 && RightWristY<=500) {
song.play();
}    
}

function play() {
song.play(); 
song.setVolume(1);
song.rate(1);
}