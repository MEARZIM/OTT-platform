
import { useRef, useState, type ChangeEvent } from "react"

import { Button } from "../../../../../../components/ui/button"
// import FilePreview from "./file-preview"
import { Input } from "../../../../../../components/ui/input"
import { Textarea } from "../../../../../../components/ui/textarea"
import Heading from "../../../../../../components/ui/heading"
import { Label } from "../../../../../../components/ui/label"
import FilePreview from "./file-preview"
import { BACKEND_URL } from "../../../../../../lib/utils"
import axios from "axios"
import { useParams } from "react-router-dom"
import { toast } from "../../../../../../hooks/use-toast"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../../../../../components/ui/select"

interface AddProps {
  initialData: {
    id: string;
    title: string;
    description: string;
    playbackId: string;
    offsetSeconds: number;
    type: string;
  } | null;
}


function UpLoadAdds({ initialData }: AddProps) {

  const { id } = useParams<{ id: string }>();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [type, setType] = useState(initialData?.type || "");
  const [offsetSeconds, setOffsetSeconds] = useState(initialData?.offsetSeconds?.toString() || "");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null)

  const titleTag = initialData ? "Edit Add" : "Upload Adds";
  const descriptionTag = initialData ? "Edit your Adds of PrimeView" : "Upload your Adds of PrimeView";
  const action = initialData ? "Save" : "Publish";
  const toastTitle = initialData ? "Ads updated." : "Ads created.";
  const toastDesc = initialData ? "Ads details updated." : "Ads is now active.";







  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)


    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }


    if (selectedFile && selectedFile.type.startsWith("video/")) {
      const url = URL.createObjectURL(selectedFile)
      setPreviewUrl(url)
    } else {
      setPreviewUrl("")
    }

    console.log("Selected file:", selectedFile)
  }


  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log(title, description, file)
    try {
      setLoading(true)

      
      if (initialData) {
        await axios.patch(`${BACKEND_URL}/api/ads/${id}`, {
          title,
          description,
          offsetSeconds: Number(offsetSeconds) || 60,
          type,
        })
      } else {
        await axios.post(`${BACKEND_URL}/api/ads`, {
          title,
          description,
          offsetSeconds: Number(offsetSeconds) || 60,
          type,
          file
        })
      }

      toast({
        title: toastTitle,
        description: toastDesc,
        variant: "default",
      })

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false)
      window.location.reload()
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


            <div className="flex items-start justify-baseline flex-col" >

              {!initialData && <div
                onClick={handleFileInputClick}
                className="w-full h-[180px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer mb-4"
              >
                {file ?
                  <FilePreview previewUrl={previewUrl} /> :
                  <>
                    <div className="flex justify-center items-center h-full w-sm border border-gray-300 rounded-lg">
                      <Input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileChange} className="hidden" />
                      <span className="text-gray-500">file input(video)</span>
                    </div>
                  </>
                }

              </div>}

              <div className="flex flex-col gap-2 my-4 w-full">
                <Label>Title</Label>
                <Input
                  type="text"
                  placeholder="Add Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-2 my-4 w-full">
                <Label>Description</Label>
                <Textarea
                  placeholder="Adds Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2 my-4 w-full">
                <Label>Ad Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a ad type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Ad Types</SelectLabel>
                      <SelectItem value="PREROLL">Pre-roll</SelectItem>
                      <SelectItem value="MIDROLL">Mid-roll</SelectItem>
                      <SelectItem value="POSTROLL">Post-roll</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2 my-4 w-full">
                <Label>Offset Seconds</Label>
                <Input
                  type="number"
                  placeholder="e.g., 30"
                  value={offsetSeconds}
                  onChange={(e) => setOffsetSeconds(e.target.value)}
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
              disabled={!title || !description || loading}
            >
              {action}
            </Button>
          </div>

        </form>





        {(file && !initialData) && (
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

