jest.mock('fs', () => ({
  existsSync: jest.fn(),
  writeFileSync: jest.fn()
}));

const request = require('supertest');
const fs = require('fs');
const app = require('./server');

describe('POST /newpost', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('creates first post and redirects', async () => {
    fs.existsSync.mockReturnValue(false);

    const res = await request(app)
      .post('/newpost')
      .send('title=Test Title&content=Hello\nWorld');

    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    expect(fs.writeFileSync.mock.calls[0][0])
      .toBe('posts/post1.html');

    expect(fs.writeFileSync.mock.calls[0][1])
      .toContain('<h1>Test Title</h1>');

    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/posts/post1.html');
  });

  test('increments post number if file exists', async () => {
    fs.existsSync
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);

    const res = await request(app)
      .post('/newpost')
      .send('title=Second&content=Another post');

    expect(fs.writeFileSync.mock.calls[0][0])
      .toBe('posts/post2.html');

    expect(res.headers.location).toBe('/posts/post2.html');
  });
});