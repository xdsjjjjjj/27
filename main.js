Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function Take_snapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML='<img id="emotion"src="'+data_uri+'">';

    });

}
console.log('ml5.version',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/gvqPKlTOw/model.json',modelLoaded);
function modelLoaded(){
console.log('modelLoaded&');
}

Prediction1="";
Prediction2="";
function speak(){
    var synth=window.speechSynthesis;
    speak1="The first prediction is "+Prediction1;
    speak2="The second prediction is "+Prediction2;
    var utter_this=new SpeechSynthesisUtterance(speak1+speak2);
    synth.speak(utter_this);
}

function Take_check(){
 image=document.getElementById("emotion");
 classifier.classify(image,gotresult);   
}

function gotresult(error,results) {
    if(error){
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        Prediction1=results[0].label;
        Prediction2=results[1].label;
        speak();
        if (results[0].label=="Happy"){
            document.getElementById("update_emoji").innerHTML="&#128522;";
        }
        if (results[0].label=="Sad"){
document.getElementById("update_emoji").innerHTML="&#128532;";
        }
        if (results[0].label=="Angry"){
            document.getElementById("update_emoji").innerHTML="&#128548;";
        }
        if (results[1].label=="Happy"){
            document.getElementById("update_emoji2").innerHTML="&#128522;";
        }
        if (results[1].label=="Sad"){
document.getElementById("update_emoji2").innerHTML="&#128532;";
        }
        if (results[1].label=="Angry"){
            document.getElementById("update_emoji2").innerHTML="&#128548;";
        }
    }
}