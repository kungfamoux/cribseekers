import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AgentGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if (!user || !user.roles) {
      return false;
    }
    
    return user.roles.includes('AGENT');
  }
}
