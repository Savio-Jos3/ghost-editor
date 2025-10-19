import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react';

const HtmlEmbedComponent = ({ node }) => {
  return (
    <NodeViewWrapper>
      <div
        contentEditable={false}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: '12px',
          width: '100%',
          maxWidth: '740px',
          margin: '16px 0'
        }}
      >
        {/* HTML Icon */}
        <div style={{ flexShrink: 0, paddingTop: '2px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path 
              d="M10 18L14 6M18 8L22 12L18 16M6 16L2 12L6 8" 
              stroke="#9CA3AF" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Rendered HTML - No box, just content */}
        <div
          style={{
            flex: 1,
            minWidth: 0
          }}
          dangerouslySetInnerHTML={{ __html: node.attrs.html }}
        />
      </div>
    </NodeViewWrapper>
  );
};

export const HtmlEmbed = Node.create({
  name: 'htmlEmbed',
  
  group: 'block',
  
  atom: true,
  
  addAttributes() {
    return {
      html: {
        default: '',
      },
    };
  },
  
  parseHTML() {
    return [
      {
        tag: 'div[data-type="html-embed"]',
      },
    ];
  },
  
  renderHTML({ node }) {
    return [
      'div',
      { 
        'data-type': 'html-embed',
        'data-html': node.attrs.html 
      },
      
    ];
  },
  
  addNodeView() {
    return ReactNodeViewRenderer(HtmlEmbedComponent);
  },
});
