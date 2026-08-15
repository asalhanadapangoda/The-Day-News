import React, { lazy, Suspense } from 'react';
import 'react-quill/dist/quill.snow.css';
import './quill-custom.css';

const ReactQuill = lazy(() => import('react-quill'));

export default function LazyQuill(props) {
  return (
    <Suspense fallback={<div className="h-[200px] w-full bg-[#1A1A1A] rounded-b-lg border border-[#333333] animate-pulse flex items-center justify-center text-gray-500 text-sm">Loading Editor...</div>}>
      <ReactQuill {...props} />
    </Suspense>
  );
}
