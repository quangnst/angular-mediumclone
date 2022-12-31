import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { GetCurrentUserEffect } from "src/app/auth/store/effects/getCurrentUser.effect";
import { FeedComponent } from "./components/feed/feed.component";
import { FeedService } from "./services/feed.service";
import { reducers } from "./store/reducers";

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([GetCurrentUserEffect]), StoreModule.forFeature('feed', reducers)],
  declarations: [FeedComponent],
  exports: [FeedComponent],
  providers: [FeedService]
})

export class FeedModule {}