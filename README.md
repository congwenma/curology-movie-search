# How to set up

Make sure you have latest `node`

> npm i

> npm run start

# Challenges

I ran into several challenges during this exercise:

1. MUI's `Pagination` component uses a start page of `0` instead of `1` that TMDB uses.
2. There was a bug involved my initial debouncer that I had thought to be the problem with using async functions, which turn out to be a red herring as the real problem is the search endpoint expects a string (so we can't search for empty string, I defaulted to search for `'a'`).
3. TMDB doesn't allow page > 1000 search queries, which I didn't figure out how to solve.

# Decisions

- I wanted to use an infinite scroll, but decided to use MUI's Pagination component because there's a time limit.
- I wanted to refactor the result code, but this already took me about 3.5 hours.
- I wanted to use debounce initially b/c I was erring on the caution that my TMDB access might have a quota.
- I decided to use await for readability
- I decided to use router b/c I initially thought we would want to show individual movies on a separate page, which was not the case.

# Future improvements

- Infinite scroll or sparse list loading implementation as these can be more challenging and fun.
- Zero state display
- Figureout how to search the **wildcard** query instead of using `a` as default qurey
- Extract the reusable portion out of the search (abstracting away the debouncer and pagination):

```js
<Searcher
  handleSearch={this.handleSearch}
  listDisplay={MovieListComponent}
  onClick={this.handleClickMovie}
/>
```
