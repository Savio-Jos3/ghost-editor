import React, { useState } from 'react';

const MenuBar = ({ editor }) => {
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);

  if (!editor) return null;

  const addLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl('');
      setShowLinkInput(false);
    }
  };

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
      setShowImageInput(false);
    }
  };

  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL:');
    if (url) {
      editor.commands.setYoutubeVideo({ src: url });
    }
  };

  return (
    <div className="menu-bar border-b p-2 flex flex-wrap gap-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <strong>B</strong>
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <em>I</em>
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'is-active' : ''}
      >
        <u>U</u>
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <s>S</s>
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        H2
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        H3
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        • List
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        1. List
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        Quote
      </button>

      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        HR
      </button>

      {/* Link Input */}
      <div className="flex gap-1">
        {!showLinkInput ? (
          <button onClick={() => setShowLinkInput(true)}>🔗 Link</button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter URL"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="border px-2"
            />
            <button onClick={addLink}>Add</button>
            <button onClick={() => setShowLinkInput(false)}>Cancel</button>
          </>
        )}
      </div>

      {/* Image Input */}
      <div className="flex gap-1">
        {!showImageInput ? (
          <button onClick={() => setShowImageInput(true)}>🖼️ Image</button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="border px-2"
            />
            <button onClick={addImage}>Add</button>
            <button onClick={() => setShowImageInput(false)}>Cancel</button>
          </>
        )}
      </div>

      <button onClick={addYoutubeVideo}>
        ▶️ YouTube
      </button>
    </div>
  );
};

export default MenuBar;
