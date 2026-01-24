"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface Props {
  content: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    immediatelyRender: false, 
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const buttonClass = (active: boolean) =>
    `px-3 py-1 rounded text-sm border ${
      active
        ? "bg-black text-white"
        : "bg-white text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="border border-gray-300 rounded-md">
      <div className="flex gap-2 border-b border-gray-300 p-2 bg-gray-50">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={buttonClass(editor.isActive("bold"))}
        >
          Bold
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={buttonClass(editor.isActive("italic"))}
        >
          Italic
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={buttonClass(editor.isActive("bulletList"))}
        >
          List
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={buttonClass(editor.isActive("heading", { level: 2 }))}
        >
          H2
        </button>
      </div>

      <EditorContent
        editor={editor}
        className="prose max-w-none p-4 focus:outline-none"
      />
    </div>
  );
}
