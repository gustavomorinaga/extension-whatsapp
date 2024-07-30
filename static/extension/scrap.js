function getWhatsAppObject() {
	const reactKey = Object.keys(document.getElementById('main')).find(
		(key) => key.startsWith('__reactFiber$') || key.startsWith('__reactInternalInstance$')
	);
	return document.getElementById('main')[reactKey];
}

function findValuesInObject(obj, key, id) {
	var seen = new Set(),
		active = [obj];
	while (active.length) {
		var new_active = [],
			found = [];
		for (var i = 0; i < active.length; i++) {
			Object.keys(active[i]).forEach(function (k) {
				var x = active[i][k];
				if (k === key && !id) {
					found.push(x);
				} else if (k === key && x && x.userid === id) {
					found.push(x);
				} else if (x && typeof x === 'object' && !seen.has(x)) {
					seen.add(x);
					new_active.push(x);
				}
			});
		}
		if (found.length) return found;
		active = new_active;
	}
	return null;
}

function runScrap() {
	const scriptTag = document.querySelector('#scrap');
	const key = scriptTag.getAttribute('data-key');
	const id = scriptTag.getAttribute('data-id');
	const chatObjects = findValuesInObject(getWhatsAppObject(), key, id);

	document.dispatchEvent(
		new CustomEvent('dataScrapped', {
			detail: chatObjects && JSON.stringify(chatObjects)
		})
	);
}

runScrap();
