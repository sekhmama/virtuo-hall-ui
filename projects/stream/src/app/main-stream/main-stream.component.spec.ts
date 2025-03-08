import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainStreamComponent } from './main-stream.component';

describe('MainStreamComponent', () => {
  let component: MainStreamComponent;
  let fixture: ComponentFixture<MainStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainStreamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
