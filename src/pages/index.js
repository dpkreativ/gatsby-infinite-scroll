import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

export default function Home() {
  // === CLOUDINARY MEDIA ===
  // Get images from Cloudinary with Gatsby's useStaticQuery hook
  const data = useStaticQuery(graphql`
    query CloudinaryImages {
      allCloudinaryMedia {
        edges {
          node {
            public_id
            secure_url
          }
        }
      }
    }
  `);

  const cldImages = data.allCloudinaryMedia.edges;

  console.log(cldImages);

  return (
    <div style={{ width: '100%', maxWidth: '425px', margin: '0 auto' }}>
      <h1>Home</h1>
    </div>
  );
}
