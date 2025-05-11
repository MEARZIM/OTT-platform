
interface FilePreviewProps {
    previewUrl: string | null
}

export default function FilePreview({ previewUrl }: FilePreviewProps) {




    return (

        <div className="w-full h-[180px] md:h-auto border border-gray-300 rounded-2xl overflow-hidden flex items-center justify-center bg-gray-50">
            {previewUrl ? (
                <video src={previewUrl} controls className="w-full h-[500px] object-contain" />
            ) : (
                <span className="text-gray-500">input file preview</span>
            )}
        </div>

    )
}

