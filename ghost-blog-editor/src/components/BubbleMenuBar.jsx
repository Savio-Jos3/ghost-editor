export default function BubbleMenuBar({ editor }) {
  if (!editor) return null;

  return (
    <div
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 0,
        position: 'absolute',
        width: '212px',
        minWidth: '128px',
        height: '40px',
        background: '#FFFFFF',
        border: '1px solid #D1D5DC',
        boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        zIndex: 1000
      }}
    >
      {/* Section 01 - Buttons Row */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          padding: '4px',
          width: '212px',
          height: '40px'
        }}
      >
{/* Bold Button */}
<button
  onClick={() => editor.chain().focus().toggleBold().run()}
  style={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px',
    width: '32px',
    height: '32px',
    background: editor.isActive('bold') ? '#F3F4F6' : 'transparent',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background 0.15s'
  }}
  onMouseEnter={(e) => {
    if (!editor.isActive('bold')) e.currentTarget.style.background = '#F9FAFB';
  }}
  onMouseLeave={(e) => {
    if (!editor.isActive('bold')) e.currentTarget.style.background = 'transparent';
  }}
>
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M9.40625 13.625H3.625V2.375H8.9375C9.56386 2.375 10.1771 2.55435 10.7048 2.89174C11.2325 3.22913 11.6526 3.71049 11.9155 4.27902C12.1784 4.84755 12.2731 5.47942 12.1884 6.10003C12.1037 6.72064 11.8431 7.304 11.4375 7.78125C11.9673 8.20498 12.3528 8.78247 12.5408 9.43433C12.7289 10.0862 12.7102 10.7803 12.4875 11.4211C12.2647 12.0619 11.8488 12.6179 11.297 13.0126C10.7452 13.4073 10.0847 13.6213 9.40625 13.625ZM5.5 11.75H9.39375C9.57843 11.75 9.76129 11.7136 9.93189 11.643C10.1025 11.5723 10.2575 11.4687 10.3881 11.3381C10.5187 11.2075 10.6223 11.0525 10.693 10.8819C10.7636 10.7113 10.8 10.5284 10.8 10.3438C10.8 10.1591 10.7636 9.97621 10.693 9.80561C10.6223 9.63501 10.5187 9.48002 10.3881 9.34942C10.2575 9.21882 10.1025 9.11523 9.93189 9.04455C9.76129 8.97387 9.57843 8.9375 9.39375 8.9375H5.5V11.75ZM5.5 7.0625H8.9375C9.12218 7.0625 9.30504 7.02613 9.47564 6.95545C9.64624 6.88477 9.80123 6.78118 9.93183 6.65058C10.0624 6.51998 10.166 6.36499 10.2367 6.19439C10.3074 6.02379 10.3438 5.84093 10.3438 5.65625C10.3438 5.47157 10.3074 5.28871 10.2367 5.11811C10.166 4.94751 10.0624 4.79252 9.93183 4.66192C9.80123 4.53132 9.64624 4.42773 9.47564 4.35705C9.30504 4.28637 9.12218 4.25 8.9375 4.25H5.5V7.0625Z" fill="black"/>
  </svg>
</button>

{/* Italic Button */}
<button
  onClick={() => editor.chain().focus().toggleItalic().run()}
  style={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px',
    width: '32px',
    height: '32px',
    background: editor.isActive('italic') ? '#F3F4F6' : 'transparent',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background 0.15s'
  }}
  onMouseEnter={(e) => {
    if (!editor.isActive('italic')) e.currentTarget.style.background = '#F9FAFB';
  }}
  onMouseLeave={(e) => {
    if (!editor.isActive('italic')) e.currentTarget.style.background = 'transparent';
  }}
>
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M9.625 3.625V2.375H1.5V3.625H4.7125L1.98125 12.375H-1.625V13.625H6.5V12.375H3.2875L6.01875 3.625H9.625Z" fill="#212529"/>
  </svg>
</button>

{/* H2 Button */}
<button
  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
  style={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px',
    width: '32px',
    height: '32px',
    background: editor.isActive('heading', { level: 2 }) ? '#F3F4F6' : 'transparent',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background 0.15s'
  }}
  onMouseEnter={(e) => {
    if (!editor.isActive('heading', { level: 2 })) e.currentTarget.style.background = '#F9FAFB';
  }}
  onMouseLeave={(e) => {
    if (!editor.isActive('heading', { level: 2 })) e.currentTarget.style.background = 'transparent';
  }}
