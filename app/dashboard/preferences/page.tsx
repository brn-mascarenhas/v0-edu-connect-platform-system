"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function PreferencesPage() {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    groupInvites: true,
    materialUpdates: false,
    quizReminders: true,
    weeklyDigest: true,
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleToggle = (key: string) => {
    setPreferences({
      ...preferences,
      [key]: !preferences[key as keyof typeof preferences],
    })
  }

  const handleSave = async () => {
    setLoading(true)
    setSuccess(false)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSuccess(true)
    setLoading(false)
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Preferences</h1>
          <p className="text-gray-600 mt-1">Manage your notification and display settings</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Choose what updates you want to receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label className="font-medium">Email Notifications</Label>
                <p className="text-sm text-gray-600">Receive email updates about your activity</p>
              </div>
              <button
                onClick={() => handleToggle("emailNotifications")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.emailNotifications ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.emailNotifications ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label className="font-medium">Group Invites</Label>
                <p className="text-sm text-gray-600">Get notified when you're invited to study groups</p>
              </div>
              <button
                onClick={() => handleToggle("groupInvites")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.groupInvites ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.groupInvites ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label className="font-medium">Material Updates</Label>
                <p className="text-sm text-gray-600">Alerts when new materials are shared in your groups</p>
              </div>
              <button
                onClick={() => handleToggle("materialUpdates")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.materialUpdates ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.materialUpdates ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label className="font-medium">Quiz Reminders</Label>
                <p className="text-sm text-gray-600">Reminders about upcoming quizzes and deadlines</p>
              </div>
              <button
                onClick={() => handleToggle("quizReminders")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.quizReminders ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.quizReminders ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label className="font-medium">Weekly Digest</Label>
                <p className="text-sm text-gray-600">Weekly summary of your study activities</p>
              </div>
              <button
                onClick={() => handleToggle("weeklyDigest")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.weeklyDigest ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.weeklyDigest ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                Preferences saved successfully!
              </div>
            )}

            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>
              {loading ? "Saving..." : "Save Preferences"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
