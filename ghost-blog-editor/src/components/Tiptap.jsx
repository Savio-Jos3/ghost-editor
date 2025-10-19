import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import Placeholder from '@tiptap/extension-placeholder';
import { useState, useEffect } from "react";
import BlockMenu from "./BlockMenu";
import BubbleMenuBar from "./BubbleMenuBar";
import { Bookmark } from "../extensions/Bookmark";
import { HtmlEmbed } from "../extensions/HtmlEmbed";
import { TwitterEmbed } from "../extensions/TwitterEmbed.jsx";
import UnsplashModal from "./UnsplashModal";

export default function Tiptap({ content, onUpdate, placeholder = "Begin writing your post..." }) {
  const [showBlockMenu, setShowBlockMenu] = useState(false);
  const [showUnsplashModal, setShowUnsplashModal] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Heading.configure({
        levels: [2, 3],
      }),
      Image,
      Youtube,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Bookmark,
      HtmlEmbed,
      TwitterEmbed,  // ← Add this
      Placeholder.configure({
        placeholder: placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: content || "<p></p>",
onUpdate: ({ editor }) => {
  onUpdate(editor.getHTML());
  // Don't close block menu on update - let it stay open
},
    editorProps: {
      attributes: {
        style: 'font-family: Georgia, serif; font-size: 18px; line-height: 28px; color: #09090B; outline: none; min-height: 200px;',
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "<p></p>");
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <EditorContent editor={editor} />
      
      {/* Plus Button - Floating Menu for empty lines */}
      <FloatingMenu
        editor={editor}
        tippyOptions={{ 
          duration: 100, 
          placement: 'left',
          offset: [-48, 0]
        }}
        shouldShow={({ editor, state }) => {
          const { $from } = state.selection;
          const isRootDepth = $from.depth === 1;
          const isEmptyTextBlock = $from.parent.isTextblock && !$from.parent.textContent;
          return isRootDepth && isEmptyTextBlock;
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          {/* Plus button - Always visible */}
          <button
            onClick={() => setShowBlockMenu((prev) => !prev)}
            style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#E5E7EB',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              transition: 'background 0.15s',
              color: '#6B7280',
              zIndex: 10
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#D1D5DB'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#E5E7EB'}
            title="Add block"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          
          {/* Block Menu - Shows to the right of plus button */}
          {showBlockMenu && (
            <div style={{ position: 'absolute', left: '40px', top: 0, zIndex: 20 }}>
             <BlockMenu 
  editor={editor} 
  onClose={() => setShowBlockMenu(false)} 
  onOpenUnsplash={() => setShowUnsplashModal(true)} 
/>
            </div>
          )}
        </div>
      </FloatingMenu>

      {/* Bubble Menu for text selection */}
      <BubbleMenu
        editor={editor}
        tippyOptions={{ 
          duration: 100,
          placement: 'top'
        }}
        shouldShow={({ editor, state }) => {
          const { from, to } = state.selection;
          const hasSelection = from !== to;
          const isNotImage = !editor.isActive('image');
          return hasSelection && isNotImage;
        }}
      >
        <BubbleMenuBar editor={editor} />
      </BubbleMenu>
       {/* Add Unsplash Modal */}
      {showUnsplashModal && (
        <UnsplashModal 
          editor={editor} 
          onClose={() => setShowUnsplashModal(false)} 
        />
      )}
    </div>
  );
}
