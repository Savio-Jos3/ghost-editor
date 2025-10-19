import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { usePostStore } from "../store/postStore.js";
import Tiptap from "./Tiptap";
import PostPreview from "./PostPreview";

function calculateStats(htmlContent) {
  const plainText = htmlContent.replace(/<[^>]*>/g, ' ').trim();
  const words = plainText.split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  const readingTime = Math.ceil(wordCount / 200);
  const charCount = plainText.replace(/\s/g, '').length;
  return { wordCount, readingTime, charCount };
}

export default function PostEditor({ postId, onBack }) {
  const { posts, updatePost, publishPost, deletePost } = usePostStore();
  const post = posts.find((p) => p.id === postId);

  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [featuredImage, setFeaturedImage] = useState(post?.featuredImage || "");
  const [saveStatus, setSaveStatus] = useState("saved");
  const [showPreview, setShowPreview] = useState(false);
const saveTimeoutRef = useRef(null);
const hideTimeoutRef = useRef(null);
  const stats = useMemo(() => calculateStats(content), [content]);

// Fixed auto-save with proper status updates
// Memoized save function

// Auto-save when content changes
// Delete the saveDraft useCallback completely

// Replace with this single useEffect:
// Better auto-save approach
useEffect(() => {
  if (!post) return;

  // Clear any existing timers
  if (saveTimeoutRef.current) {
    clearTimeout(saveTimeoutRef.current);
  }
  if (hideTimeoutRef.current) {
    clearTimeout(hideTimeoutRef.current);
  }

  // Show saving immediately
  setSaveStatus("saving");

  // Save after 1 second
  saveTimeoutRef.current = setTimeout(() => {
    updatePost(postId, { title, content, featuredImage });
    
    // Show saved
    setSaveStatus("saved");
    
    // Hide after 2 seconds
    hideTimeoutRef.current = setTimeout(() => {
      setSaveStatus(null);
    }, 2000);
  }, 1000);

  // Cleanup
  return () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
  };
}, [title, content, featuredImage]);  // Only these dependencies!


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setFeaturedImage(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handlePublish = () => {
    updatePost(postId, { title, content, featuredImage });
    publishPost(postId);
    alert("Post published successfully!");
    onBack();
  };

  if (!post) return <div className="p-6">Post not found.</div>;

  return (
    <>
      {/* Main Container - 1440px with scroll */}
      <div
        style={{
          position: 'relative',
          width: '100vw',
          maxWidth: '100%',
          minHeight: '100vh',
          overflowY: 'auto',
          background: '#F4F4F5',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: 0
        }}
      >
        {/* Body */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '40px 101px',
            gap: '20px',
            width: '100%',
            maxWidth: '1440px',
            margin: '0 auto'
          }}
        >
          {/* Heading 1 - Top Bar - 1238px x 36px */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 0,
              gap: '20px',
              width: '1238px',
              maxWidth: '100%',
              height: '36px'
            }}
          >
            {/* Left: Frame 1000003299 - Posts + Draft/Saved - 178px x 24px */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 0,
                gap: '20px',
                width: '178px',
                height: '24px'
              }}
            >
              {/* Frame 1000003298 - Back Button - 69px x 24px */}
              <div
                onClick={onBack}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 0,
                  gap: '8px',
                  width: '69px',
                  height: '24px',
                  cursor: 'pointer'
                }}
              >
                {/* Arrow SVG - 18px x 18px */}
<div
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '18px',
    height: '18px'
  }}
>
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ transform: 'rotate(90deg)' }}>
    <path d="M13.5 6.75L9 11.25L4.5 6.75" stroke="#71717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
</div>


                {/* Posts Text - 43px x 24px */}
                <span
                  style={{
                    width: '43px',
                    height: '24px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '16px',
                    lineHeight: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#09090B'
                  }}
                >
                  Posts
                </span>
              </div>

              {/* Draft - Saved Container - 89px x 20px */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: 0,
                  width: '89px',
                  height: '20px'
                }}
              >
                <span
                  style={{
                    width: '89px',
                    height: '20px',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#71717B'
                  }}
                >
                  Draft - {saveStatus === 'saving' ? 'Saving' : 'Saved'}
                </span>
              </div>
            </div>

            {/* Right: Frame 1000003300 - Buttons - 221px x 36px */}
<div
  style={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    gap: '16px',
    width: '221px',
    height: '36px'
  }}
