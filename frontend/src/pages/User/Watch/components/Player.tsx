import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import Error from "../../../../components/Error";
import UnauthorizedPage from "../../../../components/Unauthorized";
import { useVideo } from "../../../../hooks/use-video";
import Loading from "../../../../components/Loading";
import { useSubscription } from "../../../../hooks/use-subscription";

const Player = () => {
    const { id } = useParams<{ id: string }>();
    const [skipCountdown, setSkipCountdown] = useState(10);
    const [showAd, setShowAd] = useState(false);
    const [adPlayed, setAdPlayed] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");
    const [adUrl, setAdUrl] = useState('');

    const adPlayerRef = useRef<ReactPlayer>(null);
    const mainPlayerRef = useRef<ReactPlayer>(null);

    const { video, loading } = useVideo(id);
    const { subscription } = useSubscription();

    // Set initial state based on subscription and ad presence
    useEffect(() => {
        if (video) {
            if (subscription == null && video?.ad?.url) {
                setShowAd(true);
                setAdPlayed(false);
                setSkipCountdown(10);
            } else {
                setShowAd(false);
                setAdPlayed(true); 
            }
        }
    }, [video, subscription]);

    // Handle countdown for skip button
    useEffect(() => {
        if (showAd && !adPlayed && skipCountdown > 0) {
            const countdown = setInterval(() => {
                setSkipCountdown((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(countdown);
        }
    }, [showAd, adPlayed, skipCountdown]);

    useEffect(() => {
        if (video && video.ad) {
            setVideoUrl(video.url);
            setAdUrl(video.ad.url);
        }
    }, [video]);

    const handleSkipAd = () => {
        setShowAd(false);
        setAdPlayed(true);
    };

    const handleAdEnded = () => {
        handleSkipAd();
    };

    if (!id) return <UnauthorizedPage />;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loading />
            </div>
        );
    }

    if (!video) {
        return (
            <Error
                statusCode={404}
                title="Not Found"
                description="Content not found"
                message="Content not found"
                showLogin={true}
            />
        );
    }


    // console.log(showAd , adUrl , !adPlayed )
    return (
        <div className="rounded-lg dark:bg-black bg-white mb-4 overflow-hidden">
            <div className="aspect-video w-full dark:bg-black bg-white flex items-center justify-center relative">
                {showAd && adUrl && !adPlayed ? (
                    <>
                        <ReactPlayer
                            ref={adPlayerRef}
                            url={adUrl}
                            playing
                            controls={false}
                            onEnded={handleAdEnded}
                            width="100%"
                            height="100%"
                            className="mx-auto overflow-hidden rounded-lg"
                        />
                        {/* Countdown or Skip Button */}
                        <div className="absolute top-4 right-4 z-10">
                            {skipCountdown > 0 ? (
                                <span className="bg-black bg-opacity-70 text-white px-3 py-1 rounded">
                                    Skip in {skipCountdown}...
                                </span>
                            ) : (
                                <button
                                    onClick={handleSkipAd}
                                    className="bg-black bg-opacity-70 text-white px-3 py-1 rounded hover:bg-opacity-90 transition"
                                >
                                    Skip Ad
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <ReactPlayer
                        ref={mainPlayerRef}
                        url={videoUrl}
                        playing
                        controls
                        width="100%"
                        height="100%"
                        className="mx-auto overflow-hidden rounded-lg"
                    />
                )}
            </div>
        </div>
    );
};

export default Player;
