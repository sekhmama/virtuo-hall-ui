import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubStreamComponent } from './sub-stream.component';

describe('SubStreamComponent', () => {
  let component: SubStreamComponent;
  let fixture: ComponentFixture<SubStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubStreamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
