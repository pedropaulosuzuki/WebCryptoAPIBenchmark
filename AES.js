async function test_AES_algorithm(algorithm, size) {
    const key = await crypto.subtle.importKey('raw', new Uint8Array(32), algorithm, false, ['encrypt']);
    const iv = new Uint8Array(16);

    const array = new Uint8Array(size);
    const start = Date.now(algorithm);

    await crypto.subtle.encrypt({ name: algorithm, counter: iv, iv, length: 128 }, key, array);
    const end = Date.now(algorithm);

    return end - start;
}

export async function test_AES(size) {
    const AES_CTR = await test_AES_algorithm('AES-CTR', size);
    const AES_CBC = await test_AES_algorithm('AES-CBC', size);
    const AES_GCM = await test_AES_algorithm('AES-GCM', size);

    return { AES_CTR, AES_CBC, AES_GCM };
}