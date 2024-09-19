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
	// processMessage: (message: Message) => Promise<void>;
};

/**
 * Represents the WhatsApp Web object.
 */
export const whatsAppWeb: TWhatsAppWeb = {
	getData: () => {
		return new Promise((resolve) => {
			executeScript(() => window.retrieveObject<Chat | undefined>('chat')).then(async (chat) => {
				if (!chat) return resolve(undefined);

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

				resolve({ chat, chatID, contact, messages, phoneNumber });
			});
		});
	},
	writeInChat: (text) => {
		return new Promise((resolve) => {
			executeScript(() => {
				const dataTransfer = new DataTransfer();
				const input = document.querySelector('#main footer [contenteditable~=true]');
				const clipboardEvent = new ClipboardEvent('paste', {
					bubbles: true,
					clipboardData: dataTransfer
				});
				dataTransfer.setData('text', text.replace("'", '"'));
				input?.dispatchEvent(clipboardEvent);
			}).then(() => resolve());
		});
	}
};
