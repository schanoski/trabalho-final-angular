import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSchanoskiComponent } from './chart-schanoski.component';

describe('ChartSchanoskiComponent', () => {
  let component: ChartSchanoskiComponent;
  let fixture: ComponentFixture<ChartSchanoskiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartSchanoskiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartSchanoskiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
