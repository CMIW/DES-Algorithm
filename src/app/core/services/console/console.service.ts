import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {
  private history:string = "";
  public console = new BehaviorSubject("");

  constructor() { }

  log(message:string){
    this.history = this.history + message;
    this.console.next(this.history);
  }

  clear(){
    this.history = "";
    this.console.next(" ");
  }
}
