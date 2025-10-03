// plugins/withImages.ts
import { Editor, Transforms } from 'slate';
import { ImageElement } from '../types';

export const withImages = (editor: Editor) => {
  const { isVoid, insertData } = editor;

  editor.isVoid = (element) => {
    return element.type === 'image' ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        if (file.type.startsWith('image/')) {
          handleImageUpload(editor, file);
          return;
        }
      }
    }

    insertData(data);
  };

  return editor;
};

const handleImageUpload = (editor: Editor, file: File) => {
  if (file.size > 5 * 1024 * 1024) {
    alert('Image size must be less than 5MB');
    return;
  }

  const reader = new FileReader();
  reader.addEventListener('load', () => {
    const url = reader.result as string;
    insertImage(editor, url, file.name);
  });
  reader.readAsDataURL(file);
};

export const insertImage = (editor: Editor, url: string, alt?: string) => {
  const text = { text: '' };
  const image: ImageElement = {
    type: 'image',
    url,
    alt,
    caption: '',
    children: [text],
  };
  Transforms.insertNodes(editor, image);
};