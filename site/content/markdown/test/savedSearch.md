---
title: Saved Search Test
slug: savedSearch

components:
  - component: MarkdownHtmlContent
  - component: SavedSearch
    props:
      - label: 'terms'
        value: 'le rossignol'
  - component: MarkdownHtmlContent
    props:
      - label: 'html'
        value: 'A different saved search on the same page. Term is "journal"'
  - component: SavedSearch
    props:
      - label: 'terms'
        value: 'journal'
---
Testing Saved Search with value of "rossignol"
