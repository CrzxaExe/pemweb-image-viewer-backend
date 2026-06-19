import sharp from "sharp";

/**
 * Utility class to handling image processing
 */
export class Editor {
  /**
   * Optimazed image buffer
   * @param buffer image buffer
   * @returns image buffer with optimized to webp
   */
  static async optimized(
    buffer: ArrayBuffer,
  ): Promise<Buffer<ArrayBufferLike>> {
    return await sharp(buffer)
      .withMetadata()
      .webp({
        quality: 80,
      })
      .toBuffer();
  }
}
