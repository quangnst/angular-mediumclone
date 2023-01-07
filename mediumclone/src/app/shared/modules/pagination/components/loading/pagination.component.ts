import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'mc-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit {
  @Input("total") totalProps: number
  @Input("limit") limitProps: number
  @Input("url") urlProps: string
  @Input("currentPage") currentPageProps: number

  ngOnInit() {
    console.log(this.totalProps)
    console.log(this.limitProps)
    console.log(this.urlProps)
    console.log(this.currentPageProps)
  }
}