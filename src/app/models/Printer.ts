class Printer{
  constructor() {}

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

  printKey(pBytes:number[]):string {
    return this.printBits(pBytes);
  }

}
