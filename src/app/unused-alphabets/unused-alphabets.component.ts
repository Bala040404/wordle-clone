import { Component, computed, inject } from '@angular/core';
import { LetterTrackService } from '../letter-track.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-unused-alphabets',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './unused-alphabets.component.html',
  styleUrl: './unused-alphabets.component.scss'
})
export class UnusedAlphabetsComponent {
  letterTracker = inject(LetterTrackService)
  
  
  fullAlphabet: string[] = Array.from({ length: 26 }, 
    (_, i) => String.fromCharCode('a'.charCodeAt(0) + i)
  );

  
  unusedLetters = computed(() => {
    const used = this.letterTracker.usedLetters();
    return this.fullAlphabet.filter(letter => !used.includes(letter));
  });

  
  usedLetters = this.letterTracker.usedLetters;
}