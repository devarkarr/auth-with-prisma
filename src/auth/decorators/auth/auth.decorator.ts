import { SetMetadata } from '@nestjs/common';
import { AUTH_KEY_TYPE } from 'src/auth/constants';
import { AUTH_TYPE } from 'src/auth/enums/auth.enum';

export const Auth = (...authTypes: AUTH_TYPE[]) =>
  SetMetadata(AUTH_KEY_TYPE, authTypes);
