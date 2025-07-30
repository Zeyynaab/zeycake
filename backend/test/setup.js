// test/setup.js
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

jest.setTimeout(20000) // en cas de lenteur

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()
  await mongoose.connect(uri, {
    
  })
})

/* afterEach(async () => {
  // purge toutes les collections entre les tests
  const collections = mongoose.connection.collections
  for (const key in collections) {
    await collections[key].deleteMany()
  }
}) */

afterAll(async () => {
  const collections = mongoose.connection.collections
  for (const key in collections) {
    await collections[key].deleteMany()
  }
  await mongoose.disconnect()
  await mongoServer.stop() 
})
