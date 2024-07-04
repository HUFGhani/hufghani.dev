import type { RequestHandler } from "@sveltejs/kit"

export const GET: RequestHandler = async ({url}) =>{
    const title = url.searchParams.get("title")

    return new Response( title)
}