'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function SwaggerPage() {
  return (
    <section className='h-screen overflow-y-scroll p-4'>
      <SwaggerUI url='/api/doc' />
    </section>
  );
}
