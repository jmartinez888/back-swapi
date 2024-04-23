process.env.AWS_ACCESS_KEY_ID = 'fake-access-key-id';
process.env.AWS_SECRET_ACCESS_KEY = 'fake-secret-access-key';

module.exports = {
    verbose: true,
    "preset": "@shelf/jest-dynamodb"
}
