import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import type {
	ContextConfigDefault,
	FastifyReply,
	FastifyRequest,
	RawReplyDefaultExpression,
	RawRequestDefaultExpression,
	RawServerDefault,
} from 'fastify';
import type { RouteGenericInterface } from 'fastify/types/route';
import type { FastifySchema } from 'fastify/types/schema';

export type Request<TSchema extends FastifySchema> = FastifyRequest<
	RouteGenericInterface,
	RawServerDefault,
	RawRequestDefaultExpression<RawServerDefault>,
	TSchema,
	TypeBoxTypeProvider
>;

export type Reply<TSchema extends FastifySchema> = FastifyReply<
	RawServerDefault,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	RouteGenericInterface,
	ContextConfigDefault,
	TSchema,
	TypeBoxTypeProvider
>;
