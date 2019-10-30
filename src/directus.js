import DirectusSDK from '@directus/sdk-js';

const client = new DirectusSDK({
    url: 'https://directus7.eightrayedsun.com/',
    project: '_',
});

export default client;