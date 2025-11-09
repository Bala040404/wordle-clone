import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnusedAlphabetsComponent } from './unused-alphabets.component';

describe('UnusedAlphabetsComponent', () => {
  let component: UnusedAlphabetsComponent;
  let fixture: ComponentFixture<UnusedAlphabetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnusedAlphabetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnusedAlphabetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
