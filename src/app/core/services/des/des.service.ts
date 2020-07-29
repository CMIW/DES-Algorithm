import { Injectable } from '@angular/core';
import { KeygeneratorService } from '../keygenerator/keygenerator.service';
import { ConsoleService } from '../console/console.service';
import { UtilityService } from '../utility/utility.service';

@Injectable({
  providedIn: 'root'
})
export class DESService {

  constructor(private console:ConsoleService,
    private keygenerator:KeygeneratorService,
    private utilityService:UtilityService) { }

  start(pMessage:number[], pKeys:any[]){
    var message:string = this.utilityService.printBits(pMessage);

    this.console.log("\n\nEncrypting Message ...");
    this.console.log("\n\nApplying IP to Message ...");
    pMessage = this.IP(pMessage);
    message = this.utilityService.printBits(pMessage);
    this.console.log("\n"+message);

    var L0:number[] = pMessage.slice(0,(pMessage.length/2)>>0);
    var R0:number[] = pMessage.slice((pMessage.length/2)>>0,pMessage.length);
    this.console.log("\n\nL0: "+this.utilityService.printBits(L0));
    this.console.log("\nR0: "+this.utilityService.printBits(R0));

    for(var i = 0; i < 16; i++){
      this.console.log("\n\nIteration #"+(i+1));
      var L1:number[] = L0;
      var R1:number[] = R0;

      this.console.log("\nExpansion ...");
      L0 = this.expansion(L0);
      R0 = this.expansion(R0);
      this.console.log("\nR"+i+": "+this.utilityService.printBits(R0));

      this.console.log("\n\nXor R"+i+" y Key "+i+" . . . ");
      this.console.log("\nKey: "+ this.utilityService.printBits(pKeys[i]));
      this.console.log("\nR"+i+": "+ this.utilityService.printBits(R0));
      R0 = this.utilityService.xor(R0,pKeys[i]);
      this.console.log("\nR"+i+": "+ this.utilityService.printBits(R0));

      this.sextetPermutation(R0,[1]);
    }
  }

  IP(bloque:number[]){
    return [
        bloque[57],bloque[49],bloque[41],bloque[33],bloque[25],bloque[17],bloque[9],bloque[1],
        bloque[59],bloque[51],bloque[43],bloque[35],bloque[27],bloque[19],bloque[11],bloque[3],
        bloque[61],bloque[53],bloque[45],bloque[37],bloque[29],bloque[21],bloque[13],bloque[5],
        bloque[63],bloque[55],bloque[47],bloque[39],bloque[31],bloque[23],bloque[15],bloque[7],
        bloque[56],bloque[48],bloque[40],bloque[32],bloque[24],bloque[16],bloque[8],bloque[0],
        bloque[58],bloque[50],bloque[42],bloque[34],bloque[26],bloque[18],bloque[10],bloque[2],
        bloque[60],bloque[52],bloque[44],bloque[36],bloque[28],bloque[20],bloque[12],bloque[4],
        bloque[62],bloque[54],bloque[46],bloque[38],bloque[30],bloque[22],bloque[14],bloque[6]
        ];
  }

  expansion(bloque:number[]){
    return [
        bloque[32-1],bloque[1-1],bloque[2-1],bloque[3-1],bloque[4-1],bloque[5-1],
        bloque[4-1],bloque[5-1],bloque[6-1],bloque[7-1],bloque[8-1],bloque[9-1],
        bloque[8-1],bloque[9-1],bloque[10-1],bloque[11-1],bloque[12-1],bloque[13-1],
        bloque[12-1],bloque[13-1],bloque[14-1],bloque[15-1],bloque[16-1],bloque[17-1],
        bloque[16-1],bloque[17-1],bloque[18-1],bloque[19-1],bloque[20-1],bloque[21-1],
        bloque[20-1],bloque[21-1],bloque[22-1],bloque[23-1],bloque[24-1],bloque[25-1],
        bloque[24-1],bloque[25-1],bloque[26-1],bloque[27-1],bloque[28-1],bloque[29-1],
        bloque[28-1],bloque[29-1],bloque[30-1],bloque[31-1],bloque[32-1],bloque[1-1]
        ];
  }

  sextetPermutation(arrayBits:number[], cajaS:number[]){
    var row:number[] = [0,0];
    row = row.concat(arrayBits[0]);
    row = row.concat(arrayBits[5]);
    var nRow:number = this.utilityService.bytetoNumber(row);
    console.log(row);
    console.log(nRow);
  }
}
