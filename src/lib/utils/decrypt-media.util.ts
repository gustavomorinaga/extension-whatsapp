/* eslint-disable @typescript-eslint/no-explicit-any */

// Original source code: https://github.com/open-wa/wa-decrypt-nodejs/blob/master/src/decrypt.ts

import { Buffer } from 'buffer';
import crypto from 'crypto';
import hkdf from 'futoin-hkdf';
import type { Message, RequireAtLeastOne } from '$lib/ts';

if (typeof window !== 'undefined') {
	(window as any).Buffer = Buffer;
}

/**
 * An array of non-size types.
 */
const nonSizeTypes = ['sticker'];

/**
 * Defines a constant object that maps media types to their corresponding strings.
 */
export const mediaTypes: Record<string, string> = {
	IMAGE: 'Image',
	VIDEO: 'Video',
	AUDIO: 'Audio',
	PTT: 'Audio',
	DOCUMENT: 'Document',
	STICKER: 'Image'
};

export interface RequiredDecryptionMessage {
	mediaKey: string;
	filehash: string;
	mimetype: string;
	type: string;
	size: number;
}

export type DecryptableMessage = RequireAtLeastOne<
	{
		clientUrl?: string;
		deprecatedMms3Url?: string;
	},
	'clientUrl' | 'deprecatedMms3Url'
> &
	RequiredDecryptionMessage;

/**
 * Represents an error that occurs when critical data is missing.
 */
export class MissingCriticalDataError extends Error {
	constructor(public override message: string) {
		super();
		this.name = 'MissingCriticalDataError';
		this.message = message;
	}
}

/**
 * Decrypts media based on the provided message.
 *
 * @param message - The message to decrypt.
 * @returns A promise that resolves to the decrypted media as a Buffer.
 * @throws Error if the message is not a valid message.
 * @throws MissingCriticalDataError if the message is missing critical data.
 */
export const decryptMedia = async (
	message: DecryptableMessage | Message | boolean
): Promise<Buffer> => {
	if (!message || (message as boolean) === false || typeof message === 'boolean')
		throw new Error('Message is not a valid message');

	const missingProps = [];
	message = message as DecryptableMessage;
	if (!message.mediaKey) missingProps.push('mediaKey');
	if (!message.filehash) missingProps.push('filehash');
	if (!message.mimetype) missingProps.push('mimetype');
	if (!message.type) missingProps.push('type');
	if (!message.size) missingProps.push('size');

	if (
		!message ||
		!message.mediaKey ||
		!message.filehash ||
		!message.mimetype ||
		!message.type ||
		!message.size
	) {
		if (missingProps.length === 1 && missingProps[0] === 'size') {
			if (!nonSizeTypes.includes(message.type))
				console.warn('WARN: size property is missing. File will fail an integrity check.');
		} else
			throw new MissingCriticalDataError(
				`Message is missing critical data: ${missingProps.join(', ')}`
			);
	}

	const res = await fetch(message.deprecatedMms3Url?.trim() ?? '');
	if (!res.ok) throw new Error('Failed to fetch media data from the provided URL');

	const buff = Buffer.from((await res.arrayBuffer()) as any, 'binary');
	return magix(buff, message.mediaKey, message.type, message.size, message.mimetype);
};

/**
 * Decrypts and returns the media data buffer.
 *
 * @param fileData - The file data to be decrypted.
 * @param mediaKeyBase64 - The base64-encoded media key.
 * @param mediaType - The type of media.
 * @param expectedSize - The expected size of the media data buffer.
 * @param mimetype - The mimetype of the media.
 * @returns The decrypted media data buffer.
 */
const magix = (
	fileData: any,
	mediaKeyBase64: string,
	mediaType: string,
	expectedSize?: number,
	mimetype?: string
) => {
	const encodedHex = fileData.toString('hex');
	const encodedBytes = hexToBytes(encodedHex);
	const mediaKeyBytes: any = base64ToBytes(mediaKeyBase64);
	const info = `WhatsApp ${mediaTypes[mediaType.toUpperCase()] || mediaTypes[Object.keys(mediaTypes).filter((type) => mimetype?.includes(type.toLowerCase()))[0]]} Keys`;
	const hash = 'sha256';
	const salt: any = new Uint8Array(32);
	const expandedSize = 112;
	const mediaKeyExpanded = hkdf(mediaKeyBytes, expandedSize, { salt, info, hash });
	const iv = mediaKeyExpanded.subarray(0, 16);
	const cipherKey = mediaKeyExpanded.subarray(16, 48);
	const decipher = crypto.createDecipheriv('aes-256-cbc', cipherKey, iv);
	const decoded: Buffer = decipher.update(encodedBytes);
	const mediaDataBuffer = expectedSize ? fixPadding(decoded, expectedSize) : decoded;
	return mediaDataBuffer;
};

/**
 * Fixes the padding of the given data to match the expected size.
 *
 * @param data - The data to fix the padding for.
 * @param expectedSize - The expected size of the data after fixing the padding.
 * @returns The data with fixed padding.
 */
const fixPadding = (data: Buffer, expectedSize: number) => {
	const padding = (16 - (expectedSize % 16)) & 0xf;
	if (padding > 0) {
		if (expectedSize + padding == data.length) {
			data = data.subarray(0, data.length - padding);
		} else if (data.length + padding == expectedSize) {
			const arr = new Uint16Array(padding).map(() => padding);
			data = Buffer.concat([data, Buffer.from(arr)]);
		}
	}

	// @ts-expect-error - Buffer is not assignable to Uint8Array
	return Buffer.from(data, 'utf-8');
};

/**
 * Converts a hexadecimal string to a Uint8Array of bytes.
 *
 * @param hexStr - The hexadecimal string to convert.
 * @returns The Uint8Array of bytes.
 */
const hexToBytes = (hexStr: any) => {
	const intArray = [];
	for (let i = 0; i < hexStr.length; i += 2) {
		intArray.push(parseInt(hexStr.substr(i, 2), 16));
	}
	return new Uint8Array(intArray);
};

/**
 * Converts a base64 string to a byte array.
 *
 * @param base64Str - The base64 string to convert.
 * @returns The byte array representation of the base64 string.
 */
const base64ToBytes = (base64Str: string) => {
	const binaryStr = atob(base64Str);
	const byteArray = new Uint8Array(binaryStr.length);
	for (let i = 0; i < binaryStr.length; i++) {
		byteArray[i] = binaryStr.charCodeAt(i);
	}
	return byteArray;
};

/**
 * This removes all but the minimum required data to decrypt media.
 * This can be useful to minimize sensitive data transport.
 * Note, this deletes all information regarding where/who sent the message.
 */
export const bleachMessage = (m: Record<string, unknown>) => {
	const r = { ...m };

	Object.keys(m).map((key) => {
		if (
			![
				'type',
				'clientUrl',
				'mimetype',
				'mediaKey',
				'size',
				'filehash',
				'uploadhash',
				'deprecatedMms3Url'
			].includes(key)
		)
			delete r[key];
	});

	return r;
};
