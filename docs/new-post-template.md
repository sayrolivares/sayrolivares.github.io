# New Post Template

Create new post files under `posts/<category>/` using front matter plus the article body.

```html
---
layout: post
title: "Post title"
description: "One-sentence summary used in cards, SEO metadata, and RSS."
date: 2026-03-19
category_slug: writing
category_label: "Writing"
category_nav_label: "Writing"
topic: "Essay"
tags:
  - "Tag One"
  - "Tag Two"
---
<p>Opening paragraph.</p>
<p>Next paragraph.</p>

<h2>Section heading</h2>
<p>More content.</p>
```

The publish date comes from `date:`. Reading time is calculated automatically from the article body in the shared `post` layout.
