export interface UserProfile {
  _id?: string;
  firebaseUid: string;
  name?: string;
  email: string;
  role: 'superadmin' | 'admin' | 'user';
  status: 'pending' | 'approved' | 'rejected';
  createdAt?: string;
  updatedAt?: string;
}
