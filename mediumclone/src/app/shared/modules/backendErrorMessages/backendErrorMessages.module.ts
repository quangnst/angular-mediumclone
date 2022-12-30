import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { BackendErrorMessageComponent } from "./components/backendErrorMessages/backendErrorMessage.component";

@NgModule({
  imports: [CommonModule],
  declarations: [BackendErrorMessageComponent],
  exports: [BackendErrorMessageComponent]
})

export class BackEndErrorMessagesModule {}