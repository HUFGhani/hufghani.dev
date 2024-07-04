import Jimp from 'jimp'

interface createTextImage {
	text: string
	width: number
	height: number

}

interface addTextToImage {
	inputImagePath: string
	text: string
	fontSize: number
}

export const createTextImage = async ({text,width,height}: createTextImage): Promise<Buffer> => {
	const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK)
	const textImage = new Jimp(width, height,(err,image)=>{
		if (err) throw err
	})
	textImage.print(
		font,0,0,{
			text,
			alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
			alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
		},width, height
	)
	return textImage.getBufferAsync(Jimp.MIME_PNG);
}
export const addTextToImage = async ({inputImagePath, text, fontSize}: addTextToImage) => {

})
