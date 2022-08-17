import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourPointageComponent } from './jour-pointage.component';

describe('JourPointageComponent', () => {
  let component: JourPointageComponent;
  let fixture: ComponentFixture<JourPointageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JourPointageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JourPointageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
