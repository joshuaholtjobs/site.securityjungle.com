---
title: "Hugo Server"
description: "Commands for running the server"
showTableOfContents: true
weight: 60
tags: ["hugo"]
series: ["Hugo Installation"]
series_order: 6
---

## Correct Directory First
```
cd site.workers.digitalcrunch
```

## Normally
```
hugo server
```

## Suspected Stale behavior
```
hugo server --disableFastRender
```

## Nuke it (slow, most aggressive)
```
hugo server --disableFastRender --ignoreCache --gc --cleanDestinationDir
```
