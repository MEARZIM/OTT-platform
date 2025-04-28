
import { useRef, useState, type ChangeEvent } from "react"

import { Button } from "../../../../../components/ui/button"
import FilePreview from "./file-preview"
import { Input } from "../../../../../components/ui/input"
import { Textarea } from "../../../../../components/ui/textarea"
import { Select, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from "../../../../../components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "../../../../../components/ui/popover"
import { Checkbox } from "../../../../../components/ui/checkbox"

const categories = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Grapes', value: 'grapes' },
  { label: 'Pineapple', value: 'pineapple' },
];


function UpLoadVideo() {
  // State to hold the admin input data
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Loadding State
  const [loading, setLoading] = useState(false)

  const toggleCategory = (value: string) => {
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

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
    console.log(title, description, file, categories)
    try {
      setLoading(true)
      // Api call to upload the video
    } catch (error) {
      console.log("Error uploading video:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Upload Video</h1>
        <form onSubmit={handleSubmit}>
          <div className="p-6 rounded-3xl border border-gray-200 bg-white h-auto">


            <div className="grid grid-cols-3 grid-rows-7 gap-2">

              <div
                onClick={handleFileInputClick}
                className="col-span-3 row-span-3 h-fit"
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

              <Input
                type="text"
                placeholder="title input"
                value={title}
                onChange={handleTitleChange}
                className="col-span-2 row-start-4 h-full"
                required
              />

              <div className="row-start-4 col-start-3">
                <Select>
                  <Popover>
                    <PopoverTrigger asChild>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={selectedCategories.length > 0 ? selectedCategories.join(', ') : "Select Categories"} />
                      </SelectTrigger>
                    </PopoverTrigger>
                    <PopoverContent className="w-64">
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        {categories.map((category) => (
                          <div key={category.value} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md">
                            <Checkbox
                              id={category.value}
                              checked={selectedCategories.includes(category.value)}
                              onCheckedChange={() => toggleCategory(category.value)}
                            />
                            <label htmlFor={category.value} className="text-sm">
                              {category.label}
                            </label>
                          </div>
                        ))}
                      </SelectGroup>
                    </PopoverContent>
                  </Popover>
                </Select>
              </div>

              <div className="col-span-3 row-start-5 border border-gray-300 rounded-lg p-4 min-h-[100px]">
                <h2 className="font-semibold mb-2">Selected Categories:</h2>
                {selectedCategories.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {selectedCategories.map((cat) => (
                      <li key={cat}>{cat}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No categories selected.</p>
                )}
              </div>

              <Textarea
                placeholder="description input"
                value={description}
                onChange={handleDescriptionChange}
                className="col-span-3 row-span-2 row-start-6 h-full"
              />



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

export default UpLoadVideo

