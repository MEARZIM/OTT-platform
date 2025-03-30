"use client"

import { useState, useRef, type ChangeEvent } from "react"
import MuxPlayer from "@mux/mux-player-react"

interface MuxFilePreviewProps {
  onFileChange?: (file: File | null) => void
  onTitleChange?: (title: string) => void
  onDescriptionChange?: (description: string) => void
  muxTokenId?: string
  muxTokenSecret?: string
}

export default function MuxFilePreview({
  onFileChange,
  onTitleChange,
  onDescriptionChange,
  muxTokenId,
  muxTokenSecret,
}: MuxFilePreviewProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [muxAssetId, setMuxAssetId] = useState<string | null>(null)
  const [muxPlaybackId, setMuxPlaybackId] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    if (onTitleChange) onTitleChange(e.target.value)
  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
    if (onDescriptionChange) onDescriptionChange(e.target.value)
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)

    // Clear previous preview URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    // Create a temporary preview URL for the selected file
    if (selectedFile && selectedFile.type.startsWith("video/")) {
      const url = URL.createObjectURL(selectedFile)
      setPreviewUrl(url)

      // If Mux credentials are provided, upload to Mux
      if (muxTokenId && muxTokenSecret && selectedFile) {
        await uploadToMux(selectedFile)
      }
    } else {
      setPreviewUrl(null)
    }

    if (onFileChange) onFileChange(selectedFile)
  }

  const uploadToMux = async (videoFile: File) => {
    try {
      setIsUploading(true)

      // 1. Create a direct upload URL from your backend
      const response = await fetch("/api/mux/upload-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: videoFile.name,
          fileContentType: videoFile.type,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get upload URL")
      }

      const { video } = await response.json()

      // 3. Poll for asset readiness and get playback ID
      const assetResponse = video.muxAssetId
      const playbackId = video.playbackId

      if (playbackId) {
        setMuxAssetId(assetResponse)
        setMuxPlaybackId(playbackId)
      }
    } catch (error) {
      console.error("Error uploading to Mux:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 rounded-3xl border border-gray-200 bg-white">
      <div className="flex flex-col gap-4 w-full md:w-1/3">
        <input
          type="text"
          placeholder="title input"
          value={title}
          onChange={handleTitleChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="description input"
          value={description}
          onChange={handleDescriptionChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div
          onClick={handleFileInputClick}
          className="flex items-center justify-center h-32 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
        >
          <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileChange} className="hidden" />
          <span className="text-gray-500">file input(video)</span>
        </div>
      </div>

      <div className="w-full md:w-2/3 h-64 md:h-auto border border-gray-300 rounded-2xl overflow-hidden flex items-center justify-center bg-gray-50">
        {isUploading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-500">Uploading to Mux...</p>
          </div>
        ) : muxPlaybackId ? (
          <MuxPlayer playbackId={muxPlaybackId} streamType="on-demand" className="w-full h-full" />
        ) : previewUrl ? (
          <video src={previewUrl} controls className="w-full h-full object-contain" />
        ) : (
          <span className="text-gray-500">input file preview</span>
        )}
      </div>
    </div>
  )
}

