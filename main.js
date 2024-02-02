var music = "";

rightWristX = 0;
leftWristX = 0;


rightWristY = 0;
leftWristY = 0;

scoreRightWrist = 0;
scoreleftWrist = 0;

function preload() {
    music = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(600, 500);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
}

function modelLoaded() {
    window.alert("DJ SOLTA O PAREDÃO");
    console.log("DJ SOLTA O PAREDÃO PARA AS NOVINHAS FAZER...");
    poseNet.on('pose', gotPoses)
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#ff0000");
    stroke("#ff0000");

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "velocidade = x0.5 ";
            song.rate(0.5);
        }
    }
    else if (rightWristY > 100 && rightWristY <= 200) {
        document.getElementById("speed").innerHTML = "velocidade = x1 ";
        song.rate(1);
    }
    else if (rightWristY > 200 && rightWristY <= 300) {
        document.getElementById("speed").innerHTML = "velocidade = x1.5 ";
        song.rate(1.5);

    }

    else if (rightWristY > 300 && rightWristY <= 400) {
        document.getElementById("speed").innerHTML = "velocidade = x2 ";
        song.rate(2);
    }
    else if (rightWristY > 400) {
        document.getElementById("speed").innerHTML = "velocidade = x2.5 ";
        song.rate(2.5);
    }
        if (scoreleftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        InNumberLeftWristY = Number(leftWristY);
        remove_decimals = Math.floor(InNumberLeftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "volume = "+volume;
        song.setVolume(volume);
}
}


function play() {
    music.play();
    music.setVolume(1);
    music.rate(1);
}

function stop() {
    music.stop()
}

