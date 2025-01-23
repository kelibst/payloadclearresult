'use client'

import { useEffect, useState } from 'react'

interface UserProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  dateOfBirth?: string
  gender?: 'male' | 'female'
  phoneNumber?: string
  createdAt: string
  updatedAt: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/users/me')
        const data = await response.json()

        if (data.user) {
          setProfile({
            id: data.user.id,
            email: data.user.email,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            role: data.user.role,
            dateOfBirth: data.user.dateOfBirth,
            gender: data.user.gender,
            phoneNumber: data.user.phoneNumber,
            createdAt: data.user.createdAt,
            updatedAt: data.user.updatedAt,
          })
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="text-center py-8">
        <p className="">Failed to load profile</p>
      </div>
    )
  }

  return (
    <div className="mx-auto py-8">
      <div className="rounded-lg shadow-lg overflow-hidden">
        <div className="bg-primary h-32 relative">
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <span className="text-4xl font-bold text-accent">
                {profile.firstName.charAt(0)}
                {profile.lastName.charAt(0)}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-20 pb-8 px-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold ">
                {profile.firstName} {profile.lastName}
              </h1>
              <p className="">{profile.email}</p>
            </div>
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              {profile.role}
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg">
              <h2 className="text-lg font-semibold  mb-2">Personal Details</h2>
              <div className="space-y-3">
                {profile.dateOfBirth && (
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="">{new Date(profile.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                )}
                {profile.gender && (
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className=" capitalize">{profile.gender}</p>
                  </div>
                )}
                {profile.phoneNumber && (
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="">{profile.phoneNumber}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 rounded-lg">
              <h2 className="text-lg font-semibold  mb-2">Account Details</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="">{new Date(profile.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="">{new Date(profile.updatedAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Account Status</p>
                  <p className="text-green-600 font-medium">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
