import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoisPointageComponent } from './mois-pointage.component';

describe('MoisPointageComponent', () => {
  let component: MoisPointageComponent;
  let fixture: ComponentFixture<MoisPointageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoisPointageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoisPointageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
