import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Highlight from '@tiptap/extension-highlight';
import CharacterCount from '@tiptap/extension-character-count';

import MenuBar from './MenuBar';

function Editor({ editable = true, content = '', onChange = () => {} }) {
  const editor = useEditor({
    content: content,
    editable,
    extensions: [
      StarterKit.configure({
        history: true,
      }),
      Highlight,
      TaskList,
      TaskItem,
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-lg p-4 focus:outline-none xl:leading-6 min-h-[100%] max-h-full overflow-y-scroll min-w-full',
      },
    },
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    editor && editor.commands.setContent(content);
  }, [content]);

  if (!editable && editor) {
    return (
      <div className='w-full'>
        <EditorContent editor={editor} height='100%' />
      </div>
    );
  }

  return (
    <div className='max-w-full bg-white'>
      {editor && <MenuBar editor={editor} />}
      <EditorContent editor={editor} autoFocus />
    </div>
  );
}

export default Editor;
