'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

type Props = {
  alt: string;
  fallbackSrc: string;
  className?: string;
  width: number;
  height: number;
};

export function ProfileImage({ alt, fallbackSrc, className, width, height }: Props) {
  const [src, setSrc] = useState<string>(fallbackSrc);

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, 'site', 'profile'));
        const url = snap.exists() ? (snap.data() as any).profilePicUrl : undefined;
        if (url) setSrc(url);
      } catch (e) {
        // silently fallback
      }
    };
    load();
  }, []);

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}

