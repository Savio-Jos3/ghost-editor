import { useState } from 'react';

export default function BlockMenu({ editor, onClose, onOpenUnsplash }) {
  const [showImageInput, setShowImageInput] = useState(false);
  const [showYoutubeInput, setShowYoutubeInput] = useState(false);
  const [showHtmlInput, setShowHtmlInput] = useState(false);
  const [showBookmarkInput, setShowBookmarkInput] = useState(false);
  const [showTwitterInput, setShowTwitterInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleImageUpload = () => {
    setShowImageInput(true);
  };

  const handleImageSubmit = () => {
    if (inputValue) {
      editor.chain().focus().setImage({ src: inputValue }).run();
      setInputValue('');
      setShowImageInput(false);
      onClose();
    }
  };

  const handleYoutubeEmbed = () => {
    setShowYoutubeInput(true);
  };

  const handleYoutubeSubmit = () => {
    if (inputValue) {
      editor.chain().focus().setYoutubeVideo({ src: inputValue }).run();
      setInputValue('');
      setShowYoutubeInput(false);
      onClose();
    }
  };

  const handleHtmlEmbed = () => {
    setShowHtmlInput(true);
  };

  const handleHtmlSubmit = () => {
    if (inputValue) {
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'htmlEmbed',
          attrs: { html: inputValue },
        })
        .run();
      setInputValue('');
      setShowHtmlInput(false);
      onClose();
    }
  };

  const handleBookmarkEmbed = () => {
    setShowBookmarkInput(true);
  };

  const handleBookmarkSubmit = async () => {
    if (!inputValue) return;

    try {
      const response = await fetch("https://my-json-server.typicode.com/typicode/demo/posts/1");
      const data = await response.json();

      const meta = {
        url: inputValue,
        title: data.title || "Article Title",
        description: "This is a sample bookmark description.",
        image: "https://picsum.photos/200/150",
        favicon: `https://www.google.com/s2/favicons?domain=${new URL(inputValue).hostname}`,
      };

      editor.chain().focus().insertContent({ type: "bookmark", attrs: meta }).run();
      setInputValue('');
      setShowBookmarkInput(false);
      onClose();
    } catch (error) {
      console.error("Failed to fetch bookmark metadata:", error);
    }
  };

  const handleTwitterEmbed = () => {
    setShowTwitterInput(true);
  };

  const handleTwitterSubmit = () => {
    if (inputValue) {
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'twitterEmbed',
          attrs: { url: inputValue },
        })
        .run();
      setInputValue('');
      setShowTwitterInput(false);
      onClose();
    }
  };

  const handleDivider = () => {
    editor.chain().focus().setHorizontalRule().run();
    onClose();
  };

  const handleHtmlKeyDown = (e) => {
    if (e.key === '>') {
      const textarea = e.target;
      const value = textarea.value;
      const cursorPos = textarea.selectionStart;
      const lastOpenTag = value.slice(0, cursorPos).match(/<([a-z][a-z0-9]*)[^>]*$/i);
      
      if (lastOpenTag && !value.slice(0, cursorPos).match(/<\/[^>]*$/)) {
        const tagName = lastOpenTag[1];
        e.preventDefault();
        const newValue = value.slice(0, cursorPos) + `></${tagName}>` + value.slice(cursorPos);
        setInputValue(newValue);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = cursorPos + 1;
        }, 0);
      }
    }
  };

  if (showImageInput || showYoutubeInput || showHtmlInput || showBookmarkInput || showTwitterInput) {
    return (
      <>
        <div
          onClick={() => {
            setShowImageInput(false);
            setShowYoutubeInput(false);
            setShowHtmlInput(false);
            setShowBookmarkInput(false);
            setShowTwitterInput(false);
            setInputValue('');
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999
          }}
        />
        
        <div
          style={{
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            padding: '16px',
            gap: '12px',
            position: 'absolute',
            width: '500px',
            background: '#FFFFFF',
            border: '1px solid #D1D5DC',
            boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            zIndex: 1000
          }}
        >
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: '#09090B' }}>
            {showImageInput && 'Enter Image URL'}
            {showYoutubeInput && 'Enter YouTube URL'}
            {showHtmlInput && 'Enter HTML Code'}
            {showBookmarkInput && 'Enter URL for Bookmark'}
            {showTwitterInput && 'Enter Twitter/X Post URL'}
          </div>

          {showHtmlInput ? (
            <div style={{ position: 'relative' }}>
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleHtmlKeyDown}
                placeholder="<h1>Type your HTML here...</h1>"
                autoFocus
                spellCheck={false}
                style={{
                  width: '100%',
                  height: '200px',
                  padding: '12px',
                  border: '1px solid #D1D5DC',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: "'Fira Code', 'Courier New', Consolas, monospace",
                  lineHeight: '1.6',
                  color: '#1F2937',
                  background: '#F9FAFB',
                  outline: 'none',
                  resize: 'vertical',
                  tabSize: 2,
                  whiteSpace: 'pre',
                  overflowWrap: 'normal',
                  overflowX: 'auto'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '8px',
                right: '12px',
                fontSize: '11px',
                color: '#9CA3AF',
                pointerEvents: 'none',
                fontFamily: 'monospace',
                background: '#F9FAFB',
                padding: '2px 6px',
                borderRadius: '3px'
              }}>
                HTML
              </div>
            </div>
          ) : (
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                showImageInput ? 'https://example.com/image.jpg' :
                showYoutubeInput ? 'https://youtube.com/watch?v=...' :
                showBookmarkInput ? 'https://example.com' :
                showTwitterInput ? 'https://twitter.com/user/status/123456789' : ''
              }
              autoFocus
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  if (showImageInput) handleImageSubmit();
                  if (showYoutubeInput) handleYoutubeSubmit();
                  if (showBookmarkInput) handleBookmarkSubmit();
                  if (showTwitterInput) handleTwitterSubmit();
                }
              }}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #D1D5DC',
                borderRadius: '6px',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
                outline: 'none'
              }}
            />
          )}

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button
              onClick={() => {
                setShowImageInput(false);
                setShowYoutubeInput(false);
                setShowHtmlInput(false);
                setShowBookmarkInput(false);
                setShowTwitterInput(false);
                setInputValue('');
              }}
              style={{
                padding: '6px 12px',
                border: '1px solid #D1D5DC',
                borderRadius: '6px',
                background: '#FFFFFF',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (showImageInput) handleImageSubmit();
                if (showYoutubeInput) handleYoutubeSubmit();
                if (showHtmlInput) handleHtmlSubmit();
                if (showBookmarkInput) handleBookmarkSubmit();
                if (showTwitterInput) handleTwitterSubmit();
              }}
              style={{
                padding: '6px 12px',
                border: 'none',
                borderRadius: '6px',
                background: '#00A63E',
                color: '#FFFFFF',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Insert
            </button>
          </div>
        </div>
      </>
    );
  }

  const menuItems = [
    { 
      label: "Photo", 
      onClick: handleImageUpload,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M4 12L8.586 7.414C8.96106 7.03906 9.46967 6.82843 10 6.82843C10.5303 6.82843 11.0391 7.03906 11.414 7.414L16 12M14 10L15.586 8.414C15.9611 8.03906 16.4697 7.82843 17 7.82843C17.5303 7.82843 18.0391 8.03906 18.414 8.414L20 10M14 4H14.01M6 20H18C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      label: "HTML", 
      onClick: handleHtmlEmbed,
      icon: (
        <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
          <path d="M9 17L13 1M17 5L21 9L17 13M5 13L1 9L5 5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      label: "Divider", 
      onClick: handleDivider, 
      highlighted: true,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M20 12H4" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      label: "Bookmark", 
      onClick: handleBookmarkEmbed,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5 5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21L12 17.5L5 21V5Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      label: "Youtube", 
      onClick: handleYoutubeEmbed,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M14.752 11.168L11.555 9.036C11.4043 8.93502 11.229 8.87784 11.048 8.86903C10.867 8.86022 10.687 8.90115 10.5274 8.98695C10.3677 9.07238 10.2342 9.20005 10.1414 9.35547C10.0485 9.51089 9.99956 9.68894 10 9.87V14.133C10 14.314 10.0491 14.492 10.1421 14.647C10.2352 14.802 10.3686 14.93 10.5282 15.015C10.6879 15.1 10.8677 15.141 11.0485 15.132C11.2293 15.123 11.4044 15.066 11.555 14.965L14.752 12.833C14.889 12.742 15.0013 12.618 15.0789 12.473C15.1566 12.328 15.1972 12.166 15.1972 12.001C15.1972 11.836 15.1566 11.674 15.0789 11.529C15.0013 11.384 14.889 11.259 14.752 11.168Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 12C21 13.182 20.7672 14.352 20.3149 15.444C19.8626 16.536 19.1997 17.528 18.364 18.364C17.5282 19.2 16.5361 19.863 15.4442 20.315C14.3522 20.767 13.1819 21 12 21C10.8181 21 9.64778 20.767 8.55585 20.315C7.46392 19.863 6.47177 19.2 5.63604 18.364C4.80031 17.528 4.13738 16.536 3.68508 15.444C3.23279 14.352 3 13.182 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      label: "Twitter", 
      onClick: handleTwitterEmbed,
      icon: (
        <svg width="16" height="22" viewBox="0 0 16 22" fill="none">
          <path d="M15 10C15 11.8565 14.2625 13.637 12.9497 14.9497C11.637 16.2625 9.85652 17 8 17M8 17C6.14348 17 4.36301 16.2625 3.05025 14.9497C1.7375 13.637 1 11.8565 1 10M8 17V21M8 21H4M8 21H12M8 13C7.20435 13 6.44129 12.6839 5.87868 12.1213C5.31607 11.5587 5 10.7956 5 10V4C5 3.20435 5.31607 2.44129 5.87868 1.87868C6.44129 1.31607 7.20435 1 8 1C8.79565 1 9.55871 1.31607 10.1213 1.87868C10.6839 2.44129 11 3.20435 11 4V10C11 10.7956 10.6839 11.5587 10.1213 12.1213C9.55871 12.6839 8.79565 13 8 13Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      label: "Unsplash", 
      onClick: () => {
        onOpenUnsplash(); // Call parent function
        onClose(); // Close block menu
      },
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <g clipPath="url(#clip0_unsplash)">
            <path d="M16.4391 10.617V17.308H7.56094V10.617H0V24H24V10.617H16.4391ZM7.56094 0H16.4411V6.692H7.56094V0Z" fill="black"/>
          </g>
          <defs>
            <clipPath id="clip0_unsplash">
              <rect width="24" height="24" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      )
    },
  ];

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 999 }} />
      
      <div
        style={{
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: 0,
          position: 'absolute',
          width: '204px',
          minWidth: '128px',
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          zIndex: 1000
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '4px',
            width: '204px'
          }}
        >
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '8px',
                gap: '8px',
                width: '196px',
                minWidth: '128px',
                height: '40px',
                background: item.highlighted ? '#F3F4F6' : 'transparent',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.15s'
              }}
              onMouseEnter={(e) => {
                if (!item.highlighted) e.currentTarget.style.backgroundColor = '#F9FAFB';
              }}
              onMouseLeave={(e) => {
                if (!item.highlighted) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {item.icon}
              </div>
              <span style={{ width: '148px', height: '20px', fontFamily: 'Geist, Inter, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#030712', textAlign: 'left', flexGrow: 1 }}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
