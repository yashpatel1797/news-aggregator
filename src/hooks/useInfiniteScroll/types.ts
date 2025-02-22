export interface InfiniteScrollOptions {
  threshold?: number;
  disabled?: boolean;
}

export interface ScrollState {
  scrollTop: number;
  windowHeight: number;
  documentHeight: number;
}