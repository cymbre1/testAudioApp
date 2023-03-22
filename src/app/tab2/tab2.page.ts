import { Component, Output } from '@angular/core';
import { EventEmitter } from 'stream';
import { Subscription, timer } from 'rxjs';
import { map } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public audio: HTMLAudioElement;
  public timelineWidth : number;
  public timerSubscription: Subscription | null; 
  // @Output() timer = new EventEmitter()
  

  constructor() {

    this.audio = new Audio("https://my.fourminutebiblestudy.com/devotional/63/audio");
    this.timelineWidth = 0;
    this.timerSubscription = null;
  }

  setInterval() {
    console.log("Hi")
    this.timelineWidth = this.audio.currentTime /this.audio.duration * 100;
    console.log(this.timelineWidth)
  }
  
  getTimeCodeFromNum(seconds : number) {
    let minutes = Math.floor(seconds / 60)
    let extraSeconds = Math.floor(seconds % 60)
    return `${String(minutes).padStart(2, "0")}:${String(extraSeconds).padStart(2, "0")}`;
  }

  togglePlay() {
    console.log(this.audio);
    if(this.audio.paused) {
      console.log("play");
      this.audio.play();
      this.startUpdateTimer();
    } else {
      console.log("pause");
      this.audio.pause();
      this.stopUpdateTimer();
    }
  }

  startUpdateTimer() {
    this.timerSubscription = timer(0, 1000).pipe( 
      map(() => { 
        this.setInterval()
      }) 
      ).subscribe(); 
  }

  stopUpdateTimer() {
    this.timerSubscription?.unsubscribe()
  }

}
