// Toolbar.tsx
import React from 'react';
import { useSlate } from 'slate-react';
import { 
  IconBold, 
  IconItalic, 
  IconUnderline, 
  IconCode,
  IconLink,
  IconPhoto,
  IconH1,
  IconH2,
  IconH3,
  IconList,
  IconListNumbers,
  IconQuote,
  IconSeo,
  IconCheck
} from '@tabler/icons-react';
import { 
  toggleMark, 
  isMarkActive, 
  insertImage, 
  toggleBlock,
  isBlockActive,
  insertLink 
} from './utils';
import { CustomElement } from './types';

interface ToolbarProps {
  onSave: () => void;
  onShowSEOModal: () => void;
}

const BLOCK_TYPES = [
  { format: 'paragraph', icon: IconH1, label: 'Paragraph' },
  { format: 'heading-one', icon: IconH1, label: 'Heading 1' },
  { format: 'heading-two', icon: IconH2, label: 'Heading 2' },
  { format: 'heading-three', icon: IconH3, label: 'Heading 3' },
  { format: 'block-quote', icon: IconQuote, label: 'Quote' },
  { format: 'numbered-list', icon: IconListNumbers, label: 'Numbered List' },
  { format: 'bulleted-list', icon: IconList, label: 'Bulleted List' },
];

const MARK_TYPES = [
  { format: 'bold', icon: IconBold, label: 'Bold' },
  { format: 'italic', icon: IconItalic, label: 'Italic' },
  { format: 'underline', icon: IconUnderline, label: 'Underline' },
  { format: 'code', icon: IconCode, label: 'Code' },
];

export const Toolbar: React.FC<ToolbarProps> = ({ onSave, onShowSEOModal }) => {
  const editor = useSlate();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      insertImage(editor, file);
    }
  };

  return (
    <div className="toolbar">
      <div className="toolbar-group">
        {BLOCK_TYPES.map(({ format, icon: Icon, label }) => (
          <ToolbarButton
            key={format}
            active={isBlockActive(editor, format)}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleBlock(editor, format);
            }}
            label={label}
          >
            <Icon size={18} />
          </ToolbarButton>
        ))}
      </div>

      <div className="toolbar-group">
        {MARK_TYPES.map(({ format, icon: Icon, label }) => (
          <ToolbarButton
            key={format}
            active={isMarkActive(editor, format)}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleMark(editor, format);
            }}
            label={label}
          >
            <Icon size={18} />
          </ToolbarButton>
        ))}
      </div>

      <div className="toolbar-group">
        <ToolbarButton
          onMouseDown={(e) => {
            e.preventDefault();
            const url = window.prompt('Enter the URL:');
            if (url) insertLink(editor, url);
          }}
          label="Insert Link"
        >
          <IconLink size={18} />
        </ToolbarButton>

        <ToolbarButton
          as="label"
          htmlFor="image-upload"
          label="Insert Image"
        >
          <IconPhoto size={18} />
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </ToolbarButton>

        <ToolbarButton
          onMouseDown={(e) => {
            e.preventDefault();
            onShowSEOModal();
          }}
          label="SEO Settings"
        >
          <IconSeo size={18} />
        </ToolbarButton>
      </div>

      <div className="toolbar-group">
        <ToolbarButton
          onMouseDown={(e) => {
            e.preventDefault();
            onSave();
          }}
          label="Save Content"
          variant="primary"
        >
          <IconCheck size={18} />
          <span>Save</span>
        </ToolbarButton>
      </div>
    </div>
  );
};

interface ToolbarButtonProps {
  active?: boolean;
  onMouseDown?: (e: React.MouseEvent) => void;
  label: string;
  children: React.ReactNode;
  as?: 'button' | 'label';
  htmlFor?: string;
  variant?: 'default' | 'primary';
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  active = false,
  onMouseDown,
  label,
  children,
  as: Component = 'button',
  htmlFor,
  variant = 'default'
}) => {
  const className = `toolbar-button ${active ? 'active' : ''} ${variant}`;
  
  return (
    <Component
      className={className}
      onMouseDown={onMouseDown}
      title={label}
      htmlFor={htmlFor}
    >
      {children}
    </Component>
  );
};