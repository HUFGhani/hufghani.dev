export const csr = true;
export async function load({ fetch }) {
	const res = await fetch('/api/repositories', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		}
});
	const {
		data: { viewer }
	} = await res.json();
	return { viewer };
}
