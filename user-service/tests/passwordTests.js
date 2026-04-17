const bcrypt = require('bcrypt');

test('password hashing works', async () => {
    const password = 'test123';
    const hash = await bcrypt.hash(password, 10);

    const match = await bcrypt.compare(password, hash);

    expect(match).toBe(true);
});