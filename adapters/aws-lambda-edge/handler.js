import { installPolyfills } from '@sveltejs/kit/node/polyfills';
import { Server } from './index.js';
import { appPath, domainName, manifest, staticAssets } from './manifest.js';

installPolyfills();

const server = new Server(manifest);
const initialization = server.init({
	env: Object.fromEntries(Object.entries(process.env).map(([key, value]) => [key, value ?? '']))
});

const forbiddenHeaders = new Set([
	'connection',
	'content-length',
	'expect',
	'host',
	'keep-alive',
	'proxy-authenticate',
	'proxy-authorization',
	'proxy-connection',
	'trailer',
	'transfer-encoding',
	'upgrade',
	'x-accel-buffering',
	'x-accel-charset',
	'x-accel-limit-rate',
	'x-accel-redirect',
	'x-amz-cf-*',
	'x-amzn-auth',
	'x-amzn-cf-billing',
	'x-amzn-cf-id',
	'x-amzn-cf-xff',
	'x-amzn-errortype',
	'x-amzn-fle-profile',
	'x-amzn-header-count',
	'x-amzn-header-order',
	'x-amzn-lambda-integration-tag',
	'x-amzn-requestid',
	'x-cache',
	'x-edge-*',
	'x-forwarded-proto',
	'x-real-ip',
	'via'
]);

function getAssetPath(method, pathname) {
	if (method !== 'GET' && method !== 'HEAD') return '';

	if (pathname.startsWith(`${appPath}/`) || staticAssets.has(pathname)) {
		return pathname;
	}

	const indexPath = `${pathname}index.html`;
	if (pathname.endsWith('/') && staticAssets.has(indexPath)) {
		return indexPath;
	}

	const htmlPath = `${pathname}.html`;
	if (staticAssets.has(htmlPath)) {
		return htmlPath;
	}

	return '';
}

function getRequestHeaders(headers) {
	return Object.values(headers).flatMap((values) => values.map(({ key, value }) => [key, value]));
}

function getResponseHeaders(headers) {
	const responseHeaders = {};

	headers.forEach((value, key) => {
		const lowerCaseKey = key.toLowerCase();
		if (
			forbiddenHeaders.has(lowerCaseKey) ||
			lowerCaseKey.startsWith('x-amz-cf-') ||
			lowerCaseKey.startsWith('x-edge-')
		) {
			return;
		}

		if (lowerCaseKey === 'set-cookie') {
			responseHeaders[lowerCaseKey] = headers
				.getSetCookie()
				.map((cookie) => ({ key, value: cookie }));
			return;
		}

		responseHeaders[lowerCaseKey] = [{ key, value }];
	});

	return responseHeaders;
}

export async function handler(event) {
	const cf = event.Records?.[0]?.cf;
	if (!cf) {
		throw new Error('Expected a CloudFront origin-request event');
	}

	const { request, config } = cf;
	const { uri: pathname, querystring, method, clientIp } = request;
	const assetPath = getAssetPath(method, pathname);

	if (assetPath) {
		request.uri = assetPath;
		return request;
	}

	const hasBody = method !== 'GET' && method !== 'HEAD';
	if (hasBody && request.body?.inputTruncated) {
		return { status: '413' };
	}

	const body = hasBody
		? request.body?.encoding === 'base64'
			? Buffer.from(request.body.data ?? '', 'base64')
			: request.body?.data
		: undefined;
	const headers = getRequestHeaders(request.headers);
	const origin = `https://${domainName || config.distributionDomainName}`;
	const url = `${origin}${pathname}${querystring ? `?${querystring}` : ''}`;

	await initialization;

	const response = await server.respond(
		new Request(url, {
			method,
			headers,
			...(body === undefined ? {} : { body })
		}),
		{ getClientAddress: () => clientIp }
	);

	const responseBase = {
		status: response.status.toString(),
		headers: getResponseHeaders(response.headers)
	};

	if (response.status === 204 || method === 'HEAD') {
		return responseBase;
	}

	return {
		...responseBase,
		body: await response.text()
	};
}
