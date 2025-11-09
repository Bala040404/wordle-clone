import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LetterTrackService {

  constructor() { }
  usedLetters = signal<String[]>([]);

  addLetter(letter:any){
    if(!this.usedLetters().includes(letter)){
      
      this.usedLetters.update((prev) => [...prev, letter]);
    }
  }

  clearArray(){
      this.usedLetters.update(() => []);
  }

}