>
  {/* Button next to Preview - 36px x 36px */}
  <button
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '10px',
      width: '36px',
      height: '36px',
      background: 'transparent',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
  >
    {/* Your exact Figma icon - 16px x 16px */}
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1_568)">
        <path d="M2.66659 4C2.66659 3.64633 2.80706 3.30723 3.05711 3.05718C3.30716 2.80714 3.64625 2.66666 3.99992 2.66666H11.9999C12.3536 2.66666 12.6927 2.80714 12.9427 3.05718C13.1928 3.30723 13.3333 3.64633 13.3333 4V12C13.3333 12.3536 13.1928 12.6927 12.9427 12.9428C12.6927 13.1928 12.3536 13.3333 11.9999 13.3333H3.99992C3.64625 13.3333 3.30716 13.1928 3.05711 12.9428C2.80706 12.6927 2.66659 12.3536 2.66659 12V4Z" stroke="#71717B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 2.66666V13.3333" stroke="#71717B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip0_1_568">
          <rect width="16" height="16" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  </button>

  {/* Preview Button - 79px x 36px */}
  <button
    onClick={() => setShowPreview(true)}
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'baseline',
      padding: '6px 12px',
      width: '79px',
      height: '36px',
      background: 'rgba(9, 9, 11, 0.9)',
      boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'Inter, sans-serif',
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '24px',
      color: '#FFFFFF',
      position: 'relative',
      isolation: 'isolate'
    }}
  >
    {/* Background+Shadow */}
    <div
      style={{
        position: 'absolute',
        left: '1px',
        right: '1px',
        top: '1px',
        bottom: '1px',
        background: '#18181B',
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)',
        borderRadius: '7px',
        zIndex: 0
      }}
    />
    {/* Rectangle */}
    <div
      style={{
        position: 'absolute',
        left: '1px',
        right: '1px',
        top: '1px',
        bottom: '1px',
        borderRadius: '7px',
        zIndex: 1
      }}
    />
    {/* Preview Text */}
    <span style={{ width: '55px', height: '24px', position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      Preview
    </span>
  </button>

{/* Publish Button - 74px x 36px - Always visible */}
<button
  onClick={handlePublish}
  style={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '6px 12px',
    width: '74px',
    height: '36px',
    background: '#00A63E',
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '24px',
    color: '#FFFFFF'
  }}
>
  {post.status === 'published' ? 'Update' : 'Publish'}
</button>
</div>

          </div>

          {/* Featured Image Upload - 800px x 300px */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 0,
              gap: '10px',
              width: '1238px',
              maxWidth: '100%',
              height: '300px'
            }}
          >
            <label
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px',
                gap: '16px',
                width: '800px',
                maxWidth: '800px',
                height: '300px',
                background: '#F9FAFB',
                border: '1px dashed #D1D5DC',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              {!featuredImage ? (
  <>
    {/* Cloud Upload Icon - 20px x 17px */}
    <svg width="20" height="17" viewBox="0 0 20 17" fill="none">
      <path d="M13 13.5H16C16.7956 13.5 17.5587 13.1839 18.1213 12.6213C18.6839 12.0587 19 11.2957 19 10.5C19 9.70436 18.6839 8.9413 18.1213 8.37869C17.5587 7.81608 16.7956 7.50001 16 7.50001H15.975C15.9908 7.3338 15.9992 7.16697 16 7.00001C15.9962 5.67336 15.5131 4.39279 14.6396 3.39429C13.7661 2.39579 12.5611 1.74667 11.2467 1.56656C9.93236 1.38645 8.59718 1.68749 7.48727 2.41419C6.37736 3.14089 5.56752 4.24428 5.207 5.52101C5.137 5.51701 5.071 5.50001 5 5.50001C3.93913 5.50001 2.92172 5.92144 2.17157 6.67158C1.42143 7.42173 1 8.43914 1 9.50001C1 10.5609 1.42143 11.5783 2.17157 12.3284C2.92172 13.0786 3.93913 13.5 5 13.5H7.167M10 15.5V6.50001M10 6.50001L8 8.50001M10 6.50001L12 8.50001" stroke="#6A7282" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

    {/* Text */}
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 0,
        gap: '5px',
        width: '291px',
        height: '41px'
      }}
    >
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '14px',
          lineHeight: '20px',
          color: '#6A7282',
          textAlign: 'center'
        }}
      >
        Click to upload post cover or drag and drop
      </span>
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontSize: '12px',
          lineHeight: '16px',
          color: '#99A1AF',
          textAlign: 'center'
        }}
      >
        SVG, PNG, JPG or GIF (MAX. 800x400px)
      </span>
    </div>
  </>
) : (
  <img src={featuredImage} alt="Featured" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
)}

              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            </label>
          </div>

          {/* Title + Content - 740px */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 0,
              gap: '10px',
              width: '1238px',
              maxWidth: '100%'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '16px 0px',
                gap: '16px',
                width: '740px',
                maxWidth: '740px',
                borderRadius: '8px'
              }}
            >
             {/* Title */}
<div
  style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 0,
    gap: '5px',
    width: '740px',
    maxWidth: '100%'
  }}
>
{/* Title Input */}
<input
  type="text"
  placeholder="Post title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  style={{
    width: '100%',
    height: '40px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 700,
    fontSize: '36px',
    lineHeight: '40px',
    color: '#09090B',
    border: 'none',
    outline: 'none',
    background: 'transparent'
  }}
  className="placeholder-gray-300"
/>
</div>
              {/* Frame 1000003305 - Divider + Content */}
<div
  style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '16px 0px 32px',
    gap: '10px',
    width: '740px',
    maxWidth: '100%',
    height: '48px'
  }}
>
  {/* Line 1 - Divider */}
  <div
    style={{
      width: '740px',
      maxWidth: '100%',
      height: 0,
      border: '1px solid #D1D5DC',
      alignSelf: 'stretch'
    }}
  />

  {/* Content Editor Wrapper */}
  <div 
    style={{ 
      width: '740px', 
      maxWidth: '100%',
      minHeight: '200px',
      alignSelf: 'stretch'
    }}
  >
    <Tiptap 
      content={content} 
      onUpdate={setContent}
      placeholder="Begin writing your post..."
    />
  </div>
</div>

            </div>
          </div>
        </div>
      </div>

      {showPreview && (
        <PostPreview post={{ title, content, featuredImage }} onClose={() => setShowPreview(false)} />
      )}
    </>
  );
}
