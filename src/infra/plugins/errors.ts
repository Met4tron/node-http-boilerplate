import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { HTTPError } from '~modules/common/errors/assertError';

export const errorHandler = (
	error: FastifyError | Error,
	req: FastifyRequest,
	reply: FastifyReply,
) => {
	const errorObj = {
		success: false,
		data: error.message ?? '',
	};

	if (error instanceof HTTPError) {
		errorObj.data = error.message;
		reply.status(+error.code).send(errorObj);
		return errorObj.data;
	}

	reply.status(500).send(errorObj);

	return errorObj.data;
};
