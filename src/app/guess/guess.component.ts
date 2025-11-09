import { Component, EventEmitter, inject, Input, Output,OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ChanceService } from '../chance.service';
import { ToastrService } from 'ngx-toastr';
import { AlphaonlyDirective } from '../alphaonly.directive';
declare const words: string[];
@Component({
  selector: 'app-guess',
  imports: [FormsModule, NgClass,AlphaonlyDirective],
  templateUrl: './guess.component.html',
  styleUrl: './guess.component.scss'
})
export class GuessComponent {
  allWords = words;
  chanceService = inject(ChanceService)
  toastr = inject(ToastrService);
  @Input() answerWord:any = "";
   @Output() gameWon = new EventEmitter<void>();

 getLetterFrequency(word: string): Record<string, number[]> {
  const positions: Record<string, number[]> = {};

  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    positions[letter] ??= [];   // initialize array if it doesn't exist
    positions[letter].push(i);  // store index
  }

  return positions;
}


    
  guessMap : Record<string, number[]> = {};
  answerMap : Record<string, number[]> = {};
  

  ngOnChanges(changes:any){
    if(changes['answerWord']){
         this.guessWord = "";
      this.letterOne = "";
      this.letterTwo = "";
      this.letterThree = "";
      this.letterFour = "";
      this.letterFive = "";
      this.submitted = false;
    }

  }
  guessWord = ""
  letterOne = ""
  letterTwo = ""
  letterThree = ""
  letterFour = ""
  letterFive = ""
  
  submitted = false;
  

  onsubmitGuess(){
      this.guessWord = this.letterOne + this.letterTwo + this.letterThree + this.letterFour + this.letterFive;
      this.guessWord = this.guessWord.toLowerCase();
      this.checkWord();
    }

  checkWord(){
    if(this.allWords.includes(this.guessWord)){
      this.submitted = true;
      this.answerMap = this.getLetterFrequency(this.answerWord);
      this.guessMap = this.getLetterFrequency(this.guessWord)

 if (this.guessWord === this.answerWord) {

        this.toastr.success('Correct! You won!', 'Game Won');
        this.gameWon.emit(); 
        return;
      }
      
      this.chanceService.decrementChances();
    }else{
      this.toastr.error("Word not in list","Error");
    }
  }

 

  checkLetter(letter:any,index:any){
    if(this.submitted){
      const newCountMap: Record<string, number[]> = {};

      
      console.log(this.answerMap);
      
      
      if(this.answerWord.includes(letter.toLowerCase())){
        console.log("inside if block for letter present in answer");
        
        console.log(letter);
        console.log(this.guessMap);
        
  let guessList = [...this.guessMap[letter]]; 
      let answerList = this.answerMap[letter];
      const excessCount = guessList.length - answerList.length;
      console.log(guessList);
      console.log(answerList);
      
      

    if (excessCount > 0) {
        let removed = 0;
  
  
        for (let i = guessList.length - 1; i >= 0 && removed < excessCount; i--) {
          if (!answerList.includes(guessList[i])) {
            guessList.splice(i, 1);
            removed++;
          }
        }
      }

      newCountMap[letter] = guessList;
    
      }
    

    const correctPosition = letter.toLowerCase() === this.answerWord[index];
    let wrongPosition =false;
    if(newCountMap[letter]){
      wrongPosition = this.answerWord.includes(letter.toLowerCase()) && !correctPosition && newCountMap[letter] && newCountMap[letter].includes(index);
    }else{
      
       wrongPosition = this.answerWord.includes(letter.toLowerCase()) && !correctPosition 
    }


    if(correctPosition){
      return "green";
    }
    else if(wrongPosition){
      return "yellow";
  }else{
      return "gray";
  }

    }
return "gray"
       }

}
