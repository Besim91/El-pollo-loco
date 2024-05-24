let sound = false;

function mute() {
  let audioImg = document.getElementById("audioImg");
  if (audioImg.src.endsWith("on-sound.svg")) {
    audioImg.src = "./img/11_audio/off-sound.svg";
    this.sound = false;
    console.log(this.sound);
  } else {
    audioImg.src = "./img/11_audio/on-sound.svg";
    this.sound = true;
    console.log(this.sound);
  }
}
