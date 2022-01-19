async function test_SHA_algorithm(algorithm, size) {
    const array = new Uint8Array(size);
    const start = Date.now(algorithm);
    await crypto.subtle.digest(algorithm, array);
    const end = Date.now(algorithm);

    return end - start;
}

export async function test_SHA(size) {
    const SHA_1   = await test_SHA_algorithm('SHA-1'  , size);
    const SHA_256 = await test_SHA_algorithm('SHA-256', size);
    const SHA_384 = await test_SHA_algorithm('SHA-384', size);
    const SHA_512 = await test_SHA_algorithm('SHA-512', size);

    return { SHA_1, SHA_256, SHA_384, SHA_512 };
}