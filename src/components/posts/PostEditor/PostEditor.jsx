import React, { useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaHeading,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
} from 'react-icons/fa';
import styles from './postEditor.module.css';

const PostEditor = ({ initialPost, onSave }) => {
  const [post, setPost] = useState({
    title: initialPost?.title || '',
    summary: initialPost?.summary || '',
    content: initialPost?.content || '<p>Escreva seu post aqui...</p>',
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: post.content,
  });

  const handleSave = () => {
    onSave(post);
  };

  return (
    <div className={styles.editorContainer}>
      <input
        type="text"
        placeholder="Título do Post"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        className={styles.titleInput}
      />

      <textarea
        placeholder="Resumo do post (opcional)"
        value={post.summary}
        onChange={(e) => setPost({ ...post, summary: e.target.value })}
        className={styles.summaryInput}
      />

      <div className={styles.toolbar}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? styles.activeButton : ''}
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? styles.activeButton : ''}
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? styles.activeButton : ''}
        >
          <FaUnderline />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive('heading', { level: 1 }) ? styles.activeButton : ''
          }
        >
          <FaHeading /> H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive('heading', { level: 2 }) ? styles.activeButton : ''
          }
        >
          <FaHeading /> H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive('heading', { level: 3 }) ? styles.activeButton : ''
          }
        >
          <FaHeading /> H3
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={
            editor.isActive('textAlign', { textAlign: 'left' })
              ? styles.activeButton
              : ''
          }
        >
          <FaAlignLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={
            editor.isActive('textAlign', { textAlign: 'center' })
              ? styles.activeButton
              : ''
          }
        >
          <FaAlignCenter />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={
            editor.isActive('textAlign', { textAlign: 'right' })
              ? styles.activeButton
              : ''
          }
        >
          <FaAlignRight />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={
            editor.isActive('textAlign', { textAlign: 'justify' })
              ? styles.activeButton
              : ''
          }
        >
          <FaAlignJustify />
        </button>
      </div>

      <EditorContent editor={editor} className={styles.editorContent} />

      <button onClick={handleSave} className={styles.saveButton}>
        Salvar Post
      </button>
    </div>
  );
};

export default PostEditor;
