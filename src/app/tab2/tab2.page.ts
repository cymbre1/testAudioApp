import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {
    const audioPlayer = document.querySelector(".audio-player");
    const audio = new Audio("https://my.fourminutebiblestudy.com/devotional/63/audio");

    audio.addEventListener('loadeddata', () => {
      if(audioPlayer)
      {
        let timeAndLength = <HTMLElement>audioPlayer.querySelector(".time .length");
        timeAndLength!.textContent = getTimeCodeFromNum(audio.duration);
        audio.volume = .75
      }
    }, false);

    const timeline = <HTMLDivElement>audioPlayer?.querySelector(".timeline");
    timeline?.addEventListener("click", (e : MouseEvent)=>{
      const timeLineWidth = window.getComputedStyle(timeline).width;
      const timeToSeek = e.offsetX / parseInt(timeLineWidth) * audio.duration;
      audio.currentTime = timeToSeek;
    }, false);

    const volumeSlider = <HTMLDivElement>audioPlayer?.querySelector(".controls .volume-slider");
    volumeSlider?.addEventListener("click", e => {
      const sliderWidth = window.getComputedStyle(volumeSlider).width;
      const newVolume = e.offsetX / parseInt(sliderWidth);
      audio.volume = newVolume;
      let volume = <HTMLDivElement>audioPlayer?.querySelector(".controls .volume-percentage");
      volume.style.width = newVolume * 100 + '%'
    });

    setInterval(() => {
      const progressBar = <HTMLElement>audioPlayer?.querySelector(".progress");
      progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
      let currentTime = <HTMLDivElement>audioPlayer?.querySelector(".time .current");
      currentTime.textContent = getTimeCodeFromNum(audio.currentTime);
    }, 500);

    const playBtn = audioPlayer?.querySelector(".controls .toggle-play");
    playBtn?.addEventListener("click", () => {
      console.log("Play");
      if(audio.paused) {
        playBtn.classList.remove("play");
        playBtn.classList.add("pause");
        audio.play();
      } else {
        playBtn.classList.remove("pause");
        playBtn.classList.add("play");
        audio.pause();
      }
    }, false);

    let volumeButton = <HTMLButtonElement>audioPlayer?.querySelector(".volume-button");
    volumeButton?.addEventListener("click", () => {
      const volumeEl = audioPlayer?.querySelector(".volume-container .volume");
      audio.muted = !audio.muted;
      if (audio.muted) {
        volumeEl?.classList.remove("icono-volumeMedium");
        volumeEl?.classList.add("icono-volumeMute");
      } else {
        volumeEl?.classList.add("icono-volumeMedium");
        volumeEl?.classList.remove("icono-volumeMute");
      }
    });

    function getTimeCodeFromNum(num : number) {
      let seconds = num;
      let minutes= Math.floor(seconds / 60);
      seconds -= Math.floor(minutes * 60);
      const hours = Math.floor(minutes / 60);
      minutes -= Math.floor(hours * 60);

      if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
      return `${String(hours).padStart(2, "0")}:${minutes}:${String(
        Math.floor(seconds % 60)).padStart(2, "0")}`;
    }
  }

}
