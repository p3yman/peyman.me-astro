# Peyman's personal website/blog.

**Made with ❤️ using [Astro](https://astro.build)**

![Screenshot of the website](https://github.com/p3yman/peyman.me/assets/2673262/732ed582-3d8b-4070-9882-862f21828df0)

## CLI

There is a very basic CLI tool within the project that you can use to create new pages easily:

```bash
pnpm add-page
```

This will ask for title and categories, then create a markdown file in the `/src/content/blog` folder.

![CLI Demo](./vhs/cli-demo.gif)

The newly created post will have the following template:

```markdown
---
id: EbhE7oRJbDq76SBG
title: Try everything, absolutely Everything!
description: A short description
date: 2023-09-18
tags: sample-tag
cover: ./cover.jpg
categories: ["Dev", "Note"]
---

# Enjoy writing...
```

It has a generated ID to be used in the GitHub discussions, today's date. Remember to add the `cover.jpg` as it's required for the build.
