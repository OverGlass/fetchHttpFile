import errorsMessages from "./errorsMessages.ts";
import { pipe } from "https://deno.land/x/fae@v0.6.2/pipe.ts";

export default async function fetchHttpFile(
  httpUrl: string
): Promise<Uint8Array> {
  if (!isHttpUrlValid(httpUrl)) throw new Error(errorsMessages.isHttpUrl);

  const res = await fetch(httpUrl);
  if (!isHttpResponseStatusOk(res)) throwHttpResponseError(res);

  return await pipe(
    getHttpResponseResolveInArrayBuffer,
    transformArrayBufferToUint8Array
  )(res);
}

function isHttpUrlValid(url: string) {
  const regexCheckHttpUrl = RegExp(/^(http|https):\/\//, "i");
  return regexCheckHttpUrl.test(url);
}

function isHttpResponseStatusOk(res: Response) {
  return res.ok;
}

function throwHttpResponseError(res: Response) {
  if (res.body) res.body.cancel();
  throw new Error(res.statusText);
}

async function getHttpResponseResolveInArrayBuffer(res: Response) {
  return await res.arrayBuffer();
}

async function transformArrayBufferToUint8Array(
  arrayBuffer: Promise<ArrayBuffer>
) {
  return new Uint8Array(await arrayBuffer);
}
