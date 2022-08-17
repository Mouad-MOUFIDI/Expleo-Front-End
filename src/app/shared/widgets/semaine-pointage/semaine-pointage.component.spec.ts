import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemainePointageComponent } from './semaine-pointage.component';

describe('SemainePointageComponent', () => {
  let component: SemainePointageComponent;
  let fixture: ComponentFixture<SemainePointageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemainePointageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemainePointageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
