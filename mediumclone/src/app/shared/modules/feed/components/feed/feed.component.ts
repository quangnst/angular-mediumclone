import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { environment } from "src/environments/environment";
import { getFeedAction } from "../../store/actions/getFeed.action";
import { errorSelector, feedSelector, isLoadingSelector } from "../../store/selectors";
import { GetFeedResponseInterface } from "../../types/getFeedResponse.interface";
import queryString from "query-string";
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
    this.initializeValues()
    this.initializeListeners()
  }

  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe()
  }

  fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit
    const parseUrl = queryString.parseUrl(this.apiUrlProps)
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset,
      ...parseUrl.query
    })
    const apiUrlWithParams = `${this.apiUrlProps}?${stringifiedParams}`
    this.store.dispatch(getFeedAction({url: apiUrlWithParams}))
  }

  initializeListeners(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = Number(params['page'] || '1')
      this.fetchFeed()
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