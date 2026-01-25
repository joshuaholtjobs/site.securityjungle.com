---
title: "Hugo Step by Step"
description: "Step by Step Installation"
showTableOfContents: true
series: ["Hugo Installation"]
series_order: 4
lastmod: "2026-01-25T00:18:00-06:00"
---

## Explain workflow reference
- https://gohugo.io/host-and-deploy/host-on-netlify/

---

## New site from scratch (Hugo new site + new GitHub repo)

### 1) Create new Hugo site locally
Example:
    d:
    cd d:\sites\
    hugo new site site.demodocs.jamesfraze
    cd site.demodocs.jamesfraze

### 2) Initialize git and push to a new empty GitHub repo
Create a new repo on GitHub with NO files:
- site.demodocs.jamesfraze

Commands:
    git init
    git config --global --add safe.directory D:/sites/site.demodocs.jamesfraze
    git add -A
    git commit -m "first commit"
    git branch -M main
    git remote add origin https://github.com/rubysash/site.demodocs.jamesfraze.git
    git push -u origin main

Notes:
- safe.directory is only needed if git complains about "dubious ownership"
- git add -A is safest when you have deletions and lots of file moves

---

## Pick/install theme

### Example themes (content/blog)
- Docsy: https://github.com/google/docsy-example
- Paper: https://themes.gohugo.io/themes/hugo-paper/
- Pehtheme: https://themes.gohugo.io/themes/pehtheme-hugo/

### Example themes (content/CTA)
- Blowfish: https://blowfish.page/
- Clarity: https://themes.gohugo.io/themes/hugo-clarity/
- Hextra: https://themes.gohugo.io/themes/hextra/

---

## Installation example

Uses Blowfish as the example theme

### 1) Get the theme source into themes/
From site root:
    git clone https://github.com/nunocoracao/blowfish.git ./themes/blowfish

### 2) Remove the theme repo metadata (so it becomes part of your repo)
Delete:
- themes/blowfish/.git
- themes/blowfish/.github
- themes/blowfish/.vscode

### 3) Default config

Preferred approach:
- Keep site config in your repo at config/_default/
- Do not rely on theme config files as the canonical source for your site

Steps:
1) Delete root hugo.toml if present (optional, depends on how you want config organized)
2) Copy:
   themes/blowfish/config/_default/
   to:
   config/_default/

Then edit:
- config/_default/hugo.toml
- config/_default/params.toml

### 4) Cleanup
Delete these from themes/blowfish:
- update-github-data.sh
- CODE_OF_CONDUCT.md
- CONTRIBUTING.md
- .gitignore
- .prettierignore
- README*.md
- LICENSE*
- CHANGELOG*
- SECURITY.md
- NOTICE*
- AUTHORS*

### 5) Copy exampleSite (optional)
If you want demo content and demo config:
- themes/blowfish/exampleSite

Be aware:
- It is large
- It includes multilingual content and demo keys
- It can trigger ref errors if you delete language files without disabling languages

If you copy exampleSite, disable languages you are not shipping:
    disableLanguages = ["de", "es", "fr", "it", "ja", "pt-br", "pt-pt", "zh-cn"]

Important:
- If Netlify secret scanning flags AIza keys inside exampleSite, remove/replace them or delete exampleSite.

### 6) Test the site
From site root:
    hugo server

---

## Git hygiene

### Ignore build output
Edit .gitignore and ensure these lines exist:
- public/
- resources/
- .hugo_build.lock

If public/ was ever committed:
    git rm -r --cached public
    git add -A
    git commit -m "Stop tracking Hugo build output"
    git push

---

## Netlify setup

### New project
- New Project -> Import -> GitHub
- Select repo

Settings:
- Base directory: /
- Build command: hugo --gc --minify -b $URL
- Publish directory: public

Environment variables:
- HUGO_VERSION = 0.147.8

Deploy.

---

## DNS setup

### Add domain in Netlify
Netlify project -> Domain management -> Add domain:
- demodocs.jamesfraze.com

### Cloudflare DNS records
1) TXT record (verification)
- Name: subdomain-owner-verification
- Value: (Netlify-provided token)

2) CNAME record (subdomain to Netlify site)
- Name: demodocs
- Target: demodocsjamesfraze.netlify.app

Wait for DNS propagation (often 5-30 minutes), then verify in Netlify.

---

## Hidden Example

### GitHub repo privacy
GitHub repo settings:
- Danger Zone -> Change visibility -> Private

### Netlify site password protection
Netlify project -> General -> Password protection -> Configure password

---

## Search/replace helper (PowerShell) to remove demo Firebase API keys
Use only if needed (exampleSite content often includes demo keys).

    $old = 'SomeSecretorBad'
    $new = 'PlaceholderAPIText'
    Get-ChildItem -Path "D:\sites\site.demodocs.jamesfraze\themes\blowfish\exampleSite" -Recurse -File |
      ForEach-Object {
        $c = Get-Content $_.FullName -Raw
        if ($c -like "*$old*") {
          $c = $c.Replace($old, $new)
          Set-Content -Path $_.FullName -Value $c -NoNewline
          Write-Host "Replaced in:" $_.FullName
        }
      }

Verify it is gone:
    Get-ChildItem -Path "D:\sites\site.demodocs.jamesfraze\themes\blowfish\exampleSite" -Recurse -File |
      Select-String -Pattern "AIza"

---

## Reclone

### Goal
- Duplicate an existing site repo as a starting point
- Push it into a different GitHub repo
- Create a new Netlify site and bind a new domain/subdomain

### DNS prep (example: digitalcrunch.com)
Add CNAME in Cloudflare:
- Name: workers
- Target: workersdigitalcrunch.netlify.app

### Create GitHub repo (empty)
- https://github.com/rubysash/site.workers.digitalcrunch

### Clone from source repo into a new folder name
    cd d:\sites
    git clone https://github.com/rubysash/site.demodocs.jamesfraze.git site.workers.digitalcrunch
    cd site.workers.digitalcrunch

If git complains about ownership:
    git config --global --add safe.directory D:/sites/site.workers.digitalcrunch

### Point origin to the new repo
    git remote set-url origin https://github.com/rubysash/site.workers.digitalcrunch.git
    git remote -v

### Customize
- edit config/
- edit content/

### Commit and push
    git status
    git add -A
    git commit -m "Initial workers site"
    git push

### Netlify project for the new repo
- New Project -> Import -> GitHub
- Select site.workers.digitalcrunch repo

Settings:
- Base directory: /
- Build command: hugo --gc --minify -b $URL
- Publish directory: public
- Env var: HUGO_VERSION = 0.147.8

### Add domain in Netlify and verify
- workers.digitalcrunch.com
- Add TXT verification record in Cloudflare if required
- Confirm site loads: https://workers.digitalcrunch.com

---

## Quick troubleshooting checklist

### If Hugo shows REF_NOT_FOUND in languages (fr/de/etc.)
- You deleted language-specific files but still have those languages enabled
Fix:
- Disable languages in config, or restore language files

### If Netlify secret scanning fails on AIza strings
- Remove demo keys from config/content/themes/exampleSite
- Ensure public/ is not committed
- Re-run a repo search before pushing

### If buymeacoffee widget appears unexpectedly
- Ensure you changed your site config (config/_default/params.toml), not only theme defaults
- Explicitly set the related params to false in site config


