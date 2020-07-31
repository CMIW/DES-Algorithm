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
    keyArray = this.transponer(keyArray);
    this.printKeys(keyArray);
    this.keys = keyArray;
  }

  public getKeys(){
    return this.keys;
  }

  printKeys(array:any[]){
    this.console.log("\n\nLLaves:");
    for(var i = 0; i < array.length; i++){
      this.console.log("\n" + this.utilityService.printBits(array[i]));
    }
  }

// First permutation
  P1(key:number[]){
    var sol:number[] = [];
    for(var j = 1; j < 8; j++){
      for(var i = 7; i >= 0; i--){
        sol.push(key[i*8+j]);
      }
    }
    return sol;
  }

  shift(array1:number[],array2:number[]){
    var keys:any[] = [];
    for(var i = 0; i <= 16; i++){
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
    this.console.log("\nPC2:");
    for(var i = 0; i < keysArray.length; i++){
      keysArray[i] = this.P2(keysArray[i]);
      this.console.log("\n" + this.utilityService.printBits(keysArray[i]));
    }
    return keysArray;
  }

  P2(key:number[]){
    return [
        key[13],key[16],key[10],key[23],key[0],key[4],
        key[2],key[27],key[14],key[5],key[20],key[9],
        key[22],key[18],key[11],key[3],key[25],key[7],
        key[15],key[6],key[26],key[19],key[12],key[1],
        key[40],key[51],key[30],key[36],key[46],key[54],
        key[29],key[39],key[50],key[44],key[32],key[47],
        key[43],key[48],key[38],key[55],key[32],key[52],
        key[45],key[41],key[49],key[35],key[28],key[31]];
  }
}
