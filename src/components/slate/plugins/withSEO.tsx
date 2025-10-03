// plugins/withSEO.ts
import { Editor } from 'slate';

export const withSEO = (editor: Editor) => {
  // Add SEO-specific functionality here
  return editor;
};

// SEOModal.tsx
import React, { useState } from 'react';
import { useSlate } from 'slate-react';
import { IconX } from '@tabler/icons-react';
import { Transforms, Element } from 'slate';

interface SEOModalProps {
  onClose: () => void;
}

export const SEOModal: React.FC<SEOModalProps> = ({ onClose }) => {
  const editor = useSlate();
  const [seoData, setSeoData] = useState({
    title: '',
    description: '',
    keywords: '',
  });

  const handleSave = () => {
    // Insert SEO meta as a hidden element in the document
    const seoElement: any = {
      type: 'seo-meta',
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords.split(',').map(k => k.trim()),
      children: [{ text: '' }],
    };

    // Add SEO meta at the beginning of the document
    Transforms.insertNodes(editor, seoElement, { at: [0] });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>SEO Settings</h3>
          <button onClick={onClose} className="close-button">
            <IconX size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Meta Title</label>
            <input
              type="text"
              value={seoData.title}
              onChange={(e) => setSeoData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Optimized title (50-60 characters)"
              maxLength={60}
            />
            <div className="character-count">
              {seoData.title.length}/60
            </div>
          </div>

          <div className="form-group">
            <label>Meta Description</label>
            <textarea
              value={seoData.description}
              onChange={(e) => setSeoData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Compelling description (150-160 characters)"
              maxLength={160}
              rows={3}
            />
            <div className="character-count">
              {seoData.description.length}/160
            </div>
          </div>

          <div className="form-group">
            <label>Keywords</label>
            <input
              type="text"
              value={seoData.keywords}
              onChange={(e) => setSeoData(prev => ({ ...prev, keywords: e.target.value }))}
              placeholder="Comma-separated keywords"
            />
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button onClick={handleSave} className="btn-primary">
            Save SEO Data
          </button>
        </div>
      </div>
    </div>
  );
};