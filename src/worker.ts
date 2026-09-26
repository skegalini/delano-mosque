const appRoutes = new Set(['/', '/visit', '/programs', '/about', '/display'])

type AssetsBinding = {
  fetch(request: Request): Promise<Response>
}

type Env = {
  ASSETS: AssetsBinding
}

function normalizePathname(pathname: string) {
  return pathname === '/' ? '/' : pathname.replace(/\/+$/, '')
}

function isDocumentRequest(request: Request, pathname: string) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return false
  }

  const lastSegment = pathname.split('/').at(-1) ?? ''
  const accept = request.headers.get('accept') ?? ''

  return (
    !lastSegment.includes('.') &&
    (!accept || accept.includes('text/html') || accept.includes('*/*'))
  )
}

async function getAppShell(request: Request, env: Env) {
  const shellUrl = new URL(request.url)
  shellUrl.pathname = '/'
  shellUrl.search = ''

  return env.ASSETS.fetch(
    new Request(shellUrl, {
      headers: request.headers,
      method: request.method,
    }),
  )
}

export default {
  async fetch(request: Request, env: Env) {
    const assetResponse = await env.ASSETS.fetch(request)

    if (assetResponse.status !== 404) {
      return assetResponse
    }

    const pathname = normalizePathname(new URL(request.url).pathname)

    if (appRoutes.has(pathname)) {
      return getAppShell(request, env)
    }

    if (!isDocumentRequest(request, pathname)) {
      return assetResponse
    }

    const appShell = await getAppShell(request, env)

    return new Response(appShell.body, {
      headers: appShell.headers,
      status: 404,
      statusText: 'Not Found',
    })
  },
}
