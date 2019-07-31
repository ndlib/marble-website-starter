---
title: Search
slug: search

components:
  - component: SearchFilterBox
  - component: MultiColumn
    props:
      - label: 'columns'
        value: 4
    components:
      - component: Column
        components:
          - component: SearchTools
      - component: Column
        props:
          - label: 'colSpan'
            value: 3
        components:
          - component: SearchResults
---

SEARCH PAGE
