let sound = false;

/**
 * Toggles the sound state between muted and unmuted. It updates the source
 * of the audio image based on the current state and logs the new sound state.
 */
function mute() {
  let audioImg = document.getElementById("audioImg");
  if (audioImg.src.endsWith("on-sound.svg")) {
    audioImg.src = "./img/11_audio/off-sound.svg";
    this.sound = false;
  } else {
    audioImg.src = "./img/11_audio/on-sound.svg";
    this.sound = true;
  }
}
