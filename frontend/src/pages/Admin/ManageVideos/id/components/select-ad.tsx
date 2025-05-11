import { Label } from "../../../../../components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../../../../../components/ui/select";

interface Ad {
    id: string;
    title: string;
    description: string;
    // videoUrl: string;
}

interface SelectAdProps {
    ads: Ad[] | null;
    selectedAd: string;
    setSelectedAd: (ad: string) => void;
    loading: boolean
}

const SelectAd = ({ ads, selectedAd, setSelectedAd, loading }: SelectAdProps) => {
    const userSelectedAd = ads?.find((ad) => ad.id === selectedAd);
    return (
        <>
            <Label>Select Ad</Label>
            <Select value={selectedAd} onValueChange={setSelectedAd} disabled={loading}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select any one ad" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Select Ad</SelectLabel>
                        {ads?.map((ad: {
                            id: string
                            title: string,
                            description: string
                        }) => (

                            <SelectItem key={ad.id} value={ad.id} >
                                {!userSelectedAd ? (
                                    <div className="flex items-center gap-4">
                                        <video
                                            // src={ad.videoUrl}
                                            src={"https://www.youtube.com/watch?v=ilNt2bikxDI&list=RDPUAp6xd8D1g&index=2"}
                                            className="w-20 h-12 object-cover rounded-md border"
                                            muted
                                            playsInline
                                        />
                                        <div className="flex flex-col">
                                            <span className="font-medium text-sm">{ad.title}</span>
                                            <span className="text-xs text-muted-foreground line-clamp-1">
                                                {ad.description}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-start">
                                        <span className="font-medium text-xs">{ad.title}</span>
                                        <span className="text-[10px] text-muted-foreground line-clamp-1">
                                            {ad.description}
                                        </span>
                                    </div>
                                )}
                            </SelectItem>
                        ))}

                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}

export default SelectAd
