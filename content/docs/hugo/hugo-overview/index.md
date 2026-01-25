---
title: "Hugo Overview"
description: "Hugo Basics"
showTableOfContents: true
weight: 20
series: ["Hugo Installation"]
series_order: 2
lastmod: "2026-01-25T00:18:00-06:00"
tags: ["hugo"]
type: 'hugo'
---

{{< mermaid >}}
graph LR;
    A[Write in Markdown] --> B[Confirm on Local Server];
    B --> C[Publish to GitHub Private];
    C --> D[Distribute Via CI/CD to CDN]

    style A fill:#f9f,stroke:#000,stroke-width:3px,color:#000
    style B fill:#bbf,stroke:#000,stroke-width:3px,color:#000
    style C fill:#bfb,stroke:#000,stroke-width:3px,color:#000
    style D fill:#fdb,stroke:#000,stroke-width:3px,color:#000
{{< /mermaid >}}

# Hugo build and deploy notes

We are going to setup hugo on windows to use github and netlify for free hosting of static pages that are fast and secure.

## Overview
### Terms
- Hugo (Extended)
- Go (for Hugo Modules and some toolchains)
- Dart Sass (only if your theme requires SCSS compilation outside Hugo Pipes)
- Tailwind (only if your theme requires Node-based asset builds)
- Sitemaps and robots.txt
- JSON-LD and schema.org
- Schema reference: https://dpb587.me/entries/add-schema-org-json-ld-to-hugo-templates-20251024

### Audience
- Who this is for
  - People who want fast, secure, low-maintenance static sites
  - People comfortable with git-based workflows
- Who this is not for
  - People who want click-only editing and plugins with no code/config
  - People who need complex server-side apps without serverless add-ons

### Static sites
Reasons to prefer static:
- Fast (CDN caching)
- Low attack surface
- Simple hosting
- Version-controlled content and config
- Easy rollback

### Alternatives
- WordPress
- Site builders
- GoHighLevel pages

### Pricing

- Hosting: often free/cheap (Netlify, Cloudflare Pages, etc.)
- Build + CDN: typically included
- Comments: varies (Disqus paid tiers, Giscus free, Remark42 self-host)

### Tooling map
Pre-installs:
- Winget
- Go (optional depending on theme/module usage)

Main installs:
- Hugo Extended
- Git
- Visual Studio Code
- Obsidian
- LLM tooling (optional)

Tool setups (optional):
- Notepad++
- VS Code extensions
- Obsidian vault and templates
- LLM system prompt / instructions

### Accounts
- GitHub
- Cloudflare
- Netlify

### Pipeline
- Hugo source -> GitHub repo -> Netlify build -> Netlify CDN publish

### Workflow (manual)
- Create/edit page
- Validate locally (hugo server)
- Commit and push to GitHub

### Workflow (auto)
- GitHub push triggers Netlify build
- Netlify builds site
- Netlify publishes to CDN

### Customizations
- Theme selection
- Shortcodes
- CSS
- Template overrides (copy theme template into site layouts/)

### Metrics
- GA4
- Google Search Console (Webmaster Tools)
- DNS analytics (Cloudflare)

### Restoration
- git clone
- hugo server
- push changes

---
