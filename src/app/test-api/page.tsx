'use client';

import React, { useRef } from 'react';

function Page() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = async () => {
    if (!fileInputRef.current || !fileInputRef.current.files) {
      console.error('No file selected');
      return;
    }

    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/lodgedata', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Success:', data.message);
      } else {
        console.error('Error:', data.error);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <div className='pt-14'>
      <h1 className='py-2'>Upload a File</h1>
      <input type="file" ref={fileInputRef} />
      <button onClick={handleUpload}>Submit</button>
    </div>
  );
}

export default Page;
