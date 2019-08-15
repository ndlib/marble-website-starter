---
title: Map
slug: map

components:
  - component: MarkdownHtmlContent
    props:
      - label: "html"
        value: "<p>A test map.</p>"
  - component: Map
    props:
      - label: "kmlFile"
        value: "https://test-kml-files-for-marble.s3.amazonaws.com/westcampus.kml"
      - label: "lat"
        value: "37.42390182131783"
      - label: "lng"
        value: "-122.0914977709329"
      - label: "defaultZoom"
        value: "10"
---

Some notes:

We are using an externally hosted map. We want to be able to include the kml file locally and reference it as:

```
- label: "kmlFile"
  fileValue: "./kml/westcampus.kml"
```
