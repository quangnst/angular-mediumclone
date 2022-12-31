import { GetFeedResponseInterface } from "./getFeedResponse.interface"

export class FeedStateInterface {
  isLoading: boolean
  error: string | null
  data: GetFeedResponseInterface | null
}