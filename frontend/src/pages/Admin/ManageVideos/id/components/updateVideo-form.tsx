"use client"

import { useState } from "react"
import FilePreview from "./file-preview"
import MuxFilePreview from "./mux-file-preview"

function App() {
  const [file, setFile] = useState<File | null>(null)
  const [useMux, setUseMux] = useState(false)

  const handleFileChange = (newFile: File | null) => {
    setFile(newFile)
    console.log("File selected:", newFile)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Video File Preview</h1>

        <div className="mb-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={useMux} onChange={(e) => setUseMux(e.target.checked)} />
            Use Mux for video processing
          </label>
        </div>

        {useMux ? (
          <MuxFilePreview
            onFileChange={handleFileChange}
            muxTokenId={import.meta.env.VITE_MUX_TOKEN_ID}
            muxTokenSecret={import.meta.env.VITE_MUX_TOKEN_SECRET}
          />
        ) : (
          <FilePreview onFileChange={handleFileChange} />
        )}

        {file && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
            <h2 className="font-semibold mb-2">Selected File:</h2>
            <p>Name: {file.name}</p>
            <p>Type: {file.type}</p>
            <p>Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

