import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react';
import { useEffect, useRef } from 'react';

function TwitterEmbedComponent({ node }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!window.twttr) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      document.body.appendChild(script);
    } else {
      if (containerRef.current) {
        window.twttr.widgets.load(containerRef.current);
      }
    }
  }, [node.attrs.url]);

  const getTweetId = (url) => {
    const match = url.match(/status\/(\d+)/);
    return match ? match[1] : null;
  };

  const tweetId = getTweetId(node.attrs.url);

  if (!tweetId) {
    return (
      <NodeViewWrapper>
        <div contentEditable={false} style={{ padding: '16px', margin: '16px 0', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px', color: '#991B1B', fontSize: '14px' }}>
          Invalid Twitter URL. Please use a valid tweet URL.
        </div>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper>
      <div contentEditable={false} ref={containerRef} style={{ margin: '16px 0', maxWidth: '550px' }}>
        <blockquote className="twitter-tweet" data-dnt="true">
          <a href={node.attrs.url}>Loading tweet...</a>
        </blockquote>
      </div>
    </NodeViewWrapper>
  );
}

export const TwitterEmbed = Node.create({
  name: 'twitterEmbed',
  group: 'block',
  atom: true,
  
  addAttributes() {
    return {
      url: {
        default: '',
      },
    };
  },
  
  parseHTML() {
    return [{ tag: 'div[data-type="twitter-embed"]' }];
  },
  
  renderHTML({ node }) {
    return [
      'div', 
      { 
        'data-type': 'twitter-embed', 
        'data-url': node.attrs.url 
      }
      // REMOVED THE ", 0" - this was causing the error!
    ];
  },
  
  addNodeView() {
    return ReactNodeViewRenderer(TwitterEmbedComponent);
  },
});
