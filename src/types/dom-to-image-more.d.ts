declare module 'dom-to-image-more' {
  export interface DomToImageOptions {
    /** The quality of the image, between 0 and 1 */
    quality?: number;
    /** A string value for the background color, any valid CSS color value. */
    bgcolor?: string;
    /** The width of the image in pixels */
    width?: number;
    /** The height of the image in pixels */
    height?: number;
    /** Inline styles */
    style?: Record<string, any>;
    /** Whether to include child elements */
    filter?: (node: Node) => boolean;
    /** Whether to render SVGs inline or as an image */
    inlineSvg?: boolean;
  }

  /** 
   * Converts DOM node to PNG image URL
   * @param node DOM node to convert
   * @param options Conversion options
   */
  export function toPng(node: HTMLElement, options?: DomToImageOptions): Promise<string>;

  /** 
   * Converts DOM node to JPEG image URL
   * @param node DOM node to convert
   * @param options Conversion options
   */
  export function toJpeg(node: HTMLElement, options?: DomToImageOptions): Promise<string>;

  /** 
   * Converts DOM node to SVG image URL
   * @param node DOM node to convert
   * @param options Conversion options
   */
  export function toSvg(node: HTMLElement, options?: DomToImageOptions): Promise<string>;

  /** 
   * Converts DOM node to image blob
   * @param node DOM node to convert
   * @param options Conversion options
   */
  export function toBlob(node: HTMLElement, options?: DomToImageOptions): Promise<Blob>;

  /** 
   * Converts DOM node to pixel data
   * @param node DOM node to convert
   * @param options Conversion options
   */
  export function toPixelData(node: HTMLElement, options?: DomToImageOptions): Promise<Uint8ClampedArray>;

  export default {
    toPng,
    toJpeg,
    toSvg,
    toBlob,
    toPixelData
  };
} 