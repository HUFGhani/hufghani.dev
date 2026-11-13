/* eslint-disable @typescript-eslint/no-unused-vars */
function handler(event) {
	var domainName = 'hufghani.dev';
	var request = event.request;
	var host = request.headers.host;
	var uri = request.uri;
	var querystring = request.querystring;

	if (!host) {
		return { statusCode: 400 };
	}

	var keys = Object.keys(querystring);

	if (host.value === domainName) {
		request.querystring = {};
		request.headers['x-forwarded-host'] = { value: host.value };
		keys.forEach(function (key) {
			request.querystring[encodeURIComponent(key)] = querystring[key];
		});
		return request;
	}

	var search = '';
	keys.forEach(function (key) {
		var parameter = querystring[key];
		var values = [parameter.value];

		if (parameter.multiValue) {
			parameter.multiValue.forEach(function (value) {
				values.push(value);
			});
		}

		values.forEach(function (value) {
			search += (search ? '&' : '?') + key + '=' + value;
		});
	});

	return {
		statusCode: 308,
		headers: {
			location: {
				value: 'https://' + domainName + uri + search
			}
		}
	};
}
