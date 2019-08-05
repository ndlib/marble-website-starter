---
title: Saved Search Test
slug: savedSearch

components:
  - component: MarkdownHtmlContent
  - component: SavedSearch
    props:
      - label: 'terms'
        value: 'rossignol'
  - component: MarkdownHtmlContent
    props:
      - label: 'html'
        value: 'A different saved search on the same page. Term is "letter"'
  - component: SavedSearch
    props:
      - label: 'terms'
        value: 'letter'
---
Testing Saved Search with value of "rossignol"
