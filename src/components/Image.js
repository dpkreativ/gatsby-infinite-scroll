import React, { useEffect, useRef } from 'react';

export default function Image({ image, isLast, newLimit }) {
  const imageRef = useRef();

  useEffect(() => {
    if (!imageRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        newLimit();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(imageRef.current);
  }, [isLast]);

  return (
    <div style={{ width: '100%', maxWidth: '425px', height: '425px' }}>
      <img
        ref={imageRef}
        src={image.node.secure_url}
        alt={image.node.public_url}
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      />
    </div>
  );
}
