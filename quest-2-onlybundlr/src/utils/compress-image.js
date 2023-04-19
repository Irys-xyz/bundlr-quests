import pica from "pica";

/**
 * Utility function to compress images before uploading.
 * Written with lots of help from Professor ChatGPT.
 *
 * @param {*} The file to be compressed
 * @param {*} The max width (in pixels) of the resized image
 * @returns
 */
export const compressImage = async (file, maxSize) => {
	const image = new Image();
	image.src = URL.createObjectURL(file);

	return new Promise((resolve, reject) => {
		image.onload = async () => {
			const canvas = document.createElement("canvas");
			const width = image.width;
			const height = image.height;

			if (width > maxSize || height > maxSize) {
				const scale = Math.min(maxSize / width, maxSize / height);
				canvas.width = width * scale;
				canvas.height = height * scale;
			} else {
				canvas.width = width;
				canvas.height = height;
			}

			const picaInstance = pica();
			const result = await picaInstance.resize(image, canvas);

			result.toBlob(async (blob) => {
				const compressedFile = new File([blob], file.name, {
					type: file.type,
					lastModified: Date.now(),
				});
				resolve(compressedFile);
			}, file.type);
		};

		image.onerror = () => {
			reject(new Error("Failed to load image"));
		};
	});
};
