'use client';
import { useState } from 'react';
import { img } from '@/lib/site';

export default function Gallery({ images = [], name, icon }) {
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="gallery-main">
        {images[i] ? (
          <img src={img(images[i], 1000)} alt={name} />
        ) : (
          <div className="no-photo" aria-hidden>{icon}</div>
        )}
      </div>
      {images.length > 1 && (
        <div className="thumbs">
          {images.map((src, n) => (
            <button key={src} className={n === i ? 'on' : ''} onClick={() => setI(n)} aria-label={`Photo ${n + 1}`}>
              <img src={img(src, 160)} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
