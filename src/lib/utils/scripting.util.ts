/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Executes a script on the current tab.
 * @param callback - The callback function to be executed.
 * @param args - The arguments to be passed to the callback function.
 * @returns A promise that resolves with the result of the script execution.
 */
export function executeScript<T = unknown>(callback: () => T, args: Array<any> = []): Promise<T> {
	return new Promise((resolve) => {
		chrome.tabs.getCurrent((currentTab) => {
			chrome.scripting
				.executeScript({
					target: { tabId: currentTab?.id || 0 },
					func: callback,
					args: args as []
				})
				.then((data) => {
					const [item] = data;
					const result = (item.result as Array<unknown>)?.[0];
					resolve(result as T);
				});
		});
	});
}
