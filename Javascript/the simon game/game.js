var buttonColors = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Start game on first keypress (desktop)
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// Start game on first tap (mobile)
$(document).on("click", function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// Detect user button click
$(".btn").on("click", function(event) {
    event.stopPropagation(); // prevents triggering document click
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    // Pass index of last answer
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    // Check if most recent answer matches game pattern
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        // Check if user has completed the full sequence
        if (userClickedPattern.length === gamePattern.length) {
            // Wait 1 second then show next sequence AND reset user pattern
            setTimeout(function() {
                nextSequence();
                userClickedPattern = []; // ✅ Fixed: reset inside setTimeout
            }, 1000);
        }

    } else {
        // Play wrong sound
        playSound("wrong");

        // Flash game-over class on body
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        // Update title
        $("#level-title").text("Game Over, Press Any Key to Restart");

        console.log("wrong");

        // Reset the game
        startOver();
    }
}

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = []; // ✅ Also reset userClickedPattern on game over
    started = false;
}