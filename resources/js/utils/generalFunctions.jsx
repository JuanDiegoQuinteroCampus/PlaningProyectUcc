const key = import.meta.env.VITE_SECRETKEY;
export async function encrypOrDesencrypAES(data, option = true){
    if (!key) {
        throw new Error("SECRETKEY is not defined in the environment variables.");
    }
    const value = option ? await encryptDataAESWithIV(data, key) : await decryptDataAESWithIV(data, key);
    return value;
}

export async function encryptDataAESWithIV(data, key) {
    try {
        const iv = crypto.getRandomValues(new Uint8Array(16));
        const keyHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(key));
        const cryptoKey = await crypto.subtle.importKey('raw', keyHash, { name: 'AES-CBC' }, false, ['encrypt']);

        const encryptedData = await crypto.subtle.encrypt({ name: 'AES-CBC', iv }, cryptoKey, new TextEncoder().encode(data));

        const ivHex = Array.from(iv).map(byte => byte.toString(16).padStart(2, '0')).join('');
        const encryptedHex = Array.from(new Uint8Array(encryptedData)).map(byte => byte.toString(16).padStart(2, '0')).join('');

        return ivHex + encryptedHex;
    } catch (error) {
        console.error('Error during encryption:', error);
    }
}

export async function decryptDataAESWithIV(encryptedHex, key) {
    try {
        const ivHex = encryptedHex.slice(0, 32);
        const encryptedDataHex = encryptedHex.slice(32);

        const iv = new Uint8Array(ivHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
        const encryptedData = new Uint8Array(encryptedDataHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

        const keyHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(key));
        const cryptoKey = await crypto.subtle.importKey('raw', keyHash, { name: 'AES-CBC' }, false, ['decrypt']);

        const decryptedData = await crypto.subtle.decrypt({ name: 'AES-CBC', iv }, cryptoKey, encryptedData);

        return new TextDecoder().decode(decryptedData);
    } catch (error) {
        console.error('Error during decryption:', error);
    }
}
