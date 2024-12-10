const bcrypt = require('bcrypt');

async function testBcryptHash() {
    // Password to test
    const plainPassword = '12345678';

    try {
        console.log('Starting bcrypt test...');

        // Step 1: Hash the password
        console.log('Hashing password...');
        const hash = await bcrypt.hash(plainPassword, 10);
        console.log('Generated hash:', hash);

        // Step 2: Compare the original password with the hash
        console.log('Comparing password with generated hash...');
        const isMatch = await bcrypt.compare(plainPassword, hash);
        console.log('Does the password match the hash? ', isMatch);

        // Step 3: Try comparing with a wrong password
        console.log('Comparing with incorrect password...');
        const isWrongMatch = await bcrypt.compare('wrongpassword', hash);
        console.log('Does wrong password match the hash? ', isWrongMatch);

    } catch (error) {
        console.error('Error during bcrypt test:', error);
    }
}

// Run the test function
testBcryptHash();