import axios from "axios";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useParams } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "../../../../../components/ui/select";
import { BACKEND_URL } from "../../../../../lib/utils";
import { toast } from "../../../../../hooks/use-toast";
import { Label } from "../../../../../components/ui/label";
import { Input } from "../../../../../components/ui/input";
import Heading from "../../../../../components/ui/heading";
import { Button } from "../../../../../components/ui/button";
import { Textarea } from "../../../../../components/ui/textarea";

import SelectAd from "./select-ad";
import FilePreview from "./file-preview";
import SelectCategory from "./select-categories";
import { MultiStepLoader } from "../../../../../components/multi-step-loader";
import { loadingStates } from "./VideoUploadStates";

interface Categories {
  id: string;
  videoId: string;
  categoryId: string
  category: {
    id: string;
    name: string;
  }
}

interface VideoProps {
  initialData: {
    id: string;
    title: string;
    description: string;
    muxAssetId: string;
    playbackId: string;
    thumbnail: string;
    status: string;
    adId: string;
    ad: {
      id: string;
      title: string;
      description: string;
      muxAssetId: string;
      playbackId: string;
      type: string;
    }
    categories: Categories[]
  } | null;
}

function UploadVideo({ initialData }: VideoProps) {
  const { id } = useParams<{ id: string }>();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [status, setStatus] = useState(initialData?.status || "");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialData?.categories.map((c) => c.categoryId) || []);
  const [loading, setLoading] = useState(false);
  const [videoloading, setVideoLoading] = useState(false);
  const [ads, setAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(initialData?.adId || "");

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(initialData?.thumbnail || null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const titleTag = initialData ? "Edit Video" : "Upload Video";
  const descriptionTag = initialData ? "Edit your video details" : "Upload your video";
  const action = initialData ? "Save" : "Publish";
  const toastTitle = initialData ? "Video updated." : "Video created.";
  const toastDesc = initialData ? "Video details updated." : "Video is now active.";

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/api/category/all-categories`);
        setCategories(response.data);

        const res = await axios.get(`${BACKEND_URL}/api/ads`);
        setAds(res.data.ads);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (previewUrl) URL.revokeObjectURL(previewUrl);

    if (selectedFile && selectedFile.type.startsWith("video/")) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0] || null;
    setThumbnail(selectedImage);

    if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);

    if (selectedImage && selectedImage.type.startsWith("image/")) {
      setThumbnailPreview(URL.createObjectURL(selectedImage));
    } else {
      setThumbnailPreview(null);
    }
  };

  const handleFileInputClick = () => fileInputRef.current?.click();
  const handleThumbnailInputClick = () => thumbnailInputRef.current?.click();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setVideoLoading(true);
      const formData = new FormData();
      formData.append("title", title)
      formData.append("description", description)
      formData.append("status", status)
      if (thumbnail) {
        formData.append("thumbnail", thumbnail)
      }
      formData.append("adId", selectedAd)
      formData.append("categoryIds", JSON.stringify(selectedCategories))

      if (initialData) {
        await axios.patch(
          `${BACKEND_URL}/api/content/video/${id}`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            }
          }
        );
      } else {
        if (file) {
          formData.append("video", file)
        }
        await axios.post(`${BACKEND_URL}/api/content/video`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            }
          }
        );
      }

      toast({
        title: toastTitle,
        description: toastDesc,
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setVideoLoading(false);
      setTitle("");
      setDescription("");
      setThumbnail(null);
      setFile(null);
      setCategories([]);
      setPreviewUrl(null);
      setStatus("");
      setSelectedCategories([])
      setAds([]);
      setThumbnail(null);
      setThumbnailPreview(null)
      
      // window.location.reload();
    }
  };

  if (videoloading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <MultiStepLoader
          loadingStates={loadingStates}
          loading={videoloading}
          duration={3000}
          loop={false}
        />
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <Heading title={titleTag} description={descriptionTag} />
      <div className="max-w-5xl mx-auto">
        <form onSubmit={handleSubmit} className="text-black">
          <div className="p-6 rounded-3xl border border-gray-200 bg-white h-auto">
            <div className="flex items-start justify-baseline flex-col">

              {!initialData && (
                <div
                  onClick={handleFileInputClick}
                  className="w-full h-[500px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer mb-4"
                >
                  {file ? (
                    <FilePreview previewUrl={previewUrl} />
                  ) : (
                    <>
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={loading}
                      />
                      <span className="text-gray-500">Click to upload video file</span>
                    </>
                  )}
                </div>
              )}


              <div
                onClick={handleThumbnailInputClick}
                className="w-full h-[180px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer mb-4"
              >
                {thumbnailPreview ? (
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <>
                    <Input
                      ref={thumbnailInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="hidden"
                      disabled={loading}
                    />
                    <span className="text-gray-500">Click to upload thumbnail image</span>
                  </>
                )}
              </div>


              <div className="flex flex-col gap-2 my-4 w-full">
                <Label>Title</Label>
                <Input
                  type="text"
                  placeholder="Video Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              <div className="flex flex-col gap-2 my-4 w-full">
                <Label>Description</Label>
                <Textarea
                  placeholder="Video Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="flex flex-col gap-2 my-4 w-full">
                <Label>Video Status</Label>
                <Select value={status} onValueChange={setStatus} disabled={loading}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Video Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Video Status</SelectLabel>
                      <SelectItem value="PUBLISHED">Published</SelectItem>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="PRIVATE">Private</SelectItem>
                      <SelectItem value="BANNED">Banned</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2 my-4 w-full">
                <SelectAd
                  ads={ads}
                  selectedAd={selectedAd}
                  setSelectedAd={setSelectedAd}
                  loading={loading}
                />
              </div>

              <div className="flex flex-col gap-2 my-4 w-full">
                <SelectCategory
                  categories={categories}
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                  loading={loading}
                />
              </div>

            </div>
          </div>

          <div className="flex my-3 justify-end">
            <Button
              size={"lg"}
              variant={"destructive"}
              type="submit"
              className="hover:cursor-pointer"
              disabled={!title || !description || loading}
            >
              {action}
            </Button>
          </div>
        </form>

        {file && !initialData && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
            <h2 className="font-semibold mb-2">Selected File:</h2>
            <p>Name: {file.name}</p>
            <p>Type: {file.type}</p>
            <p>Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadVideo;
