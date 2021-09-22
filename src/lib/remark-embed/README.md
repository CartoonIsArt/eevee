![main](https://github.com/kawaPC/remark-youtube-embed/actions/workflows/main.yml/badge.svg?branch=main)

# remark-youtube-embed

Remark plugin to support youtube iframe embedding with markdown custom syntax.

## Custom Syntax

```markdown
!(https://www.youtube.com/watch?v=jNQXAC9IVRw)
```

## Result

```html
<iframe
  src="https://www.youtube.com/embed/jNQXAC9IVRw"
  width="560"
  height="315"
  allowfullscreen
  frameborder="0"
></iframe>
```

## Example

```javascript
import unified from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import youtubeEmbed from "remark-youtube-embed";

unified()
  .use(remarkParse)
  .use(youtubeEmbed)
  .use(remarkRehype)
  .use(rehypeStringify)
  .process(markdown);
```
