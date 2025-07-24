export interface InstagramUser {
  href: string;
  value: string;
  timestamp: number;
}

export interface InstagramDataItem {
  title: string;
  media_list_data: unknown[];
  string_list_data: InstagramUser[];
}

export type FollowersData = InstagramDataItem[];

export interface FollowingData {
  relationships_following: InstagramDataItem[];
}

export interface NonFollower {
  username: string;
  profileUrl: string;
  followedDate: Date;
}

export interface AnalysisResult {
  nonFollowers: NonFollower[];
  totalNonFollowers: number;
  totalFollowing: number;
  totalFollowers: number;
}

export interface AppState {
  currentPage: 'upload' | 'results';
  analysisResult: AnalysisResult | null;
  loading: boolean;
  error: string | null;
}