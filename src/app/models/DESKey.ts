class DESKey{
  public console: string;
  private key: number[];
  private tempKey: number[];
  private C0: number[];
  private D0: number[];

  // receives an array of length 64
  constructor(pKey:number[]) {
    this.console = "";
    this.key = pKey;
    this.tempKey = [];
  }

  generateKeys(){
    this.P1Transponer();
  }

  // shrinks the 64 "bits" array to 56 "bits" array with a transposition
  P1Transponer(){
    var array: number[] = [];
    for (let j = 0; j < 6; j++){
      for (let i = 7; i >= 0; i--){
        array.push(this.key[i*8+j]);
      }
    }
    this.tempKey = array;
  }

  split(pBytes:number[]){
    var size:number = pBytes.length/2;
  }
}
