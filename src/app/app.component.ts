import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GuessComponent } from "./guess/guess.component";
import { ChanceService } from './chance.service';
import { CommonModule } from '@angular/common';
import { LetterTrackService } from './letter-track.service';
import { UnusedAlphabetsComponent } from "./unused-alphabets/unused-alphabets.component";

declare const words: string[];
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GuessComponent, CommonModule, UnusedAlphabetsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  chanceService = inject(ChanceService);
  title = '-clone';
  wordlist = words;
  gameWon = false;
  chanceLeft = computed(()=>  this.chanceService.getCount());
  letterTracker = inject(LetterTrackService)
  
  
  randomIndex = Math.floor(Math.random() * words.length);
  randomWord = words[this.randomIndex];

  resetGame(){
    this.randomIndex = Math.floor(Math.random() * words.length);
    this.randomWord = words[this.randomIndex];
    this.chanceService.resetCount();
    this.gameWon = false;
    this.letterTracker.clearArray()

  }
  onGameWon() {
    this.gameWon = true;
    this.chanceService.gameActive.set(false);
  }
  
}
