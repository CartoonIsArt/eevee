import { visit } from 'unist-util-visit';
import os from 'os';

const regexps = [
  {
    regex: /^\!\(((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?\)$/,
    embedUrl: "https://www.youtube.com/embed/",
    idIndex: 5,
    height: 315
  },
  {
    regex: /\!\(((?:https?:)?\/\/)?((?:www)\.)?((?:slideshare\.net))(\/(?:[\w\-]+\/embed_code\/key\/)?)([\w\-]+(\S+)?)\)/,
    embedUrl: "https://www.slideshare.net/slideshow/embed_code/key/",
    idIndex: 5,
    height: 315
  },
  {
    regex: new RegExp(`\\!\\(((?:https:)?\/\/)?(${os.hostname().replaceAll(/\./g, '\\.')})?(\/embed\/vote\/)?(\\d+)(\\?height=(\\d+)?)?\\)`),
    embedUrl: "/embed/vote/",
    idIndex: 4,
    heightIndex: 6,
    height: 410,
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
  let height = 0;

  regexps.forEach(iter => {
    match = iter.regex.exec(node.value);

    if (match) {
      height = iter.heightIndex && match[iter.heightIndex] ? match[iter.heightIndex] : iter.height
      iframe = makeIframe(iter.embedUrl, match[iter.idIndex], height);
      parent.children.splice(index, 1, iframe);
    }
  })
}

function makeIframe(embedUrl, videoid, height) {
  return {
    type: "iframe",
    data: {
      hName: "iframe",
      hProperties: {
        videoid,
        src: embedUrl + videoid,
        width: "100%",
        height,
        allowfullscreen: true,
        frameborder: "0",
        scrolling: "no",
      },
    },
  };
}

export default remarkEmbed;