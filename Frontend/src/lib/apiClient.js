import { buildApiUrl } from '../config/api'

export class ApiClientError extends Error {
  constructor(message, { status, payload } = {}) {
    super(message)
    this.name = 'ApiClientError'
    this.status = status
    this.payload = payload
  }
}

const getErrorMessage = (payload, fallback) => {
  return payload?.error || payload?.message || fallback
}

const parseJsonSafely = async (response) => {
  const text = await response.text()

  if (!text) {
    return null
  }

  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

export const apiRequest = async (path, options = {}) => {
  const { body, headers, ...restOptions } = options
  const requestHeaders = { ...(headers || {}) }
  let requestBody = body

  if (body && typeof body === 'object' && !(body instanceof FormData)) {
    requestBody = JSON.stringify(body)
    if (!requestHeaders['Content-Type']) {
      requestHeaders['Content-Type'] = 'application/json'
    }
  }

  const response = await fetch(buildApiUrl(path), {
    credentials: 'include',
    ...restOptions,
    headers: requestHeaders,
    body: requestBody,
  })

  const payload = await parseJsonSafely(response)

  if (!response.ok) {
    throw new ApiClientError(getErrorMessage(payload, 'Request failed'), {
      status: response.status,
      payload,
    })
  }

  return payload
}

