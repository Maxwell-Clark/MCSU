'use client';

import { useRef } from 'react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapImage from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { ActionIcon, FileButton, Tooltip } from '@mantine/core';
import { IconPhoto } from '@tabler/icons-react';
import { uploadImage } from '@/lib/supabase/storage';
import classes from './RichTextEditor.module.css';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function BlogRichTextEditor({ content, onChange }: RichTextEditorProps) {
  const resetRef = useRef<() => void>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link,
      TiptapImage,
      Placeholder.configure({ placeholder: 'Start writing your blog post...' }),
    ],
    content,
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
  });

  const handleImageUpload = async (file: File | null) => {
    if (!file || !editor) return;

    try {
      const formData = new FormData();
      formData.append('file', file);
      const url = await uploadImage(formData);
      editor.chain().focus().setImage({ src: url }).run();
    } catch {
      // Silently fail - user can retry
    }
    resetRef.current?.();
  };

  return (
    <RichTextEditor editor={editor} className={classes.editor}>
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <FileButton onChange={handleImageUpload} accept="image/*" resetRef={resetRef}>
            {(props) => (
              <Tooltip label="Upload image">
                <ActionIcon variant="default" size={26} {...props}>
                  <IconPhoto size={16} stroke={1.5} />
                </ActionIcon>
              </Tooltip>
            )}
          </FileButton>
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
