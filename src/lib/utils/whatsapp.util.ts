import mime from 'mime-types';
import { decryptMedia, executeScript } from '$lib/utils';
import type { Chat, ChatId, Contact, Message } from '$lib/ts';

export type TWhatsAppData = {
	chat: Chat;
	chatID: ChatId;
	contact?: Contact;
	messages: Array<Message>;
	phoneNumber: string | Array<string>;
};

export type TWhatsAppMedia = {
	filename: string;
	filetype: string;
	mediaBase64: string;
};

/**
 * Represents the WhatsApp Web object.
 */
export type TWhatsAppWeb = {
	/**
	 * Retrieves the WhatsApp data.
	 * @returns A promise that resolves with the WhatsApp data.
	 */
	getData: () => Promise<TWhatsAppData | undefined>;
	/**
	 * Processes the media message.
	 * @param message - The media message to be processed.
	 * @returns A promise that resolves with the processed media.
	 */
	processMedia: (message: Message) => Promise<TWhatsAppMedia | undefined>;
	/**
	 * Writes text in the current chat.
	 * @param text - The text to be written in the chat.
	 * @returns A promise that resolves when the text is written.
	 */
	writeInChat: (text: string) => Promise<void>;
};

/**
 * Represents the WhatsApp Web object.
 */
export const whatsAppWeb: TWhatsAppWeb = {
	getData: async () => {
		try {
			const chat = await executeScript(() => window.retrieveObject<Chat | undefined>('chat'));
			if (!chat) return undefined;

			const chatID = chat.id;
			const messages = chat.msgs;
			const [contactID] = chat.id.split('@');
			const phoneNumbers = contactID.split('-').map((num) => `+${num}`);
			const phoneNumber = phoneNumbers.length === 1 ? phoneNumbers[0] : phoneNumbers;

			const contact = await executeScript(
				() => window.retrieveObject<Contact | undefined>('contact'),
				[contactID]
			).then((contact) => {
				if (!contact || (contact && !(contact.name || contact.pushname))) return undefined;
				return contact;
			});

			return { chat, chatID, contact, messages, phoneNumber };
		} catch (error) {
			console.error('Error retrieving WhatsApp data:', error);
			return undefined;
		}
	},
	processMedia: async (message) => {
		try {
			if (!message.mimetype) return undefined;

			const filename = `${message.t}.${mime.extension(message.mimetype)}`;
			const filetype = mime.contentType(filename) || 'application/octet-stream';
			const mediaData = await decryptMedia(message);
			const mediaBase64 = `data:${message.mimetype};base64,${mediaData.toString('base64')}`;

			return { filename, filetype, mediaBase64 };
		} catch (error) {
			console.error('Error processing message:', error);
			return undefined;
		}
	},
	writeInChat: async (text) => {
		try {
			executeScript(
				(text) => {
					if (!text) return;

					const dataTransfer = new DataTransfer();
					const input = document.querySelector('#main footer [contenteditable~=true]');
					const clipboardEvent = new ClipboardEvent('paste', {
						bubbles: true,
						clipboardData: dataTransfer
					});
					dataTransfer.setData('text', text.replace("'", '"'));
					input?.dispatchEvent(clipboardEvent);
				},
				[text]
			);
		} catch (error) {
			console.error('Error writing in chat:', error);
		}
	}
};
