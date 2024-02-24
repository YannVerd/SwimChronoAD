import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTable, MatTableModule} from '@angular/material/table';
import { response } from 'express';
import { Observable, catchError, throwError } from 'rxjs';



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

@Injectable({
  providedIn: 'root'
})

export class ChronoComponent{
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
  http = inject(HttpClient);
    
  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '/'
      })
  };
  
  


  startTimer(): void{
    
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

  clearTimer(): void{
    clearInterval(this.timer);
    this.text = 'Start';
    this.isRunning = false;
    this.currentTime = undefined;
    this.milli = undefined;
    this.sec = undefined;
    this.min = undefined;
  }

  convertToDisplayFormat(): void{
    this.milli = this.currentTime!%1000;
    if(this.currentTime! >= 1000){
      this.sec = Math.floor(this.currentTime! / 1000);
      if(this.sec >= 60){
        this.min = Math.floor(this.sec / 60);
        this.sec = this.sec%60;
      }
    }
  }

  lapTimer(): void{
    this.idLap++;
    this.lapTime = `${this.min?.toString() || '00'}:${this.sec?.toString()|| '00'}.${this.milli?.toString()}`;
    this.listLaps.push({num: this.idLap, time: this.lapTime});
    this.table?.renderRows();
   
  }
  
  saveLaps(){
    // fetch here to back
    console.log(this.listLaps);
    if(this.listLaps.length > 0){
      // fetch("http://localhost:5024/saveTimes",{
      // method:'POST',
      // headers:{"Content-Type": "application/json"},
      // mode: 'no-cors',
      // body: JSON.stringify({"id":0, "laps":this.listLaps})
      // }).then( (response)=>{
      // !response.ok?  console.log(new Error("Not 2xx response", {cause: response})): console.log('laps send successfull')
      // }).catch((err)=>{
      // console.log(err)
      // })
   
     this.http.post("http://localhost:5024/saveTimes", this.listLaps, this.httpOptions).pipe(
      catchError(
      
        this.handleError
      )
     ).subscribe();
    }
    
  }

  clearLaps(): void{
    this.listLaps = [];
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  

}
