// lib/auth-client.ts
'use client'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase'

async function createSessionCookie(idToken: string) {
  await fetch('/api/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  })
}

export async function signUpWithEmail(email: string, password: string) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password)
  const idToken = await user.getIdToken()
  await createSessionCookie(idToken)
  return user
}

export async function signInWithEmail(email: string, password: string) {
  const { user } = await signInWithEmailAndPassword(auth, email, password)
  const idToken = await user.getIdToken()
  await createSessionCookie(idToken)
  return user
}

export async function signInWithGoogle() {
  const { user } = await signInWithPopup(auth, googleProvider)
  const idToken = await user.getIdToken()
  await createSessionCookie(idToken)
  return user
}

export async function signOutUser() {
  await signOut(auth)
  await fetch('/api/session', { method: 'DELETE' }) // apaga cookie
}
