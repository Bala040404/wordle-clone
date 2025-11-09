import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSingleCharInput]'
})
export class SingleCharInputDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const inputElement = this.el.nativeElement as HTMLInputElement;

    
    if (inputElement.value.length > 1) {
      inputElement.value = inputElement.value.substring(0, 1);
    }
    
    
    if (inputElement.value.length === 1) {
    
      let nextElement: HTMLElement | null = inputElement.nextElementSibling as HTMLElement;
      
    
      while (nextElement && !(nextElement.classList.contains('letter') || nextElement.tagName === 'BUTTON')) {
        nextElement = nextElement.nextElementSibling as HTMLElement;
      }

      if (nextElement) {
    
        if (nextElement.tagName === 'BUTTON') {
    
          (nextElement as HTMLButtonElement).focus();
        } else if (nextElement.classList.contains('letter')) {
    
          (nextElement as HTMLInputElement).focus();
        }
      }
    }
  }

  @HostListener('keydown.backspace', ['$event']) onBackspace(event: Event): void {
    const inputElement = this.el.nativeElement as HTMLInputElement;

    
    if (inputElement.value.length === 0) {
      
      event.preventDefault();

      
      let previousElement: HTMLElement | null = inputElement.previousElementSibling as HTMLElement;

      
      while (previousElement && !previousElement.classList.contains('letter')) {
        previousElement = previousElement.previousElementSibling as HTMLElement;
      }

      if (previousElement) {
        
        (previousElement as HTMLInputElement).focus();
      }
    }
  }
}