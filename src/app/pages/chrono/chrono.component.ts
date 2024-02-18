import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-chrono',
  standalone: true,
  imports: [
    MatCardModule,
  ],
  templateUrl: './chrono.component.html',
  styleUrl: './chrono.component.css'
})
export class ChronoComponent {
  currentTime: number | undefined;
  isRunning: boolean = false;
  timer : ReturnType<typeof setTimeout> | undefined;
  startTime : number | undefined;
  milli : number | undefined;
  sec: number | undefined;
  min: number | undefined;
  text: string = "Start";
  lapTime: string | undefined;


  startTimer(){
    
    if(!this.isRunning){
      
      this.text = 'stop';
      this.startTime = Date.now();
      this.timer = setInterval(()=>{
        this.currentTime = Date.now() -( this.startTime! || 0);
        this.convertToDisplayFormat();
      },10);
    }else{
      this.text = 'resume';
      clearInterval(this.timer);
    }
    this.isRunning = !this.isRunning;
  }

  clearTimer(){
    clearInterval(this.timer);
    this.text = 'Start';
    this.isRunning = false;
    this.currentTime = undefined;
    this.milli = undefined;
    this.sec = undefined;
    this.min = undefined;
  }

  convertToDisplayFormat(){
    this.milli = this.currentTime!%1000;
    if(this.currentTime! >= 1000){
      this.sec = Math.floor(this.currentTime! / 1000);
      if(this.sec >= 60){
        this.min = Math.floor(this.sec / 60);
        this.sec = this.sec%60;
      }
    }
  }

  lapTimer(){
     this.lapTime = `${this.min?.toString() || '00'}:${this.sec?.toString()|| '00'}.${this.milli?.toString()}`;
     console.log(this.lapTime);
  }

}
