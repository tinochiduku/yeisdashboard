'use client'
import React, { useCallback, useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { 
  Slate, 
  Editable, 
  withReact, 
} from 'slate-react';
import { Toolbar } from './Toolbar';
import { Element } from './Element';
import { Leaf } from './Leaf';
import { withImages } from './plugins/withImages';
import { withLinks } from './plugins/withLinks';
import { withSEO } from './plugins/withSEO';
import { serializeToSEOHTML } from './serializer';
import { SEOModal } from './SEOModal';


interface RichTextEditorProps {
  onSave?: (content: any, seoHtml: string) => void;
  initialContent?: Descendant[];
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  onSave
}) => {
  const editor = useMemo(() => 
    withSEO(withLinks(withImages(withReact(createEditor())))), 
    []
  );
  
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    }
  ]);
  const [showSEOModal, setShowSEOModal] = useState(false);

  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);

  const handleSave = () => {
    const seoHtml = serializeToSEOHTML(value);
    const contentForDB = processContentForDB(value);
    
    onSave?.(contentForDB, seoHtml);
  };

  const processContentForDB = (content: Descendant[]): any => {
    return {
      version: '1.0',
      createdAt: new Date().toISOString(),
      content: content,
      wordCount: calculateWordCount(content),
      readingTime: calculateReadingTime(content),
    };
  };

  const calculateWordCount = (content: Descendant[]): number => {
    let wordCount = 0;
    const traverse = (nodes: Descendant[]) => {
      nodes.forEach(node => {
        if ('text' in node) {
          const words = node.text.trim().split(/\s+/).filter(word => word.length > 0);
          wordCount += words.length;
        }
        if ('children' in node) {
          traverse(node.children);
        }
      });
    };
    traverse(content);
    return wordCount;
  };

  const calculateReadingTime = (content: Descendant[]): number => {
    const wordCount = calculateWordCount(content);
    return Math.ceil(wordCount / 200); // 200 words per minute
  };

  return (
    <div className="rich-text-editor">
      <Slate initialValue={value} editor={editor} value={value} onChange={setValue}>
        <Toolbar 
          onSave={handleSave}
          onShowSEOModal={() => setShowSEOModal(true)}
        />
        <div className="editor-content">
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Start writing your content..."
            spellCheck
            autoFocus
            className="editable-area"
          />
        </div>
      {showSEOModal && (
        <SEOModal onClose={() => setShowSEOModal(false)} />
      )}
      </Slate>

    </div>
  );
};