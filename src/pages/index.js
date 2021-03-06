import { graphql, useStaticQuery } from 'gatsby';
import React, { useEffect, useState } from 'react';
import Image from '../components/Image';

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

  // === INFINITE SCROLL LOGIC ===
  // Incrementally increase the number of images to display while scrolling
  const [imagesList, setImagesList] = useState([]);
  const [limit, setLimit] = useState(4);

  const start = imagesList.length;

  function newLimit() {
    const blip = cldImages.length - start;
    if (blip > 5) {
      setLimit(limit + 5);
    } else {
      setLimit(limit + blip);
    }
  }

  useEffect(() => {
    const temp = [];
    for (let i = limit; i >= start; i--) {
      temp.push(cldImages[i]);
    }
    setImagesList((prev) => [...prev, ...temp]);
  }, [cldImages, limit, start]);

  return (
    <div style={{ width: '100%', maxWidth: '425px', margin: '0 auto' }}>
      <h1>Home</h1>

      <section style={{ display: 'grid', gap: '2rem' }}>
        {imagesList &&
          imagesList.map((imageNode, index) => (
            <Image
              key={`${index}-cld`}
              image={imageNode}
              isLast={index === imagesList.length - 1}
              newLimit={newLimit}
            />
          ))}
      </section>
    </div>
  );
}
