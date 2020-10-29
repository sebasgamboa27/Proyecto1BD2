import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkingPageComponent } from './walking-page.component';

describe('WalkingPageComponent', () => {
  let component: WalkingPageComponent;
  let fixture: ComponentFixture<WalkingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalkingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
