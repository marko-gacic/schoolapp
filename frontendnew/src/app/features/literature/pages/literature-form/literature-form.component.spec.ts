import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiteratureFormComponent } from './literature-form.component';

describe('LiteratureFormComponent', () => {
  let component: LiteratureFormComponent;
  let fixture: ComponentFixture<LiteratureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiteratureFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiteratureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
