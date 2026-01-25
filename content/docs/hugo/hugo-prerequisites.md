---
title: "Hugo Prerequisites"
description: "Setup these things Before You Install Hugo"
showTableOfContents: true
series: ["Hugo Installation"]
series_order: 3
lastmod: "2026-01-25T00:18:00-06:00"
---
## Prerequisites

### Winget
Docs:
- https://docs.microsoft.com/en-us/windows/package-manager/winget

### Go
Docs and downloads:
- https://go.dev/doc/install
- https://go.dev/dl/

Verify:
    go version

### Hugo (Extended)
Docs:
- https://gohugo.io/getting-started/installing

Install via winget:
    winget uninstall --name "Hugo (Extended)"
    winget install Hugo.Hugo.Extended

Verify:
    hugo version

### Git
Installer:
- https://git-scm.com/install/windows

Install via winget:
    winget install --id Git.Git -e --source winget

Verify:
    git --version

### Analytics
- GA4: https://analytics.google.com/analytics/web/
- Search Console: https://developers.google.com/search

### Comments
Hugo comments overview:
- https://gohugo.io/content-management/comments/

Options:
- Disqus (paid tiers): https://disqus.com/
- Giscus (free, GitHub-based): https://giscus.app/
- Remark42 (free, self-host): https://remark42.com/

### Netlify account
- https://app.netlify.com/login

### Cloudflare account
- https://dash.cloudflare.com/
- Purchase domain
- Manage DNS records
