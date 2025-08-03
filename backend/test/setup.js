// test/setup.js
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

jest.setTimeout(30000);

// fournir des valeurs par défaut pour les tests
process.env.JWT_SECRET = process.env.JWT_SECRET || 'testsecret';
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
process.env.PORT = process.env.PORT || '5050'; // si utilisé quelque part

let mongoServer;
const useRealMongo = !!process.env.MONGO_URI;

beforeAll(async () => {
  if (useRealMongo) {
    await mongoose.connect(process.env.MONGO_URI);
  } else {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  }
});

afterAll(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
});
