// A room earns the "Top Rated" title once its real review average hits this bar.
export const TOP_RATED_THRESHOLD = 4.5;

export const isTopRated = (rating, reviews = 0) =>
  reviews > 0 && (rating || 0) >= TOP_RATED_THRESHOLD;
