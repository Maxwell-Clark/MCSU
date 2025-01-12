// 1. Define a type/interface for the scroll items
export interface ScrollItem {
    src: string;
    alt: string;
  }
  
  // 2. Define a props interface that has scroll_items as an array of ScrollItem
export interface InfiniteScrollProps {
    scroll_items: ScrollItem[];
  }
  