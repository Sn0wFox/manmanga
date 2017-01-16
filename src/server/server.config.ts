import * as path from "path";
import * as url from "url";

/**
 * The root path of the application.
 * @type {string}
 */
export const serverRoot: string = path.join(__dirname, "..");
export const appRoot: string = path.join(serverRoot, "app");
export const staticRoot: string = path.join(serverRoot, "static");
export const projectRoot: string = path.join(serverRoot, "../..");
export const clientRoot: string = path.join(projectRoot, "build/client");

/**
 * The host where the server is running.
 * @type {string}
 */
export const serverHost: string = "localhost";

/**
 * The port where the server is running.
 * @type {number}
 */
export const serverPort: number = 3000;

/**
 * The external URL to the root of the server
 * @type {string}
 */
export const externalUrl: string = url.format({protocol: "http", host: serverHost, port: serverPort.toString(10)});
