import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  stringtoArray(str:string){
    var bits:string[] = [];
    for (var char of str){
      bits.push(char);
    }
    return bits
  }

  arraytoString(array:number[]):string {
    var sol:string = "";
    for(var i = 0; i < array.length; i = i + 8){
      sol += String.fromCharCode(this.bytetoNumber(array.slice(i, i + 8)));
      console.log(String.fromCharCode(this.bytetoNumber(array.slice(i, i + 8))));
    }
    return sol
  }

  printBits(pBytes:number[]):string {
    var bytes: string = "";
    for (let i = 0; i < pBytes.length; i++){
      if(i != 0 && i%4 == 0){
        bytes += " ";
      }
      bytes += pBytes[i].toString();
    }
    return bytes;
  }

  printBits6(pBytes:number[]):string {
    var bytes: string = "";
    for (let i = 0; i < pBytes.length; i++){
      if(i != 0 && i%6 == 0){
        bytes += " ";
      }
      bytes += pBytes[i].toString();
    }
    return bytes;
  }

  stringtoByteArray(str:string){
    var bits:number[] = [];
    for (var char of str){
      bits = bits.concat(this.chartoByte(char));
    }
    return bits
  }

  chartoByte(char:string){
    return this.numbertoByte(char.charCodeAt(0));
  }

  bytetoNumber(byte:number[]){
    var sol: number = 0;
    for(var i = 0; i < byte.length; i++){
      sol += byte[i]*(2**(byte.length-1-i));
    }
    return sol;
  }

  numbertoByte(number:number){
    var residuo:number[] =[];
    if (number == 0){
      residuo.push(0);
    }
    while(number > 0){
      residuo.push(number%2);
      number = (number/2) >> 0;
    }
    while(residuo.length%2 != 0 || residuo.length < 8){
      residuo.push(0);
    }
    return residuo.reverse();
  }

  splitHalf(array:number[]){
    return [array.slice(0,(array.length/2)>>0),array.slice((array.length/2)>>0,array.length)];
  }

  leftShift(array:number[], shifts:number){
    var temp:number[] = [];
    temp = array.slice(0,shifts);
    array = array.slice(shifts,array.length);
    array = array.concat(temp);
    return array;
  }

  xor(r0:number[],key:number[]){
    var sol:number[] = [];
    for(var i = 0; i < key.length; i++){
      if(r0[i] == key[i]){
        sol.push(0);
      }
      else{
        sol.push(1);
      }
    }
    return sol;
  }
}
