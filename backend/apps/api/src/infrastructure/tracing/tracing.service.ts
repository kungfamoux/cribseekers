import { Injectable, Scope } from '@nestjs/common';
import { trace, Span, SpanStatusCode, context, Context } from '@opentelemetry/api';

@Injectable({ scope: Scope.TRANSIENT })
export class TracingService {
  private tracer = trace.getTracer('cribseekers-api');

  startSpan(name: string, parentContext?: Context): Span {
    return this.tracer.startSpan(name, {}, parentContext);
  }

  async withSpan<T>(
    name: string,
    fn: (span: Span) => Promise<T>,
    parentContext?: Context,
  ): Promise<T> {
    const span = this.startSpan(name, parentContext);
    
    try {
      const result = await fn(span);
      span.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (error) {
      span.recordException(error as Error);
      span.setStatus({ code: SpanStatusCode.ERROR, message: (error as Error).message });
      throw error;
    } finally {
      span.end();
    }
  }

  setSpanAttributes(span: Span, attributes: Record<string, any>): void {
    Object.entries(attributes).forEach(([key, value]) => {
      span.setAttribute(key, value);
    });
  }

  addSpanEvent(span: Span, name: string, attributes?: Record<string, any>): void {
    span.addEvent(name, attributes);
  }

  getCurrentSpan(): Span | undefined {
    return trace.getSpan(context.active());
  }

  setSpanError(span: Span, error: Error): void {
    span.recordException(error);
    span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
  }
}
