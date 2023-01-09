import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ErrorMesssageModule } from "../errorMesssage/errorMesssage.module";
import { LoadingModule } from "../loading/loading.module";
import { PopularTagsComponent } from "./components/popularTags/popularTags.component";
import { PopularTagsService } from "./services/popularTags.service";
import { GetPopularTagsEffect } from "./store/effects/getPopularTags.effect";
import { reducers } from "./store/reducers";

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([GetPopularTagsEffect]), StoreModule.forFeature('popularTags', reducers), LoadingModule, ErrorMesssageModule, RouterModule],
  declarations: [PopularTagsComponent],
  exports: [PopularTagsComponent],
  providers: [PopularTagsService]
})

export class PopularTagsModule {

}