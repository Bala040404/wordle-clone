import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChanceService {

  chances = signal(6);
 gameActive = signal(true);
  decrementChances() {
    this.chances.update(n=> n-1);
    console.log(this.chances());
    if (this.chances() <= 0) {
      this.gameActive.set(false); 
    }
    
  }

  getCount(){
    return this.chances();
  }

  resetCount(){
    this.chances.set(6);
    this.gameActive.set(true); 
  }

}
