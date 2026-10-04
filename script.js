/* =========================================
   WEBSITE SETTINGS
========================================= */

const CONFIG = {

  // Password
  password: "Love",

  // Song information
  songTitle: "You Belong With Me",
  artist: "Taylor Swift",

  // Audio file
  audioFile: "assets/song.mp3"

};


/* =========================================
   ELEMENTS
========================================= */

const lockScreen =
  document.getElementById("lockScreen");

const songPage =
  document.getElementById("songPage");

const unlockForm =
  document.getElementById("unlockForm");

const passwordInput =
  document.getElementById("password");

const error =
  document.getElementById("error");

const recordButton =
  document.getElementById("recordButton");

const audio =
  document.getElementById("song");


/* =========================================
   PAGE TITLE
========================================= */

document.title =
  `${CONFIG.songTitle} — ${CONFIG.artist}`;


/* =========================================
   PLAYING STATE
========================================= */

function setPlaying(isPlaying) {

  recordButton.classList.toggle(
    "playing",
    isPlaying
  );

  recordButton.setAttribute(
    "aria-pressed",
    String(isPlaying)
  );

}


/* =========================================
   PLAY SONG
========================================= */

async function playSong() {

  try {

    await audio.play();

  } catch (error) {

    setPlaying(false);

  }

}


/* =========================================
   PASSWORD
========================================= */

unlockForm.addEventListener(
  "submit",
  async function(event) {

    event.preventDefault();


    /*
       Password is case-sensitive.
       Correct password:

       Love
    */

    if (
      passwordInput.value ===
      CONFIG.password
    ) {

      error.textContent = "";


      /*
         Fade out password screen
      */

      lockScreen.style.transition =
        "opacity .45s ease";

      lockScreen.style.opacity = "0";


      /*
         Start music immediately after
         the user's password submission.

         This also helps browsers allow
         autoplay because the action began
         from a user interaction.
      */

      await playSong();


      setTimeout(function() {

        lockScreen.hidden = true;

        songPage.hidden = false;

      }, 450);


    } else {

      error.textContent =
        "Incorrect password.";

      passwordInput.select();

    }

  }
);


/* =========================================
   CD CLICK
========================================= */

recordButton.addEventListener(
  "click",
  async function() {

    if (audio.paused) {

      await playSong();

    } else {

      audio.pause();

    }

  }
);


/* =========================================
   AUDIO EVENTS
========================================= */

audio.addEventListener(
  "play",
  function() {

    setPlaying(true);

  }
);


audio.addEventListener(
  "pause",
  function() {

    setPlaying(false);

  }
);


audio.addEventListener(
  "ended",
  function() {

    setPlaying(false);

  }
);


/* =========================================
   FOCUS PASSWORD
========================================= */

passwordInput.focus();
