// Polyfills for environments missing encoders/decoders used by fetch/busboy
import {TextDecoder, TextEncoder} from "util";

// @ts-ignore - assign to global for Node/JSDOM
global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder;
// @ts-ignore - assign to global for Node/JSDOM
global.TextEncoder = TextEncoder as unknown as typeof global.TextEncoder;
