---
title: "Hugo Content Creation"
description: "Hugo Basics"
showTableOfContents: true
weight: 50
series: ["Hugo Installation"]
series_order: 5
lastmod: "2026-01-26T00:18:00-06:00"
tags: ["hugo"]
---

## Leaf vs Bundle

- A "Bundle" would be a group of bundles/leafs (children).
- A "Leaf" is a final page, with no children.

For example we have _index.md that are bundles (docs, hugo) and we have leafs (index.md + *.jpg)

```
docs/
|-- _index.md
`-- hugo/
    |-- _index.md
    |-- hugo-overview/
    |   |-- featured.jpg
    |   |-- image1.jpg
    |   `-- index.md
    `-- hugo-prequisits/
        `-- index.md
```


## Folder Structure

Each theme is different, but blowfish theme looks for a folder and inside that folder are all assets.

