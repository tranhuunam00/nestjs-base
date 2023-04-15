import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

@Injectable()
export class ResponseConfigInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { statusCode } = context.switchToHttp().getResponse()
    return next.handle().pipe(
      map(data => {
        return {
          success: true,
          message: 'Request successful',
          data,
          statusCode,
        }
      }),
      catchError(error => {
        return throwError(
          new HttpException(
            {
              message: error.response ? error.response.message : error.message,
              success: false,
            },
            error.getStatus ? error.getStatus() : 500
          )
        )
      })
    )
  }
}
