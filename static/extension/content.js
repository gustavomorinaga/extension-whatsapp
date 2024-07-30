const extensionWidthSize = 512;

var UID = {
	_current: 0,
	getNew: function () {
		this._current++;
		return this._current;
	}
};

HTMLElement.prototype.pseudoStyle = function (element, prop, value) {
	var _this = this;
	var _sheetId = 'pseudoStyles';
	var _head = document.head || document.getElementsByTagName('head')[0];
	var _sheet = document.getElementById(_sheetId) || document.createElement('style');
	_sheet.id = _sheetId;
	var className = 'pseudoStyle' + UID.getNew();

	_this.className += ' ' + className;

	_sheet.innerHTML += ' .' + className + ':' + element + '{' + prop + ':' + value + '}';
	_head.appendChild(_sheet);
	return this;
};

const iframe = document.createElement('iframe');
iframe.id = 'extension-whatsapp';
iframe.src = window.chrome.runtime.getURL('index.html');
iframe.style.cssText = `
  position: fixed;
  top: 0;
  right: 0;
  display: block;
  width: ${extensionWidthSize}px;
  height: 100%;
  z-index: 100;
  border: none;
`;

function init() {
	handleDealPreSelection();
	setup();
}

function isWhatsAppWebReady() {
	return (
		document.getElementById('startup') == null &&
		document.getElementsByClassName('app-wrapper-web').length > 0 &&
		document.getElementsByClassName('two').length > 0
	);
}

function isChatOpened() {
	return document.getElementById('main') != null;
}

function retrieveObject(key, id) {
	return new Promise((resolve) => {
		if (!isChatOpened()) return resolve(null);
		if (!id) id = '';

		const handleDataScrap = (event) => {
			resolve(JSON.parse(event.detail));
			document.removeEventListener('dataScrapped', handleDataScrap);
		};
		document.addEventListener('dataScrapped', handleDataScrap);
		const script = document.createElement('script');
		script.src = chrome.runtime.getURL('extension/scrap.js');
		script.setAttribute('data-key', key);
		script.setAttribute('data-id', id);
		script.setAttribute('id', 'scrap');
		script.onload = function () {
			script.remove();
		};

		(document.head || document.documentElement).appendChild(script);
	});
}

function setup() {
	if (!isWhatsAppWebReady()) {
		setTimeout(() => setup(), 100);
		return;
	}

	const appElement = document.getElementById('app');
	appElement.style.cssText = `
    width: calc(100% - ${extensionWidthSize}px);
    max-width: 100%;
  `;

	const appWrapperWebElement = document.getElementsByClassName('app-wrapper-web')[0];
	appWrapperWebElement.pseudoStyle('after', 'width', 'calc(100% - ' + extensionWidthSize + 'px)');

	const twoElement = document.getElementsByClassName('two')[0];
	twoElement.style.cssText = `
    width: 100%;
    height: 100%;
    top: 0;
  `;

	document.body.appendChild(iframe);

	loadStylesheetToOverrideWhatsAppStyles();
}

function loadStylesheetToOverrideWhatsAppStyles() {
	const href = window.chrome.runtime.getURL('extension/wa-overrides.css');
	document.head.appendChild(buildStylesheetTag(href));
}

function buildStylesheetTag(href) {
	const tag = document.createElement('link');
	tag.setAttribute('rel', 'stylesheet');
	tag.setAttribute('type', 'text/css');
	tag.setAttribute('href', href);
	return tag;
}

function handleDealPreSelection() {
	const params = new URLSearchParams(window.location.search);
	const dealIdToPreselect = params.get('deal_id');
	if (dealIdToPreselect) chrome.storage.local.set({ dealIdToPreselect });
}

init();
