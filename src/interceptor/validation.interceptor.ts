import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    BadRequestException,
  } from '@nestjs/common';
  import { Observable, throwError } from 'rxjs';
  import { catchError, tap } from 'rxjs/operators';
  import { Request, Response } from 'express';

  // Handles validation and proper error message at API level
  @Injectable()
  export class ValidationInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const req = context.switchToHttp().getRequest<Request>();
      const res = context.switchToHttp().getResponse<Response>();
  
      // Log Incoming Request
      console.log(`\n[REQUEST] ${req.method} ${req.url}`);
      console.log('Body:', JSON.stringify(req.body, null, 2));
      console.log('Query:', JSON.stringify(req.query, null, 2));
      console.log('Params:', JSON.stringify(req.params, null, 2));
  
      return next.handle().pipe(
        tap((data) => {
          // Log Outgoing Response
          console.log(`\n[RESPONSE] ${req.method} ${req.url}`);
          console.log('Status Code:', res.statusCode);
          console.log('Response Body:', JSON.stringify(data, null, 2));
        }),
        catchError((err) => {
          if (err instanceof BadRequestException) {
            const response = err.getResponse();
            console.error(`\n[ERROR] ${req.method} ${req.url}`);
            console.error('Status Code:', res.statusCode);
            console.error('Error Response:', JSON.stringify(response, null, 2));
            return throwError(() => new BadRequestException(response));
          }
          return throwError(() => err);
        }),
      );
    }
  }
  