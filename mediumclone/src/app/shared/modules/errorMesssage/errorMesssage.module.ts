import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ErrorMesssageComponent } from "./components/errorMesssage/errorMesssage.component";

@NgModule({
  imports: [CommonModule],
  declarations: [ErrorMesssageComponent],
  exports: [ErrorMesssageComponent]
})

export class ErrorMesssageModule {}