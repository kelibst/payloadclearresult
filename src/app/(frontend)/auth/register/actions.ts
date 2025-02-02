'use server'

import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function register(formData: FormData) {
  try {
    const payload = await getPayload({ config })

    // Get form values
    const gender = formData.get('gender')
    const dateOfBirth = formData.get('dateOfBirth')
    const phoneNumber = formData.get('phoneNumber')
    console.log(formData, 'formDAta')

    // Create base data object with required fields
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
    }

    // Add optional fields only if they have values
    if (gender && gender !== '') {
      data.gender = gender as 'male' | 'female'
    }

    if (dateOfBirth && dateOfBirth !== '') {
      data.dateOfBirth = dateOfBirth as string
    }

    if (phoneNumber && phoneNumber !== '') {
      data.phoneNumber = phoneNumber as string
    }

    await payload.create({
      collection: 'users',
      data,
    })

    // Redirect to login page after successful registration
    return { message: 'success' }
  } catch (error) {
    console.error('Registration error:', error)
    const message = error?.cause?.message || error.message || 'Registration failed. Please check your input and try again.';
    return { message };
  }
}
