import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideStreamComponent } from './side-stream.component';

describe('SideStreamComponent', () => {
  let component: SideStreamComponent;
  let fixture: ComponentFixture<SideStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideStreamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
