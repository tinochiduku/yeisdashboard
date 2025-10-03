// utils.ts
import { Editor, Element, Transforms, Text, Range } from 'slate';
import { CustomElement, CustomText } from './types';

export const isMarkActive = (editor: Editor, format: keyof Omit<CustomText, 'text'>) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor: Editor, format: keyof Omit<CustomText, 'text'>) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isBlockActive = (editor: Editor, format: string) => {
  const [match] = Editor.nodes(editor, {
    match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === format,
  });

  return !!match;
};

export const toggleBlock = (editor: Editor, format: string) => {
  const isActive = isBlockActive(editor, format);
  const isList = ['numbered-list', 'bulleted-list'].includes(format);

  Transforms.unwrapNodes(editor, {
    match: n => !Editor.isEditor(n) && Element.isElement(n) && 
      ['numbered-list', 'bulleted-list'].includes(n.type),
    split: true,
  });

  let newProperties: Partial<CustomElement>;
  
  if (isActive) {
    newProperties = { type: 'paragraph' };
  } else if (isList) {
    newProperties = { type: 'list-item' };
  } else {
    newProperties = { type: format };
  }

  Transforms.setNodes<Element>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const insertImage = (editor: Editor, file: File) => {
  if (file.size > 5 * 1024 * 1024) {
    alert('Image size must be less than 5MB');
    return;
  }

  const reader = new FileReader();
  reader.addEventListener('load', () => {
    const url = reader.result as string;
    insertImageElement(editor, url, file.name);
  });
  reader.readAsDataURL(file);
};

export const insertImageElement = (editor: Editor, url: string, alt?: string) => {
  const image: ImageElement = {
    type: 'image',
    url,
    alt: alt || '',
    caption: '',
    children: [{ text: '' }],
  };
  
  Transforms.insertNodes(editor, image);
  
  // Add a new paragraph after the image for better UX
  Transforms.insertNodes(editor, {
    type: 'paragraph',
    children: [{ text: '' }],
  });
};

export const isImageElement = (node: Node): node is ImageElement => {
  return !Editor.isEditor(node) && Element.isElement(node) && node.type === 'image';
};

// Link-related functions
export const insertLink = (editor: Editor, url: string) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

const wrapLink = (editor: Editor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link: any = {
    type: 'link',
    url,
    title: url,
    rel: 'noopener noreferrer',
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

export const isLinkActive = (editor: Editor) => {
  const [link] = Editor.nodes(editor, {
    match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
  });
  return !!link;
};

export const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
  });
};

export const updateLink = (editor: Editor, url: string, title?: string) => {
  if (editor.selection) {
    Transforms.setNodes(editor, 
      { url, title: title || url }, 
      { match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link' }
    );
  }
};