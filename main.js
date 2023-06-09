Astronaut_in_the_ocean_song="";
Beliver_song="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_Astronaut_in_the_ocean = "";
song_Beliver = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    Astronaut_in_the_ocean_song = loadSound("music2.mp3");
    Beliver_song = loadSound("music.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    song_Astronaut_in_the_ocean = Astronaut_in_the_ocean_song.isPlaying();
    console.log(song_Astronaut_in_the_ocean);

    song_Beliver = Beliver_song.isPlaying();
    console.log(song_Beliver);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        Beliver_song.stop();
        if(song_Astronaut_in_the_ocean == false){
            Astronaut_in_the_ocean_song.play();
        }
        else{
            console.log("Song Name: Beliver ");
            document.getElementById("song_id").innerHTML = "Song Name: Believer";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        Astronaut_in_the_ocean_song.stop();
        if(song_Beliver == false){
            Beliver_song.play();
        }
        else{
            console.log("Song Name: Astronaut in the ocean");
            document.getElementById("song_id").innerHTML = "Song Name: Astronaut in the Ocean";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}