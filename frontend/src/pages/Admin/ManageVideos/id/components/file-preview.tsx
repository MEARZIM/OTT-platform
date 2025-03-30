"use client"

import { useState, useRef, type ChangeEvent } from "react"
import { Button } from "../../../../../components/ui/button"

interface FilePreviewProps {
    onFileChange?: (file: File | null) => void
    onTitleChange?: (title: string) => void
    onDescriptionChange?: (description: string) => void
}

export default function FilePreview({ onFileChange, onTitleChange, onDescriptionChange }: FilePreviewProps) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
        if (onTitleChange) onTitleChange(e.target.value)
    }

    const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
        if (onDescriptionChange) onDescriptionChange(e.target.value)
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null
        setFile(selectedFile)

        // Clear previous preview URL
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl)
        }

        // Create a preview URL for the selected file
        if (selectedFile && selectedFile.type.startsWith("video/")) {
            const url = URL.createObjectURL(selectedFile)
            setPreviewUrl(url)
        } else {
            setPreviewUrl(null)
        }

        if (onFileChange) onFileChange(selectedFile)
    }

    const handleFileInputClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Submit the form or perform the desired action
    }

    return (

        <form onSubmit={handleSubmit}>
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
                    {previewUrl ? (
                        <video src={previewUrl} controls className="w-full h-full object-contain" />
                    ) : (
                        <span className="text-gray-500">input file preview</span>
                    )}
                </div>
            </div>
            <div className="flex my-3 justify-end">
                <Button
                    size={"lg"}
                    variant={"destructive"}
                    value={"submit"}
                    type="submit"
                    className="hover:cursor-pointer"
                    disabled={!title || !description || !file}
                >
                    Publish
                </Button>
            </div>

        </form>

    )
}

