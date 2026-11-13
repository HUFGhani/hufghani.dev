import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';

const require = createRequire(import.meta.url);
const { handler } = require('../../build/edge/server.js');

function createEvent({ uri, method = 'GET', querystring = '', body } = {}) {
	const request = {
		uri,
		method,
		querystring,
		clientIp: '203.0.113.1',
		headers: {
			host: [{ key: 'Host', value: 'hufghani.dev' }]
		},
		...(body ? { body } : {})
	};

	return {
		Records: [
			{
				cf: {
					config: { distributionDomainName: 'example.cloudfront.net' },
					request
				}
			}
		]
	};
}

test('routes static files to the S3 origin', async () => {
	const event = createEvent({ uri: '/favicon.ico' });
	const result = await handler(event);

	assert.equal(result.uri, '/favicon.ico');
});

test('maps prerendered directory requests to index.html', async () => {
	const result = await handler(createEvent({ uri: '/' }));

	assert.equal(result.uri, '/index.html');
});

test('renders non-static requests through SvelteKit', async () => {
	const result = await handler(createEvent({ uri: '/__adapter_test_missing_route__' }));

	assert.equal(result.status, '404');
	assert.ok(result.body);
});

test('rejects request bodies truncated by CloudFront', async () => {
	const result = await handler(
		createEvent({
			uri: '/api/repositories',
			method: 'POST',
			body: { inputTruncated: true, encoding: 'base64', data: '' }
		})
	);

	assert.equal(result.status, '413');
});
