// serializer.ts
import { Descendant } from 'slate';
import { SEOElement } from './types';

export const serializeToSEOHTML = (content: Descendant[]): string => {
  let seoTitle = '';
  let seoDescription = '';
  let seoKeywords: string[] = [];
  let seoSlug = '';
  let focusKeyword = '';

  // Extract SEO data and serialize content
  const serializedContent = content.map(node => {
    if (isSEOElement(node)) {
      seoTitle = node.title || '';
      seoDescription = node.description || '';
      seoKeywords = node.keywords || [];
      seoSlug = node.slug || '';
      focusKeyword = node.focusKeyword || '';
      return ''; // Don't include SEO meta in visible content
    }
    return serializeNode(node);
  }).join('');

  // Generate canonical URL
  const canonicalUrl = seoSlug 
    ? `https://yoursite.com/${seoSlug}`
    : 'https://yoursite.com/';

  // Generate JSON-LD structured data
  const structuredData = generateStructuredData(seoTitle, seoDescription, serializedContent);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${escapeHTML(seoTitle)}</title>
      <meta name="description" content="${escapeHTML(seoDescription)}">
      <meta name="keywords" content="${escapeHTML(seoKeywords.join(', '))}">
      <meta name="robots" content="index, follow">
      <link rel="canonical" href="${canonicalUrl}">
      
      <!-- Open Graph -->
      <meta property="og:title" content="${escapeHTML(seoTitle)}">
      <meta property="og:description" content="${escapeHTML(seoDescription)}">
      <meta property="og:type" content="article">
      <meta property="og:url" content="${canonicalUrl}">
      
      <!-- Twitter Card -->
      <meta name="twitter:card" content="summary">
      <meta name="twitter:title" content="${escapeHTML(seoTitle)}">
      <meta name="twitter:description" content="${escapeHTML(seoDescription)}">
      
      <!-- Structured Data -->
      <script type="application/ld+json">
        ${JSON.stringify(structuredData)}
      </script>
      
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          line-height: 1.6; 
          max-width: 800px; 
          margin: 0 auto; 
          padding: 20px; 
          color: #333;
        }
        h1, h2, h3 { 
          color: #2c3e50; 
          margin-top: 1.5em; 
          margin-bottom: 0.5em;
        }
        h1 { font-size: 2em; border-bottom: 2px solid #3498db; padding-bottom: 0.3em; }
        h2 { font-size: 1.5em; }
        h3 { font-size: 1.25em; }
        img { 
          max-width: 100%; 
          height: auto; 
          display: block;
          margin: 1em auto;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        blockquote { 
          border-left: 4px solid #3498db; 
          margin: 1em 0; 
          padding-left: 1em; 
          color: #7f8c8d;
          font-style: italic;
        }
        code { 
          background: #f8f9fa; 
          padding: 2px 6px; 
          border-radius: 4px; 
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 0.9em;
        }
        pre { 
          background: #f8f9fa; 
          padding: 1em; 
          overflow-x: auto;
          border-radius: 8px;
          border: 1px solid #e9ecef;
        }
        pre code { background: none; padding: 0; }
        a { 
          color: #3498db; 
          text-decoration: none; 
          transition: color 0.2s;
        }
        a:hover { color: #2980b9; text-decoration: underline; }
        ul, ol { padding-left: 2em; }
        li { margin: 0.5em 0; }
        .image-caption {
          text-align: center;
          font-style: italic;
          color: #7f8c8d;
          margin-top: 0.5em;
          font-size: 0.9em;
        }
      </style>
    </head>
    <body>
      <article>
        ${serializedContent}
      </article>
    </body>
    </html>
  `.trim();
};

const generateStructuredData = (title: string, description: string, content: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "articleBody": stripHTMLTags(content).slice(0, 5000), // Limit content length
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": "Your Site Name"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Your Site Name",
      "logo": {
        "@type": "ImageObject",
        "url": "https://yoursite.com/logo.png"
      }
    }
  };
};

const stripHTMLTags = (html: string): string => {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
};

const serializeNode = (node: any): string => {
  if ('text' in node) {
    let text = escapeHTML(node.text);
    
    if (node.bold) text = `<strong>${text}</strong>`;
    if (node.italic) text = `<em>${text}</em>`;
    if (node.underline) text = `<u>${text}</u>`;
    if (node.code) text = `<code>${text}</code>`;
    
    return text;
  }

  const children = node.children.map((n: any) => serializeNode(n)).join('');

  switch (node.type) {
    case 'heading-one':
      return `<h1>${children}</h1>`;
    case 'heading-two':
      return `<h2>${children}</h2>`;
    case 'heading-three':
      return `<h3>${children}</h3>`;
    case 'paragraph':
      return `<p>${children}</p>`;
    case 'block-quote':
      return `<blockquote>${children}</blockquote>`;
    case 'bulleted-list':
      return `<ul>${children}</ul>`;
    case 'numbered-list':
      return `<ol>${children}</ol>`;
    case 'list-item':
      return `<li>${children}</li>`;
    case 'link':
      return `<a href="${node.url}" title="${node.title || ''}" rel="${node.rel || 'noopener noreferrer'}">${children}</a>`;
    case 'image':
      return `<figure>
        <img src="${node.url}" alt="${node.alt || ''}" loading="lazy" />
        ${node.caption ? `<figcaption>${escapeHTML(node.caption)}</figcaption>` : ''}
      </figure>`;
    default:
      return `<p>${children}</p>`;
  }
};

const isSEOElement = (node: any): node is SEOElement => {
  return node.type === 'seo-meta';
};

const escapeHTML = (text: string): string => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};