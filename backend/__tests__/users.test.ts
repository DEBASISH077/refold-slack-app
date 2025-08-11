import request from 'supertest'
import { createApp } from '../src/app'
import { Server } from 'http'

let server: Server

beforeAll(async () => {
  const app = await createApp()
  server = app.listen() // listen on ephemeral port
})

afterAll(done => {
  server.close(done)
})

describe('Users API (in-memory DB)', () => {
  it('GET /users → []', async () => {
    const res = await request(server).get('/users')
    expect(res.status).toBe(200)
    expect(res.body).toEqual([])
  })

  it('POST /users → created user', async () => {
    const res = await request(server)
      .post('/users')
      .send({ name: 'Alice' })
      .set('Content-Type', 'application/json')
    expect(res.status).toBe(201)
    expect(res.body).toMatchObject({ id: expect.any(Number), name: 'Alice' })
  })

  it('GET /users → [Alice]', async () => {
    const res = await request(server).get('/users')
    expect(res.body).toHaveLength(1)
    expect(res.body[0].name).toBe('Alice')
  })

  it('POST /users with bad body → 400', async () => {
    const res = await request(server)
      .post('/users')
      .send({})
      .set('Content-Type', 'application/json')
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })
})