>
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M2.49902 14.2618V1.37439H4.44346V7.97491H10.8683V1.37439H12.819V14.2618H10.8683V9.64235H4.44346V14.2618H2.49902Z" fill="black"/>
  </svg>
</button>

{/* H3 Button */}
<button
  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
  style={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px',
    width: '32px',
    height: '32px',
    background: editor.isActive('heading', { level: 3 }) ? '#F3F4F6' : 'transparent',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background 0.15s'
  }}
  onMouseEnter={(e) => {
    if (!editor.isActive('heading', { level: 3 })) e.currentTarget.style.background = '#F9FAFB';
  }}
  onMouseLeave={(e) => {
    if (!editor.isActive('heading', { level: 3 })) e.currentTarget.style.background = 'transparent';
  }}
>
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M6 14.1411V5H7.37931V8.97241H11.9363V5H13.32V14.1411H11.9363V10.1552H7.37931V14.1411H6Z" fill="black"/>
  </svg>
</button>

{/* Divider */}
<div
  style={{
    width: '12px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}
>
  <svg width="2" height="40" viewBox="0 0 2 40" fill="none">
    <path d="M1 0V41" stroke="#D1D5DC" strokeLinecap="round"/>
  </svg>
</div>

{/* Quote Button */}
<button
  onClick={() => editor.chain().focus().toggleBlockquote().run()}
  style={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px',
    width: '32px',
    height: '32px',
    background: editor.isActive('blockquote') ? '#F3F4F6' : 'transparent',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background 0.15s'
  }}
  onMouseEnter={(e) => {
    if (!editor.isActive('blockquote')) e.currentTarget.style.background = '#F9FAFB';
  }}
  onMouseLeave={(e) => {
    if (!editor.isActive('blockquote')) e.currentTarget.style.background = 'transparent';
  }}
>
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M5.5 7.375H1.81875C1.93462 6.60154 2.21095 5.86067 2.63006 5.19988C3.04917 4.53909 3.6002 3.97294 4.25 3.5375L5.36875 2.7875L4.68125 1.75L3.5625 2.5C2.62095 3.12749 1.84947 3.97781 1.31393 4.97546C0.778391 5.97311 0.499756 7.08715 0.5 8.21875V12.375C0.5 12.7065 0.631696 13.0245 0.866117 13.2589C1.10054 13.4933 1.41848 13.625 1.75 13.625H5.5C5.83152 13.625 6.14946 13.4933 6.38388 13.2589C6.6183 13.0245 6.75 12.7065 6.75 12.375V8.625C6.75 8.29348 6.6183 7.97554 6.38388 7.74112C6.14946 7.5067 5.83152 7.375 5.5 7.375ZM14.25 7.375H10.5687C10.6846 6.60154 10.961 5.86067 11.3801 5.19988C11.7992 4.53909 12.3502 3.97294 13 3.5375L14.1188 2.7875L13.4375 1.75L12.3125 2.5C11.3709 3.12749 10.5995 3.97781 10.0639 4.97546C9.52839 5.97311 9.24976 7.08715 9.25 8.21875V12.375C9.25 12.7065 9.3817 13.0245 9.61612 13.2589C9.85054 13.4933 10.1685 13.625 10.5 13.625H14.25C14.5815 13.625 14.8995 13.4933 15.1339 13.2589C15.3683 13.0245 15.5 12.7065 15.5 12.375V8.625C15.5 8.29348 15.3683 7.97554 15.1339 7.74112C14.8995 7.5067 14.5815 7.375 14.25 7.375Z" fill="#212529"/>
  </svg>
</button>

{/* Link Button */}
<button
  onClick={() => {
    const url = prompt('Enter URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }}
  style={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px',
    width: '32px',
    height: '32px',
    background: editor.isActive('link') ? '#F3F4F6' : 'transparent',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background 0.15s'
  }}
  onMouseEnter={(e) => {
    if (!editor.isActive('link')) e.currentTarget.style.background = '#F9FAFB';
  }}
  onMouseLeave={(e) => {
    if (!editor.isActive('link')) e.currentTarget.style.background = 'transparent';
  }}
>
  <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
    <path d="M18.2813 1.22503C17.9329 0.875428 17.5189 0.598039 17.0631 0.408769C16.6073 0.219499 16.1186 0.12207 15.625 0.12207C15.1315 0.12207 14.6428 0.219499 14.187 0.408769C13.7312 0.598039 13.3172 0.875428 12.9688 1.22503L13.8563 2.11253C14.089 1.87984 14.3652 1.69526 14.6692 1.56934C14.9733 1.44341 15.2991 1.37859 15.6282 1.37859C15.9572 1.37859 16.2831 1.44341 16.5871 1.56934C16.8911 1.69526 17.1674 1.87984 17.4 2.11253C17.6327 2.34521 17.8173 2.62145 17.9432 2.92547C18.0692 3.22949 18.134 3.55533 18.134 3.8844C18.134 4.21347 18.0692 4.53931 17.9432 4.84333C17.8173 5.14735 17.6327 5.42359 17.4 5.65628L12.4 10.6563C11.9309 11.1262 11.2944 11.3905 10.6304 11.3911C9.96638 11.3917 9.32935 11.1285 8.85942 10.6594C8.38949 10.1903 8.12515 9.55373 8.12457 8.88974C8.12398 8.22574 8.38719 7.58871 8.85629 7.11878L9.73754 6.23128L8.85629 5.34378L7.96879 6.23128C7.61919 6.57966 7.3418 6.99364 7.15253 7.44946C6.96326 7.90527 6.86583 8.39397 6.86583 8.88753C6.86583 9.38108 6.96326 9.86978 7.15253 10.3256C7.3418 10.7814 7.61919 11.1954 7.96879 11.5438C8.67597 12.2419 9.63134 12.6308 10.625 12.625C11.1205 12.6271 11.6114 12.5309 12.0695 12.3421C12.5276 12.1533 12.9437 11.8756 13.2938 11.525L18.2938 6.52503C18.9944 5.82025 19.3866 4.86619 19.3842 3.87244C19.3819 2.87869 18.9852 1.9265 18.2813 1.22503Z" fill="#212529"/>
    <path d="M2.61879 12.5125C2.38541 12.2802 2.20022 12.0041 2.07386 11.7C1.94749 11.396 1.88244 11.0699 1.88244 10.7407C1.88244 10.4114 1.94749 10.0853 2.07386 9.78126C2.20022 9.47719 2.38541 9.20107 2.61879 8.96878L7.61879 3.96878C7.85109 3.7354 8.1272 3.55021 8.43127 3.42384C8.73534 3.29748 9.06138 3.23243 9.39067 3.23243C9.71995 3.23243 10.046 3.29748 10.3501 3.42384C10.6541 3.55021 10.9302 3.7354 11.1625 3.96878C11.3944 4.2029 11.577 4.48119 11.6994 4.78716C11.8218 5.09313 11.8815 5.42055 11.875 5.75003C11.8769 6.08053 11.8133 6.40813 11.6878 6.71388C11.5623 7.01962 11.3774 7.29745 11.1438 7.53128L9.81879 8.87503L10.7063 9.76253L12.0313 8.43753C12.7366 7.73222 13.1328 6.77561 13.1328 5.77815C13.1328 4.78069 12.7366 3.82409 12.0313 3.11878C11.326 2.41347 10.3694 2.01723 9.37192 2.01723C8.37446 2.01723 7.41785 2.41347 6.71254 3.11878L1.71254 8.11878C1.362 8.46728 1.08382 8.88164 0.893994 9.33804C0.704168 9.79443 0.606445 10.2839 0.606445 10.7782C0.606445 11.2725 0.704168 11.7619 0.893994 12.2183C1.08382 12.6747 1.362 13.089 1.71254 13.4375C2.42431 14.1303 3.38185 14.5124 4.37504 14.5C5.37698 14.501 6.33862 14.1055 7.05004 13.4L6.16254 12.5125C5.93025 12.7459 5.65413 12.9311 5.35006 13.0575C5.04599 13.1838 4.71995 13.2489 4.39067 13.2489C4.06138 13.2489 3.73534 13.2183 3.43127 13.0575C3.1272 12.9311 2.85109 12.7459 2.61879 12.5125Z" fill="#212529"/>
  </svg>
</button>



      </div>
    </div>
  );
}
