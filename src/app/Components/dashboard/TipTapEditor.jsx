"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaHeading,
  FaListUl,
  FaListOl,
  FaQuoteRight,
  FaCode,
  FaUndo,
  FaRedo,
  FaLink,
  FaUnlink,
} from "react-icons/fa";

export default function TiptapEditor({ content, setContent }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
      CodeBlock,
    ],
    content,
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-2 bg-gray-100 dark:bg-gray-900 p-2 rounded-lg">
        <button
          type="button"
          aria-label="Bold"
          title="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${
            editor.isActive("bold") ? "bg-blue-200 dark:bg-blue-700" : ""
          }`}
        >
          <FaBold />
        </button>
        <button
          type="button"
          aria-label="Italic"
          title="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${
            editor.isActive("italic") ? "bg-blue-200 dark:bg-blue-700" : ""
          }`}
        >
          <FaItalic />
        </button>
        <button
          type="button"
          aria-label="Underline"
          title="Underline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded ${
            editor.isActive("underline") ? "bg-blue-200 dark:bg-blue-700" : ""
          }`}
        >
          <FaUnderline />
        </button>
        <button
          type="button"
          aria-label="Heading 1"
          title="Heading 1"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`p-2 rounded ${
            editor.isActive("heading", { level: 1 })
              ? "bg-blue-200 dark:bg-blue-700"
              : ""
          }`}
        >
          <FaHeading /> 1
        </button>
        <button
          type="button"
          aria-label="Heading 2"
          title="Heading 2"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`p-2 rounded ${
            editor.isActive("heading", { level: 2 })
              ? "bg-blue-200 dark:bg-blue-700"
              : ""
          }`}
        >
          <FaHeading /> 2
        </button>
        <button
          type="button"
          aria-label="Bullet List"
          title="Bullet List"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${
            editor.isActive("bulletList") ? "bg-blue-200 dark:bg-blue-700" : ""
          }`}
        >
          <FaListUl />
        </button>
        <button
          type="button"
          aria-label="Ordered List"
          title="Ordered List"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${
            editor.isActive("orderedList") ? "bg-blue-200 dark:bg-blue-700" : ""
          }`}
        >
          <FaListOl />
        </button>
        <button
          type="button"
          aria-label="Blockquote"
          title="Blockquote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded ${
            editor.isActive("blockquote") ? "bg-blue-200 dark:bg-blue-700" : ""
          }`}
        >
          <FaQuoteRight />
        </button>
        <button
          type="button"
          aria-label="Code Block"
          title="Code Block"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded ${
            editor.isActive("codeBlock") ? "bg-blue-200 dark:bg-blue-700" : ""
          }`}
        >
          <FaCode />
        </button>
        <button
          type="button"
          aria-label="Undo"
          title="Undo"
          onClick={() => editor.chain().focus().undo().run()}
          className="p-2 rounded"
        >
          <FaUndo />
        </button>
        <button
          type="button"
          aria-label="Redo"
          title="Redo"
          onClick={() => editor.chain().focus().redo().run()}
          className="p-2 rounded"
        >
          <FaRedo />
        </button>
        <button
          type="button"
          aria-label="Add Link"
          title="Add Link"
          onClick={() => {
            const url = prompt("Enter URL");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={`p-2 rounded ${
            editor.isActive("link") ? "bg-blue-200 dark:bg-blue-700" : ""
          }`}
        >
          <FaLink />
        </button>
        <button
          type="button"
          aria-label="Remove Link"
          title="Remove Link"
          onClick={() => editor.chain().focus().unsetLink().run()}
          className="p-2 rounded"
        >
          <FaUnlink />
        </button>
      </div>
      {/* Editor */}
      <EditorContent
        editor={editor}
        className="mt-2 bg-white dark:bg-gray-800 rounded-lg p-2 border min-h-[250px] focus:outline-none"
        aria-label="Rich text editor"
      />
    </div>
  );
}
