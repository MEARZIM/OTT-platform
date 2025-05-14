import ReactPlayer from "react-player"
import { useParams } from "react-router-dom";

import Error from "../../../../components/Error"
import UnauthorizedPage from "../../../../components/Unauthorized";
import { useVideo } from "../../../../hooks/use-video";
import Loading from "../../../../components/Loading";


const Player = () => {

    const { id } = useParams<{ id: string }>();
    if (!id) {
        return <UnauthorizedPage />
    }


    const { video, loading } = useVideo(id);

    if (loading) {
        return (
            <>
                <div className="min-h-screen flex items-center justify-center">
                    <Loading />
                </div>
            </>
        )
    }

    if (video === null || !video) {
        return (
            <>
                <Error
                    statusCode={404}
                    title="Not Found"
                    description="Content not found"
                    message="Content not found"
                    showLogin={true}
                />

            </>
        )
    }
    
    return (
        <div className="rounded-lg dark:bg-black bg-white mb-4 overflow-hidden">
            <div className="aspect-video w-full dark:bg-black bg-white flex items-center justify-center">
                <ReactPlayer
                    controls={true}
                    width={"100%"}
                    height={"100%"}
                    className="mx-auto overflow-hidden rounded-lg"
                    url={video.url}>
                    {/* <span className="text-yellow-400 text-xl md:text-3xl font-bold">Player</span> */}
                </ReactPlayer>
            </div>
        </div>
    )
}

export default Player
