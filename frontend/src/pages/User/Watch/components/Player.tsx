import ReactPlayer from "react-player"

const Player = () => {
    return (
        <div className="rounded-lg bg-black mb-4 overflow-hidden">
            <div className="aspect-video w-full bg-black flex items-center justify-center">
                <ReactPlayer
                    controls={true}
                    width={"100%"}
                    height={"100%"}
                    className="mx-auto overflow-hidden rounded-lg"
                    url={`https://www.youtube.com/watch?v=Y4P-z1Qy6xI`}>
                    {/* <span className="text-yellow-400 text-xl md:text-3xl font-bold">Player</span> */}
                </ReactPlayer>
            </div>
        </div>
    )
}

export default Player
