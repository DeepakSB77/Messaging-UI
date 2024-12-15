'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Search, MoreVertical, ChevronDown, UserCircle2, X, Send, Paperclip, ImageIcon } from 'lucide-react'

export default function ChatInterface() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [message, setMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message)
      setMessage('')
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      console.log('File selected:', file.name)
      // Here you would typically upload the file and send it in the chat
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <div className="w-80 border-r flex flex-col">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search"
              className="pl-8"
            />
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            <div>
              <h2 className="text-sm font-semibold mb-2">Friends</h2>
              <div className="space-y-2">
                {["Marvin McKinney", "Wade Warren", "Eleanor Pena", "Jane Cooper", "Kristin Watson", "Dianne Russell"].map((friend) => (
                  <div
                    key={friend}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors duration-200"
                  >
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                      <AvatarFallback>{friend[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <div className="font-medium">{friend}</div>
                      <div className="text-sm text-muted-foreground truncate">
                        Hey, have you noticed how much...
                      </div>
                    </div>
                    {friend === "Eleanor Pena" && (
                      <Badge variant="destructive" className="rounded-full h-5 w-5 p-0 flex items-center justify-center">
                        2
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold mb-2">Group</h2>
              <div className="space-y-2">
                {["Artistic Visions", "Retro Renaissance", "Surreal Symphony Society", "The Palette"].map((group) => (
                  <div
                    key={group}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors duration-200"
                  >
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                      <AvatarFallback>{group[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <div className="font-medium">{group}</div>
                      <div className="text-sm text-muted-foreground truncate">
                        Speaking of which, I saw an art e...
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
              <AvatarFallback>KW</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">Kristin Watson</div>
              <div className="text-sm text-muted-foreground">Online 7m ago</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                    <UserCircle2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isProfileOpen ? 'Hide Profile' : 'Show Profile'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                  <AvatarFallback>KW</AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3">
                  Hey bro!
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground rounded-lg p-3">
                  What sup?
                </div>
              </div>
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                  <AvatarFallback>KW</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="bg-muted rounded-lg p-3">
                    Lately I'm learning about an art style called Retro
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    While the main vintage color tones are deep, warm colors, the Retro style is more colorful when the main color tones are pastel.
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Profile Sidebar */}
          {isProfileOpen && (
            <div className="w-80 border-l p-6 overflow-y-auto">
              <div className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={`/placeholder.svg?height=96&width=96`} />
                  <AvatarFallback>KW</AvatarFallback>
                </Avatar>
                <h2 className="font-semibold text-xl mb-4">Kristin Watson</h2>
                
                <div className="space-y-4 text-left">
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div>kristinwatson@gmail.com</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Phone number</div>
                    <div>(315) 769-5899</div>
                  </div>
                </div>

                <Accordion type="single" collapsible className="mt-6">
                  <AccordionItem value="information">
                    <AccordionTrigger>Information</AccordionTrigger>
                    <AccordionContent>
                      Additional information here
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="chat-setting">
                    <AccordionTrigger>Chat setting</AccordionTrigger>
                    <AccordionContent>
                      Chat settings and preferences
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="files">
                    <AccordionTrigger>File, Attachments</AccordionTrigger>
                    <AccordionContent>
                      Shared files and attachments
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="links">
                    <AccordionTrigger>Link</AccordionTrigger>
                    <AccordionContent>
                      Shared links
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="media">
                    <AccordionTrigger>Image, Video</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-3 gap-2">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className="aspect-square rounded-lg bg-muted" />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          )}
        </div>

        <div className="border-t p-4">
          <div className="flex items-center gap-2">
            <Input 
              placeholder="Type a message..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()}>
                    <Paperclip className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Attach File
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => imageInputRef.current?.click()}>
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Attach Image
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="default" size="icon" onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Send Message
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />
          <input
            type="file"
            ref={imageInputRef}
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>
    </div>
  )
}

