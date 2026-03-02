import { apiRequest, ApiClientError } from '../lib/apiClient'

const toCollection = (payload, collectionName) => {
  if (!payload?.success || !Array.isArray(payload?.data)) {
    throw new ApiClientError(`Invalid ${collectionName} response`)
  }

  return payload.data
}

export const fetchWorkItems = async () => {
  const payload = await apiRequest('/api/work')
  return toCollection(payload, 'work items')
}

export const fetchServices = async () => {
  const payload = await apiRequest('/api/services')
  return toCollection(payload, 'services')
}

export const fetchTestimonials = async () => {
  const payload = await apiRequest('/api/testimonials')
  return toCollection(payload, 'testimonials')
}

export const fetchFaqs = async () => {
  const payload = await apiRequest('/api/faqs')
  return toCollection(payload, 'faqs')
}

export const submitContactInquiry = async (inquiryPayload) => {
  const payload = await apiRequest('/api/contact', {
    method: 'POST',
    body: inquiryPayload,
  })

  if (!payload?.success) {
    throw new ApiClientError(payload?.error || payload?.message || 'Failed to submit inquiry')
  }

  return payload.data
}

