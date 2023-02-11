import { JSDOM } from "jsdom";
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const url = "http://localhost";
const documentHTML = '<!DOCTYPE html><div class="root"></div>';
global.document = new JSDOM(documentHTML, { url });
