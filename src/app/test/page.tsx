"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { api } from '@/trpc/client'

const page = () => {
  async function sendMessage() {
    const response = await api.message.sendWhatsappMessage.mutate({to:"whatsapp:+919841078740", message: "test"}) 
    console.log(response)
  }

  return (
    <>
      <Button onClick={sendMessage}>Test Whatsapp Messaging</Button>
    </>
  )
}

export default page