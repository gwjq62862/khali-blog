import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'

export async function POST(req) {
  try {
    const evt = await verifyWebhook(req)

    const eventType = evt.type
    console.log(`Received webhook with ID ${evt.data.id} and event type of ${eventType}`)

    if (eventType === 'user.created') {
      // Handle user creation
      console.log('User created:', evt.data)
      // Add your database logic here
    }

    if (eventType === 'user.updated') {
      // Handle user update
      console.log('User updated:', evt.data)
      // Add your database logic here
    }

    if (eventType === 'user.deleted') {
      // Handle user deletion
      console.log('User deleted:', evt.data)
      // Add your database logic here
    }

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}