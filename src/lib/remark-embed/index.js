import { visit } from 'unist-util-visit';
import os from 'os';

const regexps = [
  {
    regex: /^\!\(((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?\)$/,
    embedUrl: "https://www.youtube.com/embed/",
    idIndex: 5,
  },
  {
    regex: /\!\(((?:https?:)?\/\/)?((?:www)\.)?((?:slideshare\.net))(\/(?:[\w\-]+\/embed_code\/key\/)?)([\w\-]+(\S+)?)\)/,
    embedUrl: "https://www.slideshare.net/slideshow/embed_code/key/",
    idIndex: 5,
  },
  {
    regex: new RegExp(`\\!\\(((?:https:)?\/\/)?(${os.hostname().replaceAll(/\./g, '\\.')})?(\/embed\/vote\/)?(\\d+)\\)`),
    embedUrl: "/embed/vote/",
    idIndex: 4,
  },
];

function remarkEmbed() {
  return transform;
}

function transform(tree) {
  visit(tree, "text", ontext);
}

function ontext(node, index, parent) {
  let match = null;
  let iframe = null;

  regexps.forEach(iter => {
    match = iter.regex.exec(node.value);

    if (match) {
      iframe = makeIframe(iter.embedUrl, match[iter.idIndex]);
      parent.children.splice(index, 1, iframe);
    }
  })
}

function makeIframe(embedUrl, videoid) {
  return {
    type: "iframe",
    data: {
      hName: "iframe",
      hProperties: {
        videoid,
        src: embedUrl + videoid,
        width: '100%',
        height: 315,
        allowfullscreen: true,
        frameborder: "0",
      },
    },
  };
}

export default remarkEmbed;