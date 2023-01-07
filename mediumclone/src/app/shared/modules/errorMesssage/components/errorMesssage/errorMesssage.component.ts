import { Component, Input } from "@angular/core";

@Component({
  selector: 'mc-error-message',
  templateUrl: './errorMesssage.component.html',
  styleUrls: ['./errorMesssage.component.scss']
})

export class ErrorMesssageComponent {
  @Input("message") messageProps: string = "Something went wrong"
}