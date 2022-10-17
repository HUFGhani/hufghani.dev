import { randomBytes } from 'crypto'

export class EnvUtil {
	values: Record<string, string>
	headers: Record<string, string>

	constructor(env: Record<string, string>) {
		this.values = env
		this.headers = Object.fromEntries(
			Object.keys(env).map(k => [k, `x-env-${randomBytes(9).toString('hex')}`])
		)
	}

	mappingJSON = () => {
		return JSON.stringify(Object.fromEntries(Object.entries(this.headers).map(([k, v]) => [v, k])))
	}

	customHeaders = () => {
		return Object.fromEntries(Object.entries(this.values).map(([k, v]) => [this.headers[k], v]))
	}
}
