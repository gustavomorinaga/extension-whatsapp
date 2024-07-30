chrome.action.onClicked.addListener(() => {
	chrome.tabs.create({ url: 'https://web.whatsapp.com/' });
});
