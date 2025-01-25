import { beforeEach, describe, it } from 'vitest';
import { httpInterceptor } from 'zimic/interceptor/http';

vi.mock('./mock');

const interceptor = httpInterceptor.create<{
  '/example': {
    GET: {
      response: {
        200: { body: { message: string } };
      };
    };
  };
}>({
  type: 'local',
  baseURL: 'http://localhost:3000',
});

describe('Example tests', () => {
  beforeAll(async () => {
    await interceptor.start();
  });

  beforeEach(async () => {
    interceptor.clear();
  });

  afterAll(async () => {
    await interceptor.stop();
  });

  it('example', async () => {
    interceptor.get('/example').respond({
      status: 200,
      body: { message: 'ok' },
    });

    const response = await fetch('http://localhost:3000/example');
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data).toEqual({ message: 'ok' });
  });
});
