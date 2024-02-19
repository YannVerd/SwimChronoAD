import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTable, MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-chrono',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTableModule,
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
  listLaps: Object[] = [];
  idLap: number = 0;
  displayedColumns: string[] = ['id', 'time'];

  @ViewChild(MatTable) table: MatTable<Object> | undefined;


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
    this.idLap++;
    this.lapTime = `${this.min?.toString() || '00'}:${this.sec?.toString()|| '00'}.${this.milli?.toString()}`;
    this.listLaps.push({id: this.idLap, time: this.lapTime});
    this.table?.renderRows();
   
  }
  
  saveLaps(){
    // fetch here to back
    console.log(this.listLaps);
  }

  clearLaps(){
    this.listLaps = [];
  }

}
