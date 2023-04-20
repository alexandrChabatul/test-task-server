import AdminDto from '../../dto/AdminDto';

export type AuthResponse = {
  accessToken: string;
  admin: AdminDto;
};
