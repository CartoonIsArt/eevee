import { visit } from 'unist-util-visit';

const regexp =
  {
    regex: /^\@\(((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?\)$/,
    idIndex: 5,
  }


function remarkMention() {
  return transform;
}

function transform(tree) {
  visit(tree, "text", ontext);
}

function ontext(node, index, parent) {
  let match = null;
  let iframe = null;

  regexp.forEach(iter => {
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

export default remarkMention;