import { useState, useEffect } from 'react';

export default function UnsplashModal({ editor, onClose }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchImages();
  }, [page]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=20`);
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Failed to fetch images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (imageId) => {
    const imageUrl = `https://picsum.photos/id/${imageId}/800/600`;
    editor.chain().focus().setImage({ src: imageUrl }).run();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9998
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '900px',
          maxHeight: '80vh',
          background: '#FFFFFF',
          borderRadius: '12px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px',
            borderBottom: '1px solid #E5E7EB',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', fontWeight: 600, margin: 0, color: '#09090B' }}>
            Select an Image
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6B7280',
              padding: '0',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>
        </div>

        {/* Images Grid */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px'
          }}
        >
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280', fontFamily: 'Inter, sans-serif' }}>
              Loading images...
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '16px'
              }}
            >
              {images.map((image) => (
                <div
                  key={image.id}
                  onClick={() => handleImageSelect(image.id)}
                  style={{
                    position: 'relative',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    aspectRatio: '4/3',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                  }}
                >
                  <img
                    src={`https://picsum.photos/id/${image.id}/300/200`}
                    alt={image.author}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                      padding: '8px',
                      color: 'white',
                      fontSize: '12px',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  >
                    {image.author}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Pagination */}
        <div
          style={{
            padding: '16px 20px',
            borderTop: '1px solid #E5E7EB',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            style={{
              padding: '8px 16px',
              border: '1px solid #D1D5DC',
              borderRadius: '6px',
              background: page === 1 ? '#F3F4F6' : '#FFFFFF',
              cursor: page === 1 ? 'not-allowed' : 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: page === 1 ? '#9CA3AF' : '#09090B'
            }}
          >
            Previous
          </button>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6B7280' }}>
            Page {page}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            style={{
              padding: '8px 16px',
              border: '1px solid #D1D5DC',
              borderRadius: '6px',
              background: '#FFFFFF',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: '#09090B'
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
