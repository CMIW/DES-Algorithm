import { Injectable } from '@angular/core';
import { ConsoleService } from '../console/console.service';
import { UtilityService } from '../utility/utility.service';

@Injectable({
  providedIn: 'root'
})
export class KeygeneratorService {
  private keys:number[] = [];

  constructor(private console:ConsoleService,
    private utilityService:UtilityService) { }

  generateKeys(key:number[]){
    this.console.log("\n\nGenerando las llaves para DES ...");
    this.console.log("\nPC1:");
    var keyArray:number[] = this.P1(key);
    this.console.log("\n" + this.utilityService.printBits(keyArray));

    var C0:number[] = keyArray.slice(0,(keyArray.length/2)>>0);
    var D0:number[] = keyArray.slice((keyArray.length/2)>>0,keyArray.length);
    this.console.log("\n\nC0: "+this.utilityService.printBits(C0));
    this.console.log("\nD0: "+this.utilityService.printBits(D0));

    this.console.log("\n\nAplicando el shift a las llaves ...");
    keyArray = this.shift(C0,D0);
    this.printKeys(keyArray);

    this.console.log("\n\nPC2:");
    keyArray = this.transponer(keyArray);
    this.printKeys(keyArray);

    this.console.log("\n\nLLaves:");
    this.printKeys(keyArray);
    this.keys = keyArray;
  }

  public getKeys(){
    return this.keys;
  }

  printKeys(array:any[]){
    for(var i = 0; i < array.length; i++){
      this.console.log("\n" + this.utilityService.printBits(array[i]));
    }
  }

// First permutation
  P1(key:number[]){
    return [
    key[57-1], key[49-1], key[41-1], key[33-1], key[25-1], key[17-1], key[9-1],
    key[1-1], key[58-1], key[50-1], key[42-1], key[34-1], key[26-1], key[18-1],
    key[10-1], key[2-1], key[59-1], key[51-1], key[43-1], key[35-1], key[27-1],
    key[19-1], key[11-1], key[3-1], key[60-1], key[52-1], key[44-1], key[36-1],
    key[63-1], key[55-1], key[47-1], key[39-1], key[31-1], key[23-1], key[15-1],
    key[7-1], key[62-1], key[54-1], key[46-1], key[38-1], key[30-1], key[22-1],
    key[14-1], key[6-1], key[61-1], key[53-1], key[45-1], key[37-1], key[29-1],
    key[21-1], key[13-1], key[5-1], key[28-1], key[20-1], key[12-1], key[4-1]];
  }

  shift(array1:number[],array2:number[]){
    var keys:any[] = [];
    for(var i = 1; i <= 16; i++){
      if(i == 1 || i == 2 || i == 9 || i == 16){
        array1 = this.utilityService.leftShift(array1,1);
        array2 = this.utilityService.leftShift(array2,1);
      }
      else{
        array1 = this.utilityService.leftShift(array1,2);
        array2 = this.utilityService.leftShift(array2,2);
      }
      keys.push(array1.concat(array2));
    }
    return keys;
  }

  transponer(keysArray:any[]){
    for(var i = 0; i < keysArray.length; i++){
      keysArray[i] = this.P2(keysArray[i]);
    }
    return keysArray;
  }

  P2(key:number[]){
    return [
        key[14-1],key[17-1],key[11-1],key[24-1],key[1-1],key[5-1],
        key[3-1],key[28-1],key[15-1],key[6-1],key[21-1],key[10-1],
        key[23-1],key[19-1],key[12-1],key[4-1],key[26-1],key[8-1],
        key[16-1],key[7-1],key[27-1],key[20-1],key[13-1],key[2-1],
        key[41-1],key[52-1],key[31-1],key[37-1],key[47-1],key[55-1],
        key[30-1],key[40-1],key[51-1],key[45-1],key[33-1],key[48-1],
        key[44-1],key[49-1],key[39-1],key[56-1],key[34-1],key[53-1],
        key[46-1],key[42-1],key[50-1],key[36-1],key[29-1],key[32-1]];
  }
}
