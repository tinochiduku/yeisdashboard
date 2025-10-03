'use client'
import { RichTextEditor } from "@/components/slate/RichTextEditor";

export default function Page() {

    const handleSave = (content: any, seoHtml: string) => {
    console.log('Content for DB:', content);
    console.log('SEO HTML:', seoHtml);
    
    // Send to your backend
    // fetch('/api/content', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ content, seoHtml }),
    // });
  };


    return (
        <div className="app">
            <RichTextEditor onSave={handleSave} />
        </div>
    )
}