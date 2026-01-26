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

# Hugo build and deploy notes

We are going to setup hugo on windows to use github and netlify for free hosting of static pages that are fast and secure.  The times I have listed are without AI.  AI GREATLY speeds up this process by 8x or more.    Of course it takes longer the first time but you get faster at it.   Out of the box, you don't "NEED" to design anything.  The theme does that.  AI can create wonderful content in minutes, but you might spend 1-2 hours verifying, fixing, updating, and polishing it.   

You will almost entirely stay in the "Publish" category of workflow once things are setup.

{{< process-steps >}}
step: Setup
- 2-4hrs Approx
- (Required, Once)
- Install Go
- Install Git
- Install Hugo
- Init Repo
- Netlify Project
- Domain Name 
- Twiddle

step: Design
- 2-8hrs + Changes
- Choose theme
- Edit hugo.toml
- Customize CSS
- Optional Short Codes

step: Publish
- 1-2 hours Manually
- Write in Markdown
- Confirm Locally
- Push to GitHub

step: Deploy
- (Automatic/3min)
- CI triggers
- CDN delivery
{{< /process-steps >}}

The rest of this is going to be an overview so you get the basic understanding of the tech and terms behind what you're doing.   To be honest, you don't need to learn much, but it's intimidating the first time.

## Overview
### Related Terms
<dl>
  <dt>Hugo (Extended)</dt>
  <dd>The Hugo build with the extended feature set used for asset processing (Hugo Pipes, SCSS, etc.).</dd>

  <dt>Go</dt>
  <dd>Used by Hugo Modules and some theme/tooling workflows.</dd>

  <dt>Dart Sass</dt>
  <dd>Only needed if your theme requires SCSS compilation outside Hugo Pipes.</dd>

  <dt>Tailwind</dt>
  <dd>Only needed if your theme requires Node-based asset builds.</dd>

  <dt>Sitemaps and robots.txt</dt>
  <dd>Site discovery and crawler control. Hugo can generate sitemaps; robots.txt can be generated or custom.</dd>

  <dt>JSON-LD and schema.org</dt>
  <dd>Structured data to help search engines understand entities and page intent.</dd>

  <dt>Schema reference</dt>
  <dd><a href="https://dpb587.me/entries/add-schema-org-json-ld-to-hugo-templates-20251024">dpb587.me: Add schema.org JSON-LD to Hugo templates</a></dd>
</dl>

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


