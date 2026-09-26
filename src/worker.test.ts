import worker from './worker'

function createEnv() {
  return {
    ASSETS: {
      async fetch(request: Request) {
        const pathname = new URL(request.url).pathname

        if (pathname === '/') {
          return new Response('<div id="root"></div>', {
            headers: { 'content-type': 'text/html' },
          })
        }

        if (pathname === '/robots.txt') {
          return new Response('User-agent: *', {
            headers: { 'content-type': 'text/plain' },
          })
        }

        return new Response('Asset not found', { status: 404 })
      },
    },
  }
}

describe('Cloudflare Worker routing', () => {
  it.each(['/visit', '/programs', '/about', '/display', '/about/'])(
    'serves the app shell with a 200 for known route %s',
    async (path) => {
      const response = await worker.fetch(
        new Request(`https://delanomosque.org${path}`, {
          headers: { accept: 'text/html' },
        }),
        createEnv(),
      )

      expect(response.status).toBe(200)
      await expect(response.text()).resolves.toContain('<div id="root"></div>')
    },
  )

  it('serves the app shell with a 404 for an unknown document route', async () => {
    const response = await worker.fetch(
      new Request('https://delanomosque.org/this-page-does-not-exist', {
        headers: { accept: 'text/html' },
      }),
      createEnv(),
    )

    expect(response.status).toBe(404)
    expect(response.headers.get('content-type')).toContain('text/html')
    await expect(response.text()).resolves.toContain('<div id="root"></div>')
  })

  it('preserves real assets and native asset 404 responses', async () => {
    const env = createEnv()
    const robotsResponse = await worker.fetch(
      new Request('https://delanomosque.org/robots.txt'),
      env,
    )
    const missingAssetResponse = await worker.fetch(
      new Request('https://delanomosque.org/assets/missing.png'),
      env,
    )

    expect(robotsResponse.status).toBe(200)
    await expect(robotsResponse.text()).resolves.toBe('User-agent: *')
    expect(missingAssetResponse.status).toBe(404)
    await expect(missingAssetResponse.text()).resolves.toBe('Asset not found')
  })
})
