import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'; // Import the Public metadata key

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true; 
    }

    let req;

    const contextType = context.getType<GqlContextType>();

    if (contextType === 'http') {
      req = context.switchToHttp().getRequest(); 
    } 
    else if (contextType === 'graphql') {
      req = GqlExecutionContext.create(context).getContext().req;
    } 
    else {
      throw new UnauthorizedException('Unsupported request type');
    }

//     if (!req) {
//       console.error('[AuthGuard] Request object is undefined.');
//       throw new UnauthorizedException('Request is undefined');
//     }

//     let token = req.cookies?.admin_access_token || req.cookies?.super_admin_access_token;

//     if (!token) {
//       const authHeader = req.headers?.Authorization;
//       if (authHeader?.startsWith('Bearer ')) {
//         token = authHeader.split(' ')[1]; 
//       }
//     }
// console.log(token, "token")
//     if (!token) {
//       console.warn('[AuthGuard] No authentication token found.');
//       throw new UnauthorizedException('Authentication required');
//     }
//     console.log(token, "token")

    try {
      // const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      // req['user'] = decoded; 
      return true;
    } catch (err) {
      console.error('[AuthGuard] Token verification failed:', err.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
