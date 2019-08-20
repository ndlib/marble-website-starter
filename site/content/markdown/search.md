---
title: Search
slug: search

components:
  - component: SearchBase
    components:
    - component: SearchFilterBox
    - component: MultiColumn
      props:
        - label: "columns"
          value: "4"
      components:
        - component: Column
          components:
            - component: SearchDynamicRangeFilter
              props:
                - label: "field"
                  value: "year"
                - label: "label"
                  value: "Date"
            - component: SearchMenuFilter
              props:
                - label: "field"
                  value: "type.keyword"
                - label: "label"
                  value: "Format"
            - component: SearchRefinementListFilter
              props:
                - label: "field"
                  value: "repository.keyword"
                - label: "label"
                  value: "Location"
                - label: "operator"
                  value: "OR"
        - component: Column
          props:
            - label: "colSpan"
              value: "3"
          components:
            - component: SearchResults
---

SEARCH PAGE
