
import { useRef, useState, type ChangeEvent } from "react"

import { Button } from "../../../../../../components/ui/button"
import FilePreview from "./file-preview"
import { Input } from "../../../../../../components/ui/input"
import { Textarea } from "../../../../../../components/ui/textarea"
import Heading from "../../../../../../components/ui/heading"

interface AddProps {
  initialData: {
      id: string;
      title: string;
      description: string;
      playbackId: string;
  } | null;
}


function UpLoadAdds({ initialData }: AddProps) {
  
  // State to hold the admin input data
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const titleTag = initialData ? "Edit Add": "Upload Adds" ;
  const descriptionTag = initialData ? "Edit your Adds of PrimeView": "Upload your Adds of PrimeView" ;
  const action = initialData ? "Save" : "Publish" ;


  // Loadding State
  const [_, setLoading] = useState(false)

  // Ref to the file input element
  const fileInputRef = useRef<HTMLInputElement>(null)

  // State to hold the preview URL
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

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
      setPreviewUrl("")
    }

    console.log("Selected file:", selectedFile)
  }
  console.log("Preview URL:", previewUrl)

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)

  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)

  }



  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(title, description, file)
    try {
      setLoading(true)
      // Api call to upload the Add
    } catch (error) {
      console.log("Error uploading Add:", error)
    } finally {
      setLoading(false)
    }
  }

  return (<>
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <Heading
        title={titleTag}
        description={descriptionTag}
      />
      <div className="max-w-5xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="p-6 rounded-3xl border border-gray-200 bg-white h-auto">


            <div className="grid grid-cols-6 grid-rows-6 gap-2">

              <div
                onClick={handleFileInputClick}
                className="col-span-6 row-span-4 h-full"
              >
                {file ?
                  <FilePreview previewUrl={previewUrl} /> :
                  <>
                    <div className="flex justify-center items-center h-full border border-gray-300 rounded-lg">
                      <Input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileChange} className="hidden" />
                      <span className="text-gray-500">file input(video)</span>
                    </div>
                  </>
                }

              </div>

              <div className="col-span-6 row-start-5 mt-10">
                <Input
                  type="text"
                  placeholder="Add Title"
                  value={title}
                  onChange={handleTitleChange}

                  required
                />
              </div>



              <div
                className="col-span-6 row-span-2 row-start-6 h-full"
              >
                <Textarea
                  placeholder="Adds Description"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </div>




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
              {action}
            </Button>
          </div>

        </form>





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
  </>
  )
}

export default UpLoadAdds

