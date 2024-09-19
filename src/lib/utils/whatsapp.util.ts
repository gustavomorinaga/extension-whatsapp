import { executeScript } from '$lib/utils';
import type { Chat, ChatId, Contact, Message } from '$lib/ts';

export type TWhatsAppData = {
	chat: Chat;
	chatID: ChatId;
	contact?: Contact;
	messages: Array<Message>;
	phoneNumber: string | Array<string>;
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
			);
			if (!contact || (contact && !(contact.name || contact.pushname))) return undefined;

			return { chat, chatID, contact, messages, phoneNumber };
		} catch (error) {
			console.error('Error retrieving WhatsApp data:', error);
			return undefined;
		}
	},
	writeInChat: async (text) => {
		try {
			const dataTransfer = new DataTransfer();
			const input = document.querySelector('#main footer [contenteditable~=true]');
			const clipboardEvent = new ClipboardEvent('paste', {
				bubbles: true,
				clipboardData: dataTransfer
			});
			dataTransfer.setData('text', text.replace("'", '"'));
			input?.dispatchEvent(clipboardEvent);
		} catch (error) {
			console.error('Error writing in chat:', error);
		}
	}
};
