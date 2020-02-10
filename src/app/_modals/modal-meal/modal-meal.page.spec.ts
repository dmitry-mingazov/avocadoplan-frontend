import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalMealPage } from './modal-meal.page';

describe('ModalMealPage', () => {
  let component: ModalMealPage;
  let fixture: ComponentFixture<ModalMealPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMealPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalMealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
