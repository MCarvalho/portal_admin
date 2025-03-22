import React, { useState, useEffect, useRef } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
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
import { uploadImage } from '@/services/postService';

const PostEditor = ({ initialPost, onSave, setPost }) => {
  const [isSaving, setIsSaving] = useState(false);
  const hasLoadedInitialImages = useRef(false);

  useEffect(() => {
    if (
      initialPost?.PostImages?.length > 0 &&
      !hasLoadedInitialImages.current
    ) {
      const existingImages = initialPost.PostImages;
      const imageIds = existingImages.map((img) => img.id);
      const images = existingImages.map(
        (img) => `${import.meta.env.VITE_BACKEND_URL}${img.path}`,
      );
      setPost((prev) => ({
        ...prev,
        imageIds,
        images,
      }));

      hasLoadedInitialImages.current = true;
    }
  }, [initialPost, setPost]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        allowImages: true,
      }),
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
    ],
    content: initialPost?.content || 'Conteudo do post',
  });

  const handlePostSave = async () => {
    if (isSaving) return;
    setIsSaving(true);

    try {
      const htmlContent = editor.getHTML();

      const usedImagePaths = Array.from(
        new DOMParser().parseFromString(htmlContent, 'text/html').images,
      ).map((img) => new URL(img.src).pathname);

      const usedImageIds = [];
      const removedImageIds = [];

      initialPost.PostImages?.forEach((image) => {
        const matches = usedImagePaths.some((path) =>
          path.endsWith(image.path),
        );
        if (matches) {
          usedImageIds.push(image.id);
        } else {
          removedImageIds.push(image.id);
        }
      });

      await onSave({
        ...initialPost,
        content: htmlContent,
        imageIds: usedImageIds,
        removedImageIds,
      });
    } catch (err) {
      alert(err);
      setIsSaving(false);
    }
  };
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const response = await uploadImage(file);

        const imageUrl = new URL(response.url, import.meta.env.VITE_BACKEND_URL)
          .href;

        setPost((prevPost) => ({
          ...prevPost,
          imageIds: [...prevPost.imageIds, response.id],
          images: [...prevPost.images, imageUrl],
          PostImages: [
            ...prevPost.PostImages,
            {
              id: response.id,
              path: response.url,
            },
          ],
        }));

        editor.commands.setContent(
          editor.getHTML() +
            `<img crossorigin="anonymous" src="${imageUrl}" alt="Imagem do post" style="max-width:100%; height:auto;" />`,
        );
      } catch (error) {
        console.error('Erro ao fazer upload da imagem:', error);
      }
    }
  };

  return (
    <div className={styles.editorContainer}>
      <input
        type="text"
        placeholder="Título do Post"
        value={initialPost.title}
        onChange={(e) => setPost({ ...initialPost, title: e.target.value })}
        className={styles.titleInput}
      />

      <textarea
        placeholder="Resumo do post (opcional)"
        value={initialPost.summary}
        onChange={(e) => setPost({ ...initialPost, summary: e.target.value })}
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

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className={styles.imageUpload}
      />

      <EditorContent editor={editor} className={styles.editorContent} />

      <button
        className={styles.saveButton}
        disabled={isSaving}
        onClick={handlePostSave}
      >
        {isSaving ? 'Salvando...' : 'Salvar Post'}
      </button>
    </div>
  );
};

export default PostEditor;
