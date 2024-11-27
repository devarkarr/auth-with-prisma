import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_TYPE } from 'src/auth/enums/auth.enum';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { AUTH_KEY_TYPE } from 'src/auth/constants';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AUTH_TYPE.Bearer;

  private readonly authTypeGuardMap: Record<
    AUTH_TYPE,
    CanActivate | CanActivate[]
  > = {
    [AUTH_TYPE.Bearer]: this.accessTokenGuard,
    [AUTH_TYPE.None]: { canActivate: () => true },
  };

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes = this.reflector.getAllAndOverride<AUTH_TYPE[]>(
      AUTH_KEY_TYPE,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthenticationGuard.defaultAuthType];

    const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();
    // Declare the default error
    let error = new UnauthorizedException();

    for (const instance of guards) {
      // Decalre a new constant
      const canActivate = await Promise.resolve(
        // Here the AccessToken Guard Will be fired and check if user has permissions to acces
        // Later Multiple AuthTypes can be used even if one of them returns true
        // The user is Authorised to access the resource
        instance.canActivate(context),
      ).catch((err) => {
        error = err;
      });

      if (canActivate) {
        return true;
      }
    }

    throw error;
  }
}
