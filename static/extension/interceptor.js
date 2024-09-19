const originalOpen = window.open;

window.open = function (...args) {
	try {
		const [url] = args;
		const { host } = new URL(url);
		const params = new URLSearchParams(url);
		const dealId = params.get('deal_id');
		const contactId = params.get('contact_id');
		const instanceId = params.get('instance_id');
		const isWhatsAppWeb = host === 'web.whatsapp.com';

		if (!dealId && !contactId && !instanceId && !isWhatsAppWeb) {
			originalOpen(...args);
			return;
		}

		window.dispatchEvent(
			new CustomEvent('openWhatsAppChat', {
				detail: {
					url
				}
			})
		);

		setTimeout(() => {
			originalOpen(...args);
		}, 200);
	} catch (_) {
		originalOpen(...args);
	}
};
