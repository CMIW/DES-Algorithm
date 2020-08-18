import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DESService } from '../../../core/services/des/des.service';
import { KeygeneratorService } from '../../../core/services/keygenerator/keygenerator.service';
import { UtilityService } from '../../../core/services/utility/utility.service';
import { ConsoleService } from '../../../core/services/console/console.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  form = new FormGroup({
    Message: new FormControl(''),
    Key: new FormControl('')
  });

  constructor(private dessService:DESService,
    private utilityService:UtilityService,
    private keygenerator:KeygeneratorService,
    private console:ConsoleService) { }

  ngOnInit(): void {

  }

  encrypt(){
    this.console.clear();
    var message:number[] = this.utilityService.stringtoByteArray(this.form.value.Message);
    var key:number[] = this.utilityService.stringtoByteArray(this.form.value.Key);
    //key = [0,0,0,1, 0,0,1,0, 0,0,1,1, 0,1,0,0, 0,1,0,1, 0,1,1,0, 0,1,1,1, 1,0,0,0, 1,0,0,1, 1,0,1,0, 1,0,1,1, 1,1,0,0, 1,1,0,1, 1,1,1,0, 1,1,1,1, 0,0,0,1];
    var keys:any[] = [];

    this.console.log("\nMensaje: \n"+this.utilityService.printBits(message));
    this.console.log("\nLLave: \n"+this.utilityService.printBits(key));

    this.keygenerator.generateKeys(key);
    keys = this.keygenerator.getKeys();

    this.form.setValue({Message:this.dessService.start(message, keys), Key: this.form.value.Key});
  }

  decrypt(){
    this.console.clear();
    var message:number[] = this.utilityService.stringtoByteArray(this.form.value.Message);
    var key:number[] = this.utilityService.stringtoByteArray(this.form.value.Key);

    var keys:any[] = [];

    this.console.log("\nMensaje: \n"+this.utilityService.printBits(message));
    this.console.log("\nLLave: \n"+this.utilityService.printBits(key));

    this.keygenerator.generateKeys(key);
    keys = this.keygenerator.getKeys().reverse();

    this.form.setValue({Message:this.dessService.start(message, keys), Key: this.form.value.Key});
  }

}
