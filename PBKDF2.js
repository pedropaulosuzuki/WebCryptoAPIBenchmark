async function test_PBKDF2_algorithm(algorithm, size) {
    const key = await window.crypto.subtle.importKey('raw', new Uint8Array(0), { name: 'PBKDF2' }, false, ['deriveBits']);
    const start = Date.now(algorithm);
    await window.crypto.subtle.deriveBits({name: 'PBKDF2', salt: new Uint8Array(16), iterations: size, hash: algorithm }, key, 512 );
    const end = Date.now(algorithm);

    return end - start;
}

export async function test_PBKDF2(size) {
    const PBKDF2_SHA_1   = await test_PBKDF2_algorithm('SHA-1'  , size);
    const PBKDF2_SHA_256 = await test_PBKDF2_algorithm('SHA-256', size);
    const PBKDF2_SHA_384 = await test_PBKDF2_algorithm('SHA-384', size);
    const PBKDF2_SHA_512 = await test_PBKDF2_algorithm('SHA-512', size);

    return { PBKDF2_SHA_1, PBKDF2_SHA_256, PBKDF2_SHA_384, PBKDF2_SHA_512 };
}