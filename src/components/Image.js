import React from 'react';

export default function Image({ image }) {
  return (
    <div style={{ width: '100%', maxWidth: '425px', height: '425px' }}>
      <img
        src={image.node.secure_url}
        alt={image.node.public_url}
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      />
    </div>
  );
}
