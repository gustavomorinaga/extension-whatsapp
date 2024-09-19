/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Executes a script on the WhatsApp Web page.
 * @param callback - The callback function to be executed.
 * @param args - The arguments to be passed to the callback function (optional).
 * @returns A promise that resolves with the result of the script execution.
 */
export function executeScript<T = () => void, Args extends any[] = []>(
	callback: (...args: Partial<Args>) => T,
	args: Args | undefined = [] as unknown as Args
): Promise<T> {
	return new Promise((resolve) => {
		chrome.tabs.getCurrent((currentTab) => {
			chrome.scripting
				.executeScript({
					target: { tabId: currentTab?.id as number },
					func: callback,
					args
				})
				.then((data) => {
					const [item] = data;
					const result = (item.result as unknown as any[])?.[0];
					resolve(result);
				});
		});
	});
}
