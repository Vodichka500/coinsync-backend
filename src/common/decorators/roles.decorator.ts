// src/auth/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: Array<'USER' | 'ADMIN'>) =>
  SetMetadata('roles', roles);
