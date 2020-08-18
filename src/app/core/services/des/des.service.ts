import { Injectable } from '@angular/core';
import { KeygeneratorService } from '../keygenerator/keygenerator.service';
import { ConsoleService } from '../console/console.service';
import { UtilityService } from '../utility/utility.service';
import { CajasService } from '../cajas/cajas.service';

@Injectable({
  providedIn: 'root'
})
export class DESService {

  constructor(private console:ConsoleService,
    private keygenerator:KeygeneratorService,
    private utilityService:UtilityService,
    private cajasService:CajasService) { }

  start(pMessage:number[], pKeys:any[]){
    this.console.log("\n\nEncriptando el Mensaje ...");
    this.console.log("\n\nAplicando funcion IP al Mensaje ...");
    pMessage = this.IP(pMessage);
    this.console.log("\n"+this.utilityService.printBits(pMessage));

    var L0:number[] = pMessage.slice(0,(pMessage.length/2)>>0);
    var R0:number[] = pMessage.slice((pMessage.length/2)>>0,pMessage.length);
    this.console.log("\n\nL0: "+this.utilityService.printBits(L0));
    this.console.log("\nR0: "+this.utilityService.printBits(R0));

    for(var i = 0; i < 16; i++){
      this.console.log("\n\nIteracion #"+(i+1));
      var L1:number[] = L0;
      var R1:number[] = R0;

      this.console.log("\nExpansion ...");
      //L0 = this.expansion(L0);
      R0 = this.expansion(R0);
      this.console.log("\nR"+i+": "+this.utilityService.printBits(R0));

      this.console.log("\n\nXor R"+i+" y Llave #"+i+" . . . ");
      this.console.log("\nLLave: "+ this.utilityService.printBits(pKeys[i]));
      this.console.log("\nR"+i+": "+ this.utilityService.printBits(R0));
      R0 = this.utilityService.xor(R0,pKeys[i]);
      this.console.log("\n_________________________________________________________________________");
      this.console.log("\nR"+i+": "+ this.utilityService.printBits(R0));

      this.console.log("\n\nAgrupación en 6 . . . ");
      this.console.log("\nR"+i+": "+ this.utilityService.printBits6(R0));

      this.console.log("\n\nAplicando cajas a  R"+i+" . . .");
      R0 = this.aplicarCajas(R0);
      this.console.log("\nR"+i+": "+ this.utilityService.printBits(R0));

      this.console.log("\n\nPermutando R"+i+" . . .");
      R0 = this.permutacion(R0);
      this.console.log("\nR"+i+": "+ this.utilityService.printBits(R0));

      L1 = R1;
      this.console.log("\n\nXOR L"+i+" con f(R"+i+", K"+i+") . . .");
      this.console.log("\nL"+i+": "+ this.utilityService.printBits(L0));
      this.console.log("\nR"+i+": "+ this.utilityService.printBits(R0));
      R1 = this.utilityService.xor(L0,R0);
      this.console.log("\n_________________________________________________________________________");
      this.console.log("\nR"+(i+1)+": "+ this.utilityService.printBits(R1));

      L0 = L1;
      R0 = R1;
    }
    this.console.log("\n\nAplicando IP^-1 . . .");
    var sol:number[] = this.IP_1(R0.concat(L0));
    this.console.log("\nMensaje: "+ this.utilityService.printBits(sol));
    var message:string = this.utilityService.arraytoString(sol);
    this.console.log("\nMensaje: "+ message);
    return message;
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

  aplicarCajas(arrayBits:number[]){
    var sol:any = [];
    sol = sol.concat(this.sextetPermutation(arrayBits.slice(0,6),this.cajasService.getCaja(1)));
    sol = sol.concat(this.sextetPermutation(arrayBits.slice(6,12),this.cajasService.getCaja(2)));
    sol = sol.concat(this.sextetPermutation(arrayBits.slice(12,18),this.cajasService.getCaja(3)));
    sol = sol.concat(this.sextetPermutation(arrayBits.slice(18,24),this.cajasService.getCaja(4)));
    sol = sol.concat(this.sextetPermutation(arrayBits.slice(24,30),this.cajasService.getCaja(5)));
    sol = sol.concat(this.sextetPermutation(arrayBits.slice(30,36),this.cajasService.getCaja(6)));
    sol = sol.concat(this.sextetPermutation(arrayBits.slice(36,42),this.cajasService.getCaja(7)));
    sol = sol.concat(this.sextetPermutation(arrayBits.slice(42,48),this.cajasService.getCaja(8)));
    return sol;
  }

  permutacion(bloque:number[]){
    return [
        bloque[16-1],bloque[7-1],bloque[20-1],bloque[21-1],
        bloque[29-1],bloque[12-1],bloque[28-1],bloque[17-1],
        bloque[1-1],bloque[15-1],bloque[23-1],bloque[26-1],
        bloque[5-1],bloque[18-1],bloque[31-1],bloque[10-1],
        bloque[2-1],bloque[8-1],bloque[24-1],bloque[14-1],
        bloque[32-1],bloque[27-1],bloque[3-1],bloque[9-1],
        bloque[19-1],bloque[13-1],bloque[30-1],bloque[6-1],
        bloque[22-1],bloque[11-1],bloque[4-1],bloque[25-1]
        ];
  }

  sextetPermutation(arrayBits:number[], cajaS:any){
    var nRow:number = this.utilityService.bytetoNumber([0,0,arrayBits[0],arrayBits[5]]);
    var nCol:number = this.utilityService.bytetoNumber(arrayBits.slice(1,-1));
    return this.utilityService.numbertoByte(cajaS[nRow][nCol]).slice(4,8);
  }

  IP_1(bloque:number[]){
    return [
        bloque[40-1],bloque[8-1],bloque[48-1],bloque[16-1],bloque[56-1],bloque[24-1],bloque[64-1],bloque[32-1],
        bloque[39-1],bloque[7-1],bloque[47-1],bloque[15-1],bloque[55-1],bloque[23-1],bloque[63-1],bloque[31-1],
        bloque[38-1],bloque[6-1],bloque[46-1],bloque[14-1],bloque[54-1],bloque[22-1],bloque[62-1],bloque[30-1],
        bloque[37-1],bloque[5-1],bloque[45-1],bloque[13-1],bloque[53-1],bloque[21-1],bloque[61-1],bloque[29-1],
        bloque[36-1],bloque[4-1],bloque[44-1],bloque[12-1],bloque[52-1],bloque[20-1],bloque[60-1],bloque[28-1],
        bloque[35-1],bloque[3-1],bloque[43-1],bloque[11-1],bloque[51-1],bloque[19-1],bloque[59-1],bloque[27-1],
        bloque[34-1],bloque[2-1],bloque[42-1],bloque[10-1],bloque[50-1],bloque[18-1],bloque[58-1],bloque[26-1],
        bloque[33-1],bloque[1-1],bloque[41-1],bloque[9-1],bloque[49-1],bloque[17-1],bloque[57-1],bloque[25-1],
        ];
  }
}
