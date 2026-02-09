import { ProfilePhotoUpload } from '@/components/sections/profile-photo-upload';

export const metadata = {
  title: 'Admin | Profile Photo',
  description: 'Upload and update the profile photo',
};

export default function ProfilePhotoAdminPage() {
  return (
    <div className="container mx-auto py-20 md:py-32">
      <ProfilePhotoUpload />
    </div>
  );
}
