import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';

const Tiptap = () => {
  const [savedContent, setSavedContent] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: true,
      }),
      TextStyle,
    ],
    content: '<p>Hello, Tiptap Editor!</p>',
  });

  const handleSave = () => {
    const content = editor.getHTML();
    setSavedContent(content); // Save HTML content
  };

  const handleBrowserIconClick = () => {
    const userLink = prompt('Enter the URL for the hyperlink:');
    if (userLink) {
      try {
        const formattedLink = new URL(userLink); // Validate the URL
        editor.chain().focus().toggleLink({ href: formattedLink.toString() }).run();
      } catch (e) {
        alert('Invalid URL. Please enter a valid URL.');
      }
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="editor-container">
      <h1>TextPro Editor</h1> {/* Title for the text editor */}

      {/* Toolbar */}
      <div className="toolbar">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>
          <strong>B</strong>
        </button>

        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>
          <em>I</em>
        </button>

        <button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'is-active' : ''}>
          <s>S</s>
        </button>

        <button onClick={() => editor.chain().focus().toggleCode().run()} className={editor.isActive('code') ? 'is-active' : ''}>
          <code>Code</code>
        </button>

        <button onClick={() => editor.chain().focus().clearMarks().run()}>
          Clear Marks
        </button>

        <button onClick={() => editor.chain().focus().clearNodes().run()}>
          Clear Nodes
        </button>

        <button onClick={() => editor.chain().focus().setParagraph().run()}>
          Paragraph
        </button>

        <button onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}>
          H1
        </button>

        <button onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}>
          H2
        </button>

        <button onClick={() => editor.chain().focus().setHeading({ level: 3 }).run()}>
          H3
        </button>

        <button onClick={() => editor.chain().focus().setHeading({ level: 4 }).run()}>
          H4
        </button>

        <button onClick={() => editor.chain().focus().setHeading({ level: 5 }).run()}>
          H5
        </button>

        <button onClick={() => editor.chain().focus().setHeading({ level: 6 }).run()}>
          H6
        </button>

        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          Bullet List
        </button>

        <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          Ordered List
        </button>

        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          Code Block
        </button>

        <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          Blockquote
        </button>

        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          Horizontal Rule
        </button>

        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          Hard Break
        </button>

        <button onClick={() => editor.chain().focus().undo().run()}>
          Undo
        </button>

        <button onClick={() => editor.chain().focus().redo().run()}>
          Redo
        </button>

        {/* Browser Icon Button for Link */}
        <button onClick={handleBrowserIconClick} style={{ padding: '0', margin: '0 5px' }}>
          <img
            src="https://img.icons8.com/ios/50/000000/globe.png"
            alt="Browser Icon"
            style={{ width: '20px', height: '20px' }} // Smaller browser icon
          />
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />

      {/* Save Button */}
      <button onClick={handleSave} style={{ marginTop: '10px' }}>
        Save
      </button>

      {/* Display Saved Content */}
      {savedContent && (
        <div style={{ marginTop: '20px' }}>
          <h3>Saved Content:</h3>
          <div dangerouslySetInnerHTML={{ __html: savedContent }} />
        </div>
      )}

      {/* Footer with Author's Name */}
      <footer style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#888' }}>
        <p>By Nikam Pratik</p>
      </footer>
    </div>
  );
};

export default Tiptap;
