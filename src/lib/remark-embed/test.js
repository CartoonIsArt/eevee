const unified = require("unified");
const parse = require("remark-parse");
const remark2rehype = require("remark-rehype");
const stringify = require("rehype-stringify");
const remarkYoutubeEmbed = require(".");

function youtubeSyntax(videoId) {
  return `!(https://www.youtube.com/watch?v=${videoId})`;
}

const youtubeVideoId = "jNQXAC9IVRw";

test("youtube syntax to be iframe.", () => {
  unified()
    .use(parse)
    .use(remarkYoutubeEmbed)
    .use(remark2rehype)
    .use(stringify)
    .process(
      `This is youtube player\n\n${youtubeSyntax(youtubeVideoId)}`,
      function (err, f) {
        expect(err).toBeNull();
        expect(f.contents).toBe(`<p>This is youtube player</p>
<p><iframe videoid="${youtubeVideoId}" src="https://www.youtube.com/embed/${youtubeVideoId}" width="560" height="315" allowfullscreen frameborder="0"></iframe></p>`);
      }
    );
});
