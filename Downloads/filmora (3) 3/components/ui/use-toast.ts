"use client"

import type React from "react"

import { useState, useEffect } from "react"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 5000

type ToastProps = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

let count = 0

function generateId() {
  return `${count++}`
}

// Create a store to manage toasts outside of React components
type ToastStore = {
  toasts: ToastProps[]
  listeners: Set<(toasts: ToastProps[]) => void>
}

const toastStore: ToastStore = {
  toasts: [],
  listeners: new Set(),
}

const updateToasts = (toasts: ToastProps[]) => {
  toastStore.toasts = toasts
  toastStore.listeners.forEach((listener) => listener(toasts))
}

// Direct toast function for use outside of React components
export function toast(props: Omit<ToastProps, "id">) {
  const id = generateId()

  const newToast = {
    id,
    ...props,
  }

  const updatedToasts = [...toastStore.toasts, newToast].slice(-TOAST_LIMIT)
  updateToasts(updatedToasts)

  return {
    id,
    dismiss: () => dismissToast(id),
    update: (props: Omit<ToastProps, "id">) => updateToast(id, props),
  }
}

export function dismissToast(id: string) {
  updateToasts(toastStore.toasts.filter((toast) => toast.id !== id))
}

export function updateToast(id: string, props: Omit<ToastProps, "id">) {
  updateToasts(toastStore.toasts.map((toast) => (toast.id === id ? { ...toast, ...props } : toast)))
}

// React hook for components
export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>(toastStore.toasts)

  useEffect(() => {
    const listener = (newToasts: ToastProps[]) => {
      setToasts([...newToasts])
    }

    toastStore.listeners.add(listener)
    return () => {
      toastStore.listeners.delete(listener)
    }
  }, [])

  return {
    toast,
    toasts,
    dismissToast,
  }
}
