import { useState } from "react";
import { usePostStore } from "../store/postStore";

export default function PostList({ onEdit }) {
  const { posts, addPost, deletePost } = usePostStore();
  const [searchTerm, setSearchTerm] = useState("");

const handleNewPost = () => {
  const newPost = addPost({ title: "", content: "" });  // ← Empty title
  if (newPost && newPost.id) {
    onEdit(newPost.id);
  }
};

  const handleDeletePost = (postId, e) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this post?")) {
      deletePost(postId);
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    }
  };

  const getExcerpt = (htmlContent) => {
    const plainText = htmlContent.replace(/<[^>]*>/g, ' ').trim();
    return plainText.substring(0, 100) + (plainText.length > 100 ? '...' : '');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      {/* Main Container */}
      <div
        style={{
          width: '1176px',
          maxWidth: 'calc(100% - 40px)',
          margin: '0 auto',
          marginTop: '113px',
          padding: '40px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
          borderRadius: '8px'
        }}
      >
        {/* Container: Heading, Search, New Post - 1096px x 84px */}
        <div 
          style={{
            width: '1096px',
            maxWidth: '100%',
            height: '84px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '32px'
          }}
        >
          {/* Left: Heading and Search - 1007px x 84px */}
          <div 
            style={{
              width: '1007px',
              maxWidth: 'calc(100% - 100px)',
              height: '84px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            {/* Heading - 32px height */}
            <h1 
              style={{
                width: '1007px',
                maxWidth: '100%',
                height: '32px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '20px',
                lineHeight: '32px',
                color: '#09090B',
                margin: 0,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Posts
            </h1>
            
            {/* Search Bar - 419px x 36px */}
            <div 
              style={{
                width: '419px',
                maxWidth: '100%',
                height: '36px',
                position: 'relative'
              }}
            >
              <svg
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '16px',
                  height: '16px',
                  color: '#71717B'
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search Posts"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  height: '36px',
                  paddingLeft: '36px',
                  paddingRight: '12px',
                  border: '1px solid #E5E7EB',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: 'Inter, sans-serif',
                  outline: 'none',
                  color: '#09090B'
                }}
              />
            </div>
          </div>

          {/* Right: New Post Button */}
          <button
            onClick={handleNewPost}
            style={{
              height: '36px',
              padding: '0 20px',
              backgroundColor: '#000000',
              color: '#FFFFFF',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: 'Inter, sans-serif',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1F1F1F'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#000000'}
          >
            New post
          </button>
        </div>

        {/* Posts List - 1096px width */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: 0,
            width: '1096px',
            maxWidth: '100%'
          }}
        >
          {filteredPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 0', color: '#71717B', width: '100%' }}>
              {searchTerm ? "No posts found" : "No posts yet. Create your first post!"}
            </div>
          ) : (
            filteredPosts.map((post, index) => (
              <div
                key={post.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: 0,
                  width: '1096px',
                  maxWidth: '100%',
                  height: '93px'
                }}
              >
                {/* Horizontal Divider */}
                <div
                  style={{
                    width: '1096px',
                    maxWidth: '100%',
                    height: '1px',
                    borderTop: '1px solid rgba(9, 9, 11, 0.1)',
                    boxSizing: 'border-box'
                  }}
                />

                {/* Container - 1096px x 92px */}
                <div
                  onClick={() => onEdit(post.id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 0,
                    width: '1096px',
                    maxWidth: '100%',
                    height: '92px',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {/* Left: Post Info - 607px x 92px */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      padding: '12px 0',
                      gap: '16px',
                      width: '607px',
                      height: '92px'
                    }}
                  >
                    {/* Post Details */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        padding: 0,
                        gap: '4px',
                        width: '607px',
                        height: '68px'
                      }}
                    >
                      {/* Title - 24px height */}
                      <h2
                        style={{
                          width: '607px',
                          height: '24px',
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 600,
                          fontSize: '16px',
                          lineHeight: '24px',
                          color: '#09090B',
                          margin: 0,
                          display: 'flex',
                          alignItems: 'center',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {post.title || "Untitled"}
                      </h2>

                      {/* Excerpt - 20px height */}
                      <p
                        style={{
                          width: '607px',
                          height: '20px',
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: '20px',
                          color: '#71717B',
                          margin: 0,
                          display: 'flex',
                          alignItems: 'center',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {post.content ? getExcerpt(post.content) : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt..."}
                      </p>

                      {/* Timestamp - 16px height */}
                      <div
                        style={{
                          width: '607px',
                          height: '16px',
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: post.status === 'published' ? 500 : 400,
                          fontSize: '12px',
                          lineHeight: '16px',
                          color: post.status === 'published' ? '#000000' : '#71717B',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        {post.status === "published" && post.publishedAt ? (
                          <span>Published {formatTimestamp(post.publishedAt)}</span>
                        ) : (
                          <span>{formatTimestamp(post.createdAt)}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Action Buttons - 92px x 40px */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 0,
                      gap: '16px',
                      width: '92px',
                      height: '40px'
                    }}
                  >
                    {/* Edit Button - 40px x 40px */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(post.id);
                      }}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '10px',
                        width: '40px',
                        height: '40px',
                        border: 'none',
                        background: 'transparent',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {/* Pencil Icon - 18x18 */}
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.0517 2.73916L14.4575 1.33249C14.7506 1.03943 15.148 0.874786 15.5625 0.874786C15.977 0.874786 16.3744 1.03943 16.6675 1.33249C16.9606 1.62556 17.1252 2.02304 17.1252 2.43749C17.1252 2.85195 16.9606 3.24943 16.6675 3.54249L4.69333 15.5167C4.25277 15.957 3.70947 16.2806 3.1125 16.4583L0.875 17.125L1.54167 14.8875C1.7194 14.2905 2.04303 13.7472 2.48333 13.3067L13.0525 2.73916H13.0517ZM13.0517 2.73916L15.25 4.93749" stroke="#71717B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>

                    {/* Delete Button - 36px x 36px */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePost(post.id, e);
                      }}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '10px',
                        width: '36px',
                        height: '36px',
                        border: 'none',
                        background: 'transparent',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {/* Trash Icon - 12x14 */}
                      <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.666016 3.66635H11.3327" stroke="#71717B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4.66736 6.33301V10.333" stroke="#71717B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.33337 6.33301V10.333" stroke="#71717B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1.33398 3.66699L2.00065 11.667C2.00065 12.4034 2.5976 13.0003 3.33398 13.0003H8.6673C9.4037 13.0003 10.0007 12.4034 10.0007 11.667L10.6673 3.66699" stroke="#71717B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 3.66667V1.66667C4 1.29848 4.29848 1 4.66667 1H7.33333C7.70152 1 8 1.29848 8 1.66667V3.66667" stroke="#71717B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
