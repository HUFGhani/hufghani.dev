export async function load({ fetch }) {
	const res = await fetch('/api/repositories');
	const {
		data: { viewer }
	} = await res.json();
	return { viewer };
}
