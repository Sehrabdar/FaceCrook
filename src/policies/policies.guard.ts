import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles || !requiredRoles.includes('owner')) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const params = request.params;
    
    if (!user?.id) {
      throw new ForbiddenException('Authentication required');
    }
    if (params.id) {
      if (user.id !== params.id) {
        throw new ForbiddenException('Only account owner can delete profile');
      }
      return true;
    }
    if (params.postId) {
      return true; 
    }

    return true;
  }
}
