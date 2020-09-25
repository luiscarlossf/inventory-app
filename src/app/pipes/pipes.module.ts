import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandPipe } from './brand.pipe';
import { CategoryPipe } from './category.pipe';
import { FloorPipe } from './floor.pipe';
import { ModelPipe } from './model.pipe';
import { UaPipe } from './ua.pipe';
import { EquipamentPipe } from './equipament.pipe';



@NgModule({
  declarations: [
    BrandPipe,
    CategoryPipe,
    FloorPipe,
    ModelPipe,
    UaPipe,
    EquipamentPipe,
  ],
  exports:[
    BrandPipe,
    CategoryPipe,
    FloorPipe,
    ModelPipe,
    UaPipe,
    EquipamentPipe,
  ],
  imports: [
    CommonModule
  ],
})
export class PipesModule { }
