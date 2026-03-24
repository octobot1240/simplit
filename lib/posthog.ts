'use client'

import posthog from 'posthog-js'

export function initPostHog() {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST

  if (typeof window !== 'undefined' && key && host) {
    posthog.init(key, {
      api_host: host,
      capture_pageview: false,
    })
  }
}

export { posthog }
