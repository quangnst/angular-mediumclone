import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { environment } from "src/environments/environment";
import { getFeedAction } from "../../store/actions/getFeed.action";
import { errorSelector, feedSelector, isLoadingSelector } from "../../store/selectors";
import { GetFeedResponseInterface } from "../../types/getFeedResponse.interface";

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})

export class FeedComponent implements OnInit, OnDestroy {
  @Input("apiUrl") apiUrlProps: string

  feed$: Observable<GetFeedResponseInterface | null>
  error$: Observable<string | null>
  isLoading$: Observable<boolean>

  limit: number
  baseUrl: string
  currentPage: number
  queryParamsSubscription: Subscription

  constructor(private store: Store, private router: Router, private route: ActivatedRoute){}

  ngOnInit() {
    this.initializeListeners()
    this.initializeValues()
    this.fetchData()
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe()
  }

  fetchData(): void {
    this.store.dispatch(getFeedAction({url: this.apiUrlProps}))
  }

  initializeListeners(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = Number(params['page'] || '1')
    })
  }

  initializeValues(): void {
    this.feed$ = this.store.pipe(select(feedSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.limit = environment.limit
    this.baseUrl = this.router.url.split("?")[0]
  }
}