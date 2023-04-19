import UserDto from "src/dto/UserDto";

export type AuthResponse = {
  accessToken: string;
  user: UserDto;
};