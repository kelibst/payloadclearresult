'use client'

import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { SerializedEditorState } from 'lexical'
import { useMemo, useCallback } from 'react'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'

type RichTextInputProps = {
  onChange: (value: SerializedEditorState) => void
  initialValue?: SerializedEditorState | null
}

export const RichTextInput: React.FC<RichTextInputProps> = ({ onChange, initialValue }) => {
  const theme = useMemo(
    () => ({
      paragraph: 'mb-1',
      rtl: 'text-right',
      ltr: 'text-left',
      text: {
        bold: 'font-bold',
        italic: 'italic',
        underline: 'underline',
      },
    }),
    [],
  )

  const onError = useCallback((error: Error) => {
    console.error(error)
  }, [])

  const handleEditorChange = useCallback(
    (editorState: any) => {
      onChange(editorState.toJSON())
    },
    [onChange],
  )

  const initialConfig = useMemo(
    () => ({
      namespace: 'CommentEditor',
      theme,
      onError,
      editorState: initialValue,
    }),
    [theme, onError, initialValue],
  )

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="relative min-h-[100px]">
        <RichTextPlugin
          contentEditable={<ContentEditable className="min-h-[100px] outline-none" />}
          placeholder={
            <div className="absolute top-3 left-3 text-gray-400">Write your comment...</div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={handleEditorChange} />
        <HistoryPlugin />
      </div>
    </LexicalComposer>
  )
}
