// types.ts
export interface CustomElement {
  type: string;
  children: CustomText[];
  [key: string]: any;
}

export interface CustomText {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  [key: string]: boolean | string | undefined;
}

export interface ImageElement {
  type: 'image';
  url: string;
  alt?: string;
  caption?: string;
  children: [{ text: string }];
}

export interface LinkElement {
  type: 'link';
  url: string;
  title?: string;
  rel?: string;
  children: CustomText[];
}

export interface SEOElement {
  type: 'seo-meta';
  title?: string;
  description?: string;
  keywords?: string[];
  children: [{ text: string }];
}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement | ImageElement | LinkElement | SEOElement;
    Text: CustomText;
  }
}