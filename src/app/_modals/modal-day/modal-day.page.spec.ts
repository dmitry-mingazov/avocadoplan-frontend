import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalDayPage } from './modal-day.page';

describe('ModalDayPage', () => {
  let component: ModalDayPage;
  let fixture: ComponentFixture<ModalDayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalDayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
