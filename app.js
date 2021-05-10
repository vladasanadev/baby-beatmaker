class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.muteBtn = document.querySelectorAll(".mute");
    this.playBtn = document.querySelector(".play");

    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.currentKick = "./allSounds/kick-classic.wav";
    this.currentSnare = "./allSounds/snare-acoustic02.wav";
    this.currentHihat = "./allSounds/hihat-acoustic02.wav";
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
    this.temposlider = document.querySelector(".tempo-slider");
  }
  activePad() {
    console.log(this);
    this.classList.toggle("active");
  }
  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    //Loop over pad

    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;

      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
      }
    });

    this.index++;
  }
  start() {
    //DOESNT CONSOLE LOG

    const interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      //clear interval
      clearInterval(this.isPlaying);
      this.isPlaying = null;
      console.log(interval);
    }
  }
  updateButton() {
    if (!this.isPlaying) {
      this.playBtn.innerHTML = "STOP";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerHTML = "PLAY";
      this.playBtn.classList.remove("active");
    }
  }
  changeSound(e) {
    console.log(e);
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    console.log(selectionValue);
    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
    }
  }
  mute(e) {
    console.log(e);
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case 0:
          this.kickAudio.volume = 0;
          break;
        case 1:
          this.kickAudio.volume = 0;
          break;
        case 2:
          this.kickAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case 0:
          this.kickAudio.volume = 1;
          break;
        case 1:
          this.kickAudio.volume = 1;
          break;
        case 2:
          this.kickAudio.volume = 1;
          break;
      }
    }
  }
  changeTempo(e) {
    const tempoNumber = document.querySelector(".tempo-nr");
    this.bpm = e.target.value;
    console.log(this.bpm);
    tempoNumber.innerText = e.target.value;
  }
  updateTempo() {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }
}

const drumKit = new DrumKit();

//Event Listener

drumKit.pads.forEach((element) => {
  element.addEventListener("click", () => drumKit.activePad.call(element));
  element.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playBtn.addEventListener("click", () => {
  drumKit.updateButton();
  drumKit.start();
});

drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});
drumKit.muteBtn.forEach((button) => {
  button.addEventListener("click", function (e) {
    drumKit.mute(e);
  });
});

drumKit.temposlider.addEventListener("input", function (e) {
  drumKit.changeTempo(e);
});
drumKit.temposlider.addEventListener("change", function () {
  drumKit.updateTempo();
});
