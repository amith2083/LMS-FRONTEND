"use client";
import { usePlaybackSignedUrl } from "@/app/hooks/useLesssonQueries";
import { useEffect, useState } from "react";

export const VideoPlayer = ({ videoKey }: { videoKey: string }) => {
  //  const { data, isLoading, isError } = usePlaybackSignedUrl().mutateAsync
  //   ? { data: null, isLoading: true, isError: false }
  //   : usePlaybackSignedUrl(); // fallback for SSR

  const { mutateAsync } = usePlaybackSignedUrl();
  const [signedUrl, setSignedUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchSignedUrl = async () => {
      try {
        const data = await mutateAsync({ key: videoKey });
        setSignedUrl(data.signedUrl)
        
        console.log('urlget',data.signedUrl)
      } catch (err) {
        console.error("Failed to load signed URL", err);
      }
    };

    fetchSignedUrl();
  }, [videoKey,mutateAsync]);

  if (!signedUrl) return <p>No video uploaded yet</p>;

  return (
    <div className="relative aspect-video">
      <video
        src={signedUrl}
        controls
        preload="metadata"
        className="w-full h-full"
      />
    </div>
  );
};




// "use client";

// export const VideoPlayer = ({url}) => {
//   return (
//     <div className="relative aspect-video">
//       <iframe
//         className="w-full h-full"
//        src={url} title="YouTube video player" frameBorder="0" 
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//         referrerPolicy="strict-origin-when-cross-origin"
        
//       ></iframe>
//     </div>
//   );
// };
