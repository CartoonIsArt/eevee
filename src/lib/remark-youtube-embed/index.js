import { visit } from 'unist-util-visit';

const regex = /\!\(http.*youtube.com.*?v=(.*)\)/;

function remarkYoutubeEmbed() {
  return transform;
}

function transform(tree) {
  visit(tree, "text", ontext);
}

function ontext(node, index, parent) {
  const match = regex.exec(node.value);

  if (!match) return;

  const videoid = match[1];

  const iframe = {
    type: "iframe",
    data: {
      hName: "iframe",
      hProperties: {
        videoid: videoid,
        src: `https://www.youtube.com/embed/${videoid}`,
        width: '100%',
        height: 315,
        allowfullscreen: true,
        frameborder: "0",
      },
    },
  };

  parent.children.splice(index, 1, iframe);
}

export default remarkYoutubeEmbed;