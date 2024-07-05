import Jimp from 'jimp'
import sharp from 'sharp'

interface IaddTextToImage {
	text:string
	inputfile:string
	outputfile:string
}

export const addTextToImage = async ({text,inputfile,outputfile}:IaddTextToImage)=>{
	const image = await  Jimp.read(inputfile)
	const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK)

	image.print(
		font,
		10,
		10,
		{
			text,
			alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
			alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
		},
		image.bitmap.width,
		image.bitmap.height
	)

	const tempImagePath = 'temp_image_with_text.png';
	await image.writeAsync(tempImagePath);


	await sharp(tempImagePath)
		.toFile(outputfile);

	console.log('Image saved with text:', outputfile);
}
