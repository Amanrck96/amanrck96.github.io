'use client'

import { useState } from 'react';
import { storage, db } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ProfileImage } from '@/components/sections/profile-image';
import { profile } from '@/lib/data';

export function ProfilePhotoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const handleUpload = async () => {
    if (!file) {
      toast({ title: 'No file selected', description: 'Please choose an image to upload.' });
      return;
    }
    try {
      const path = `profile/${Date.now()}_${file.name}`;
      const bucketRef = ref(storage, path);
      await uploadBytes(bucketRef, file, { contentType: file.type });
      const url = await getDownloadURL(bucketRef);
      await setDoc(doc(db, 'site', 'profile'), { profilePicUrl: url, updatedAt: Date.now() }, { merge: true });
      toast({ title: 'Profile photo updated', description: 'Your new photo is live.' });
      setFile(null);
      setPreview(null);
    } catch (err: any) {
      toast({ title: 'Upload failed', description: err?.message ?? 'Unknown error', variant: 'destructive' });
    }
  };

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Update Profile Photo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-6">
          <div className="relative h-24 w-24">
            {preview ? (
              // local preview
              <img src={preview} alt="Preview" className="rounded-full object-cover h-24 w-24" />
            ) : (
              <ProfileImage
                alt={profile.name}
                fallbackSrc={profile.profilePic}
                width={96}
                height={96}
                className="rounded-full object-cover h-24 w-24"
              />
            )}
          </div>
          <div className="space-y-2">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <div className="flex gap-2">
              <Button onClick={handleUpload} disabled={!file}>Upload</Button>
              {preview && (
                <Button variant="ghost" onClick={() => { setFile(null); setPreview(null); }}>Clear</Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

