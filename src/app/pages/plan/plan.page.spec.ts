import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanPage } from './plan.page';

describe('PlanPage', () => {
  let component: PlanPage;
  let fixture: ComponentFixture<PlanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
