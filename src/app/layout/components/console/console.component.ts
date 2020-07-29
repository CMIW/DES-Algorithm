import { Component, OnInit } from '@angular/core';
import { ConsoleService } from '../../../core/services/console/console.service';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css'],
  preserveWhitespaces:true
})
export class ConsoleComponent implements OnInit {
  public log:string;

  constructor(private consoleService:ConsoleService) { this.log = ""; }

  ngOnInit(): void {
    this.consoleService.console.subscribe(log =>{
      this.log = log;
    })
  }

}
