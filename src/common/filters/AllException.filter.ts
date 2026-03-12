import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { SYSTEM_MESSAGES } from '../constants/system-messages';
import { CombinedLogger } from '../logger/combined.logger';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: CombinedLogger,
  ) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const { method, url, ip } = ctx.getRequest();
    const response = ctx.getResponse();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Handle validation errors specially
    let message = exception.message || SYSTEM_MESSAGES.INTERNAL_SERVER_ERROR;
    let errors = undefined;

    if (exception instanceof BadRequestException) {
      const exceptionResponse = exception.getResponse();

      // Check if it's a validation error
      if (
        typeof exceptionResponse === 'object' &&
        'message' in exceptionResponse
      ) {
        const response = exceptionResponse as any;
        message = response.error || 'Validation failed';
        errors = Array.isArray(response.message)
          ? response.message
          : [response.message];
      }
    }

    const responseBody = {
      success: false,
      statusCode: httpStatus,
      message,
      ...((errors && { errors }) as unknown as Record<string, any>), // Include validation errors if present
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    this.logger.error(
      `${method} ${url} - ${httpStatus} - ${ip}\nResponse: ${JSON.stringify(responseBody)}`,
      exception.stack || '',
      AllExceptionsFilter.name,
    );

    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
