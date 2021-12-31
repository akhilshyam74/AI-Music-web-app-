song1= "";
song2 = "";

song_status1 =  "";
song_status2 = "";

scoreLeftWrist = 0;
scoreRightWrist = 0;

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function preload()
{
    song1=loadSound("song 1.mp3");
    song2 = loadSoung("song 2.mp3");
}
function setup()
{
    canvas=createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log("PoseNet Is Initialized")
}
function draw(){
    image(video, 0, 0, 600, 500);
    song_status1 = song1.isPlaying();
    song_status2 = song2.isPlaying()
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if (song_status1 == false)
        {
            song1.play();
            document.getElementById("song").innerHTML = "Playing song 1";
            console.log("Playing song 1")
        }
        }
    if(scoreLeftWrist > 0.2)
        {
            circle(leftWristX, leftWristY, 20);
            if (song_status2 == false)
            {
                song2.play();
                document.getElementById("song").innerHTML = "Playing song 2";
                console.log("Playing song 2")
            }
        }
    }


    
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
    console.log("Speed = "+ speed)
    console.log("Volume = "+ volume);
}
function gotPoses(results){
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = "+ scoreLeftWrist);
        console.log("scoreRightWrist = "+scoreRightWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+rightWristX + "rightWristY = "+ rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+leftWristX + "leftWristY = "+ leftWristY);
    }
}