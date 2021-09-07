import { visit } from 'unist-util-visit';

const regex = /^\!\(((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?\)$/;

function remarkYoutubeEmbed() {
  return transform;
}

function transform(tree) {
  visit(tree, "text", ontext);
}

function ontext(node, index, parent) {
  const match = regex.exec(node.value);

  if (!match) return;

  const videoid = match[5];

  const iframe = {
    type: "iframe",
    data: {
      hName: "iframe",
      hProperties: {
        videoid,
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