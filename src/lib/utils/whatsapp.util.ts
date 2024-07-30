import { executeScript } from '$lib/utils';
import type { TWhatsAppChat, TWhatsAppContact, TWhatsAppMessage } from '$lib/ts';

/**
 * Represents the interface for interacting with WhatsApp Web.
 */
export interface IWhatsAppWeb {
	/**
	 * Retrieves the current chat object.
	 * @returns A promise that resolves with the current chat object.
	 */
	getCurrentChatObject: () => Promise<TWhatsAppChat | undefined>;

	/**
	 * Retrieves the current contact object.
	 * @returns A promise that resolves with the current contact object.
	 */
	getCurrentContactObject: () => Promise<TWhatsAppContact | undefined>;

	/**
	 * Retrieves the ID of the current chat.
	 * @returns A promise that resolves with the ID of the current chat.
	 */
	getCurrentChatID: () => Promise<string>;

	/**
	 * Retrieves the phone number of the current chat.
	 * @returns A promise that resolves with the phone number of the current chat.
	 */
	getCurrentChatPhoneNumber: () => Promise<string>;

	/**
	 * Retrieves the name of the current chat.
	 * @returns A promise that resolves with the name of the current chat.
	 */
	getCurrentChatName: () => Promise<string | undefined>;

	/**
	 * Retrieves the messages of the current chat.
	 * @returns A promise that resolves with the messages of the current chat.
	 */
	getCurrentChatMessages: () => Promise<TWhatsAppMessage[]>;

	/**
	 * Writes text in the current chat.
	 * @param text - The text to be written in the chat.
	 * @returns A promise that resolves when the text is written.
	 */
	writeInChat: (text: string) => Promise<void>;

	/**
	 * Fetches the media URL.
	 * @param url - The URL of the media.
	 * @returns A promise that resolves with the fetched media URL.
	 */
	fetchMediaURL: (url: string) => Promise<unknown>;
}

/**
 * Represents the WhatsApp Web object.
 */
export const whatsAppWeb: IWhatsAppWeb = {
	getCurrentChatObject: () => {
		return new Promise((resolve) => {
			executeScript(() => window.retrieveObject<TWhatsAppChat>('chat')).then((chat) => {
				if (!chat || (chat && chat.id.indexOf('@g.') >= 0)) return resolve(undefined);
				resolve(chat);
			});
		});
	},
	getCurrentContactObject: () => {
		return new Promise((resolve) => {
			whatsAppWeb.getCurrentChatObject().then((chat) => {
				if (!chat) return resolve(undefined);

				const userID = chat.id.split('@')[0];
				executeScript(() => window.retrieveObject<TWhatsAppContact>('contact'), [userID]).then(
					(contact) => {
						if (!contact || (contact && !(contact.name || contact.pushname))) {
							return;
						}
						resolve(contact);
					}
				);
			});
		});
	},
	getCurrentChatID: () => {
		return new Promise((resolve) => {
			whatsAppWeb.getCurrentChatObject().then((chat) => {
				if (!chat || (chat && chat.id.indexOf('@g.') >= 0)) return;
				resolve(chat.id);
			});
		});
	},
	getCurrentChatPhoneNumber: () => {
		return new Promise((resolve) => {
			whatsAppWeb.getCurrentChatID().then((id: string) => {
				if (!id) return;
				const phoneNumber = `+${id.split('@')[0]}`;
				resolve(phoneNumber);
			});
		});
	},
	getCurrentChatName: () => {
		return new Promise((resolve) => {
			whatsAppWeb.getCurrentChatObject().then((chat) => {
				if (!chat) return resolve(undefined);
				resolve(chat.name);
			});
		});
	},
	getCurrentChatMessages: () => {
		return new Promise((resolve) => {
			whatsAppWeb.getCurrentChatObject().then((chat) => {
				if (!chat) return resolve([]);
				resolve(chat.msgs);
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
	},
	fetchMediaURL: (url) => {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.onreadystatechange = function () {
				if (this.readyState === 4) {
					return this.status === 200 ? resolve(this) : reject;
				}
			};
			request.responseType = 'arraybuffer';
			request.open('GET', url);
			request.send();
		});
	}
};
