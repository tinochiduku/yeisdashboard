// components/SEOModal.tsx
import React, { useState, useEffect } from 'react';
import { useSlate } from 'slate-react';
import { Editor, Transforms, Element, Node } from 'slate';
import { IconX, IconSeo, IconEye, IconRefresh } from '@tabler/icons-react';
import { SEOElement } from './types';

interface SEOModalProps {
  onClose: () => void;
}

interface SEOData {
  title: string;
  description: string;
  keywords: string;
  slug: string;
  focusKeyword: string;
}

export const SEOModal: React.FC<SEOModalProps> = ({ onClose }) => {
  const editor = useSlate();
  const [seoData, setSeoData] = useState<SEOData>({
    title: '',
    description: '',
    keywords: '',
    slug: '',
    focusKeyword: ''
  });
  const [preview, setPreview] = useState({
    title: '',
    description: '',
    url: ''
  });

  // Extract existing SEO data from the document
  useEffect(() => {
    const existingSEONode = findSEONode(editor);
    if (existingSEONode) {
      setSeoData({
        title: existingSEONode.title || '',
        description: existingSEONode.description || '',
        keywords: Array.isArray(existingSEONode.keywords) 
          ? existingSEONode.keywords.join(', ') 
          : '',
        slug: existingSEONode.slug || '',
        focusKeyword: existingSEONode.focusKeyword || ''
      });
    }

    // Generate preview
    generatePreview();
  }, [editor]);

  const findSEONode = (editor: Editor): SEOElement | null => {
    const [seoNode] = Array.from(
      Editor.nodes(editor, {
        at: [],
        match: n => 
          !Editor.isEditor(n) && 
          Element.isElement(n) && 
          n.type === 'seo-meta'
      })
    );
    
    return seoNode ? (seoNode[0] as SEOElement) : null;
  };

  const generatePreview = () => {
    // Extract content for preview
    const content = extractContentForPreview(editor);
    
    setPreview({
      title: seoData.title || content.title || 'Untitled Document',
      description: seoData.description || content.description || 'No description available',
      url: seoData.slug ? `https://yoursite.com/${seoData.slug}` : 'https://yoursite.com/untitled'
    });
  };

  const extractContentForPreview = (editor: Editor) => {
    const nodes = Array.from(Editor.nodes(editor, {
      at: [],
      match: n => Editor.isEditor(n) || (Element.isElement(n) && !['seo-meta', 'image'].includes(n.type))
    }));

    let title = '';
    let description = '';
    let textContent = '';

    // Extract first heading as title if no SEO title
    for (const [node] of nodes) {
      if (Element.isElement(node)) {
        if (!title && ['heading-one', 'heading-two', 'heading-three'].includes(node.type)) {
          title = Node.string(node).slice(0, 60);
        }
        
        const nodeText = Node.string(node);
        if (nodeText) {
          textContent += nodeText + ' ';
        }
      }
    }

    // Generate description from content
    if (textContent) {
      description = textContent.trim().slice(0, 160);
      if (description.length === 160) {
        description += '...';
      }
    }

    return { title, description };
  };

  const handleSave = () => {
    // Remove existing SEO node
    removeExistingSEONode(editor);

    // Create new SEO element
    const seoElement: SEOElement = {
      type: 'seo-meta',
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords.split(',').map(k => k.trim()).filter(k => k),
      slug: seoData.slug,
      focusKeyword: seoData.focusKeyword,
      children: [{ text: '' }],
    };

    // Insert at the beginning of the document
    Transforms.insertNodes(editor, seoElement, { at: [0] });
    onClose();
  };

  const removeExistingSEONode = (editor: Editor) => {
    Transforms.removeNodes(editor, {
      at: [],
      match: n => 
        !Editor.isEditor(n) && 
        Element.isElement(n) && 
        n.type === 'seo-meta'
    });
  };

  const handleGenerateFromContent = () => {
    const content = extractContentForPreview(editor);
    
    setSeoData(prev => ({
      ...prev,
      title: prev.title || content.title,
      description: prev.description || content.description
    }));

    setTimeout(generatePreview, 100);
  };

  const handleInputChange = (field: keyof SEOData, value: string) => {
    setSeoData(prev => ({ ...prev, [field]: value }));
    
    // Update preview after a short delay
    setTimeout(generatePreview, 300);
  };

  const getTitleScore = () => {
    const length = seoData.title.length;
    if (length >= 50 && length <= 60) return 'good';
    if (length >= 40 && length < 50) return 'fair';
    if (length > 60) return 'poor';
    return 'poor';
  };

  const getDescriptionScore = () => {
    const length = seoData.description.length;
    if (length >= 120 && length <= 160) return 'good';
    if (length >= 90 && length < 120) return 'fair';
    if (length > 160) return 'poor';
    return 'poor';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <IconSeo size={24} />
            <h3>SEO Optimization</h3>
          </div>
          <button onClick={onClose} className="close-button">
            <IconX size={20} />
          </button>
        </div>

        <div className="modal-body seo-modal">
          <div className="seo-layout">
            <div className="seo-form-section">
              <div className="section-header">
                <h4>SEO Settings</h4>
                <button 
                  type="button" 
                  className="btn-secondary small"
                  onClick={handleGenerateFromContent}
                >
                  <IconRefresh size={16} />
                  Generate from Content
                </button>
              </div>

              <div className="form-group">
                <label>
                  SEO Title
                  <span className={`score ${getTitleScore()}`}>
                    {seoData.title.length}/60
                  </span>
                </label>
                <input
                  type="text"
                  value={seoData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Optimized title for search engines"
                  className={getTitleScore()}
                />
                <div className="help-text">
                  {getTitleScore() === 'good' && '✓ Good length (50-60 characters)'}
                  {getTitleScore() === 'fair' && '⚠ Could be longer (aim for 50-60 characters)'}
                  {getTitleScore() === 'poor' && '✗ Too long or too short (50-60 characters recommended)'}
                </div>
              </div>

              <div className="form-group">
                <label>
                  Meta Description
                  <span className={`score ${getDescriptionScore()}`}>
                    {seoData.description.length}/160
                  </span>
                </label>
                <textarea
                  value={seoData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Compelling description that encourages clicks"
                  rows={3}
                  className={getDescriptionScore()}
                />
                <div className="help-text">
                  {getDescriptionScore() === 'good' && '✓ Good length (120-160 characters)'}
                  {getDescriptionScore() === 'fair' && '⚠ Could be longer (aim for 120-160 characters)'}
                  {getDescriptionScore() === 'poor' && '✗ Too long or too short (120-160 characters recommended)'}
                </div>
              </div>

              <div className="form-group">
                <label>Focus Keyword</label>
                <input
                  type="text"
                  value={seoData.focusKeyword}
                  onChange={(e) => handleInputChange('focusKeyword', e.target.value)}
                  placeholder="Primary keyword for this content"
                />
              </div>

              <div className="form-group">
                <label>Keywords</label>
                <input
                  type="text"
                  value={seoData.keywords}
                  onChange={(e) => handleInputChange('keywords', e.target.value)}
                  placeholder="Comma-separated relevant keywords"
                />
                <div className="help-text">
                  Separate with commas. Example: "web development, javascript, react"
                </div>
              </div>

              <div className="form-group">
                <label>URL Slug</label>
                <div className="slug-input-group">
                  <span className="slug-prefix">yoursite.com/</span>
                  <input
                    type="text"
                    value={seoData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    placeholder="url-slug"
                    className="slug-input"
                  />
                </div>
              </div>
            </div>

            <div className="seo-preview-section">
              <div className="section-header">
                <IconEye size={20} />
                <h4>Search Preview</h4>
              </div>
              
              <div className="search-preview">
                <div className="preview-title">
                  {preview.title || 'Your page title will appear here'}
                </div>
                <div className="preview-url">
                  {preview.url}
                </div>
                <div className="preview-description">
                  {preview.description || 'Your meta description will appear here. Make it compelling to encourage clicks.'}
                </div>
              </div>

              <div className="seo-tips">
                <h5>SEO Tips</h5>
                <ul>
                  <li>Include your focus keyword in the title and description</li>
                  <li>Write compelling descriptions that encourage clicks</li>
                  <li>Use descriptive, keyword-rich URLs</li>
                  <li>Keep titles between 50-60 characters</li>
                  <li>Keep descriptions between 120-160 characters</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button onClick={handleSave} className="btn-primary">
            Save SEO Settings
          </button>
        </div>
      </div>
    </div>
  );
};