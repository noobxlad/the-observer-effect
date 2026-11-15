# The Observer Effect

A clean, minimal blog built with Jekyll and hosted on GitHub Pages.

## Local Development

```bash
bundle install
bundle exec jekyll serve
```

Visit `http://localhost:4000` to preview.

## Creating a New Article

Create a new file in `_posts/` with the naming convention:

```
YYYY-MM-DD-article-title.md
```

Front matter template:

```yaml
---
title: "Your Article Title"
date: YYYY-MM-DD HH:MM:SS +0530
categories: [Tech]
tags: [tag1, tag2]
excerpt: "A brief description of the article."
# Optional: overrides the default social-sharing image.
image: /assets/images/your-article-share-card.png
---
```

Each article uses the site’s default Open Graph image when `image` is omitted.
For the best sharing preview, use a locally hosted 1.91:1 image (for example,
1200 × 630 px).

## Categories

- Tech
- Science
- Tutorials
- Opinion

## License

Content © NOOB. All rights reserved.
