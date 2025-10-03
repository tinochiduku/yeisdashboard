// Element.tsx
import React from 'react';
import { useSelected, useFocused } from 'slate-react';
import { ImageElement, LinkElement } from './types';

export const Element: React.FC<any> = ({ attributes, children, element }) => {
  const style = { textAlign: element.align };

  switch (element.type) {
    case 'heading-one':
      return (
        <h1 {...attributes} style={style}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 {...attributes} style={style}>
          {children}
        </h2>
      );
    case 'heading-three':
      return (
        <h3 {...attributes} style={style}>
          {children}
        </h3>
      );
    case 'block-quote':
      return (
        <blockquote {...attributes} style={style}>
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul {...attributes} style={style}>
          {children}
        </ul>
      );
    case 'numbered-list':
      return (
        <ol {...attributes} style={style}>
          {children}
        </ol>
      );
    case 'list-item':
      return (
        <li {...attributes} style={style}>
          {children}
        </li>
      );
    case 'link':
      return (
        <LinkComponent element={element} attributes={attributes}>
          {children}
        </LinkComponent>
      );
    case 'image':
      return (
        <ImageComponent element={element} attributes={attributes}>
          {children}
        </ImageComponent>
      );
    case 'seo-meta':
      return null; // SEO elements are not rendered in editor
    default:
      return (
        <p {...attributes} style={style}>
          {children}
        </p>
      );
  }
};

const LinkComponent: React.FC<{ element: LinkElement; attributes: any; children: any }> = ({
  element,
  attributes,
  children
}) => {
  return (
    <a
      {...attributes}
      href={element.url}
      title={element.title}
      rel={element.rel || 'noopener noreferrer'}
      target="_blank"
    >
      {children}
    </a>
  );
};

const ImageComponent: React.FC<{ element: ImageElement; attributes: any; children: any }> = ({
  element,
  attributes,
  children
}) => {
  const selected = useSelected();
  const focused = useFocused();
  
  return (
    <div {...attributes}>
      {children}
      <div
        contentEditable={false}
        className={`image-container ${selected && focused ? 'selected' : ''}`}
      >
        <img
          src={element.url}
          alt={element.alt || ''}
          className="editor-image"
        />
        {element.caption && (
          <div className="image-caption">{element.caption}</div>
        )}
      </div>
    </div>
  );
};