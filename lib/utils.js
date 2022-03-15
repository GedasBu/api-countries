const crypto = require('crypto');

const utils = {};

utils.parseJSONtoObject = text => {
    try {
        return JSON.parse(text);
    } catch (error) {
        return 'Sugadintas failo turinys';
    }
}

utils.hash = str => {
    if (typeof str === 'string' && str !== '') {
        const hashingSecret = 'my-super-secret-token-you-should-not-know-about';
        return crypto.createHmac('sha256', hashingSecret).update(str).digest('hex');
    } else {
        return false;
    }
}

module.exports = utils;