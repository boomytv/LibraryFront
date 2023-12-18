import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerBooksComponent } from './worker-books.component';

describe('WorkerBooksComponent', () => {
  let component: WorkerBooksComponent;
  let fixture: ComponentFixture<WorkerBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkerBooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkerBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
