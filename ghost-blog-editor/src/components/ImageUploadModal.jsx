import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

function ImageUploadModalContent({ onClose, onUpload }) {
  const [picsumImages, setPicsumImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPicsumImages();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const fetchPicsumImages = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://picsum.photos/v2/list?page=1&limit=20");
      const data = await response.json();
      setPicsumImages(data);
    } catch (error) {
      console.error("Failed to fetch Picsum images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePicsumSelect = (image) => {
    const imageUrl = `https://picsum.photos/id/${image.id}/800/600`;
    onUpload(imageUrl);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <div style={{
        padding: '24px 40px',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Unsplash</h2>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '36px',
            cursor: 'pointer',
            color: '#6b7280',
            lineHeight: 1,
            padding: 0,
            width: '40px',
            height: '40px'
          }}
        >
          ×
        </button>
      </div>

      {/* Search Bar */}
      <div style={{ padding: '20px 40px', borderBottom: '1px solid #e5e7eb' }}>
        <input
          type="text"
          placeholder="Search free high-resolution photos"
          style={{
            width: '100%',
            maxWidth: '600px',
            padding: '12px 16px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '15px',
            outline: 'none'
          }}
        />
      </div>

      {/* Image Grid - Full Width */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '40px' }}>
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{
              border: '4px solid #3b82f6',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              animation: 'spin 1s linear infinite'
            }}></div>
          </div>
        ) : picsumImages.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            {picsumImages.map((image) => (
              <div
                key={image.id}
                onClick={() => handlePicsumSelect(image)}
                style={{
                  cursor: 'pointer',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
              >
                <img
                  src={`https://picsum.photos/id/${image.id}/500/350`}
                  alt={`Photo by ${image.author}`}
                  style={{
                    width: '100%',
                    height: '280px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                <div style={{
                  padding: '12px 16px',
                  backgroundColor: 'white',
                  borderTop: '1px solid #f3f4f6'
                }}>
                  <p style={{
                    margin: 0,
                    fontSize: '13px',
                    color: '#6b7280'
                  }}>
                    📷 {image.author}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#6b7280',
            fontSize: '16px'
          }}>
            No images loaded
          </div>
        )}
      </div>
    </div>
  );
}

export default function ImageUploadModal({ open, onClose, onUpload }) {
  if (!open) return null;

  return createPortal(
    <ImageUploadModalContent onClose={onClose} onUpload={onUpload} />,
    document.body
  );
}
