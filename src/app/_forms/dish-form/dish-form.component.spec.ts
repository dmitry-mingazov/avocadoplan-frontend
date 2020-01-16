import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DishFormComponent } from './dish-form.component';

describe('DishFormComponent', () => {
  let component: DishFormComponent;
  let fixture: ComponentFixture<DishFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishFormComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DishFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
