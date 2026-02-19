import sharp from "sharp";

/**
 * Utility class to handling image processing
 */
export class Editor {
  static async optimized(
    buffer: ArrayBuffer,
  ): Promise<Buffer<ArrayBufferLike>> {
    return await sharp(buffer)
      .webp({
        quality: 70,
      })
      .toBuffer();
  }
}
