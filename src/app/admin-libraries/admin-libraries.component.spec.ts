import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLibrariesComponent } from './admin-libraries.component';

describe('AdminLibrariesComponent', () => {
  let component: AdminLibrariesComponent;
  let fixture: ComponentFixture<AdminLibrariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminLibrariesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminLibrariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
