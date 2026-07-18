// ===========================
// Local Users Array
// ===========================

var users = [

    {
        name: "John Doe",
        gender: "Male",
        img: "john.png"
    },

    {
        name: "Jane Doe",
        gender: "Female",
        img: "jane.png"
    }

];


// Current User Index

var id = 0;


// ===========================
// Voice Settings
// ===========================

var selectedVoice = null;


// Load voices properly

function loadVoice() {

    var voices = window.speechSynthesis.getVoices();


    // Try Google UK Female first

    selectedVoice = voices.find(function(voice){

        return voice.name === "Google UK English Female";

    });


    // If unavailable choose English female voice

    if(!selectedVoice){

        selectedVoice = voices.find(function(voice){

            return (
                voice.lang.includes("en") &&
                voice.name.toLowerCase().includes("female")
            );

        });

    }


    // Otherwise use first English voice

    if(!selectedVoice){

        selectedVoice = voices.find(function(voice){

            return voice.lang.includes("en");

        });

    }

}


// Chrome loads voices later

speechSynthesis.onvoiceschanged = loadVoice;

loadVoice();



// ===========================
// Text To Speech Function
// ===========================


function speak(text){

    var speech = new SpeechSynthesisUtterance(text);


    speech.lang = "en-GB";

    speech.rate = 0.9;

    speech.pitch = 1;

    speech.volume = 1;


    if(selectedVoice){

        speech.voice = selectedVoice;

    }


    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(speech);

}



// ===========================
// Welcome Voice
// ===========================

var welcomed = false;


function playWelcome(){

    if(!welcomed){

        welcomed = true;


        speak(
        "Welcome to Web Development Bootcamp in association with Being Infinity."
        );

    }

}



// ===========================
// Toggle User
// ===========================

function toggleUser(){

    playWelcome();


    id = (id + 1) % users.length;


    var userImage =
    document.getElementById("user-image");


    var userName =
    document.getElementById("user-name");


    var userGender =
    document.getElementById("user-gender");



    userImage.src = users[id].img;


    userName.innerHTML = users[id].name;


    userGender.innerHTML = users[id].gender;



    speak(
        "The user is "
        + users[id].name
        + ". Gender is "
        + users[id].gender
    );

}



// ===========================
// Random User API
// ===========================


function randomUser(){


    playWelcome();



    fetch("https://randomuser.me/api/")


    .then(function(response){


        if(!response.ok){

            throw new Error(
                "API Error " + response.status
            );

        }


        return response.json();


    })



    .then(function(data){



        var userData = data.results[0];



        var fullName =
        userData.name.first
        + " "
        + userData.name.last;



        var gender =
        userData.gender;



        var image =
        userData.picture.large;



        document.getElementById("user-image").src =
        image;



        document.getElementById("user-name").innerHTML =
        fullName;



        document.getElementById("user-gender").innerHTML =
        gender;



        // Speak API user details


        speak(

        "The user is "
        + fullName
        + ". Gender is "
        + gender

        );



    })



    .catch(function(error){


        console.error(error);


        alert(
        "Unable to fetch random user"
        );


    });


}