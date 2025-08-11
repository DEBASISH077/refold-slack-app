// backend/jest.setup.ts
// Point DATABASE_PATH at an in-memory database for isolation
process.env.DATABASE_PATH = ':memory:'
