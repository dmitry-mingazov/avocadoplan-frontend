import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnumToArrayPipe } from '../enum-to-array.pipe';



@NgModule({
  declarations: [],
  imports: [EnumToArrayPipe],
  exports: [EnumToArrayPipe]
})
export class PipesModule {
  static forRoot() {
    return {
      ngModule: PipesModule,
      providers: []
    }
  }
 }
