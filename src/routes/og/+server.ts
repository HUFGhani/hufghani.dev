import type { RequestHandler } from "@sveltejs/kit"
import { addTextToImage } from '$lib/openGraphImage/ogImage'

export const GET: RequestHandler = async ({url}) =>{
    const title = url.searchParams.get("title")

    // @ts-ignore
    await addTextToImage({ inputfile: './test.png', outputfile: './testa.png', text: title })

    return new Response( title)
}