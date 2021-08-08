import { Injectable, CanActivate, ExecutionContext, Inject, forwardRef } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { getSingleUser } from 'src/helperFunctions/utilities';
import { AuthService } from '../auth.service';
@Injectable()
export class AccessMe implements CanActivate {
    constructor(
        private reflector: Reflector,
        // @Inject(forwardRef(()=>AuthService))
        // private authService: AuthService
    ) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
        return false;
    }
    const request = context.switchToHttp().getRequest();
    return getSingleUser(request.user.userId).then(user => roles.includes(user.role))
  }
}
