"use client";

import { useRouter } from "next/navigation";
import { usePlaybackSignedUrl } from "@/app/hooks/useLesssonQueries";
import { useEffect, useState } from "react";
import { createWatch } from "@/app/service/watchService";
import { useCreateWatch } from "@/app/hooks/useWatchQueries";

export const LessonVideo = ({
  courseId,
  lesson,
  moduleId,
}: {
  courseId: string;
  lesson: { _id: string; videoKey?: string };
  moduleId: string;
}) => {
  const router = useRouter();

  const [hasWindow, setHasWindow] = useState(false);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0); // seconds

  const { mutateAsync:getPlaybackSignerUrl } = usePlaybackSignedUrl();
  const { mutateAsync:createWatch } = useCreateWatch();


  /* --------------------------------------------------------------
     1. SSR safety – make sure `window` exists
     -------------------------------------------------------------- */
  useEffect(() => {
    if (typeof window !== "undefined") setHasWindow(true);
  }, []);

  /* --------------------------------------------------------------
     2. Get a signed S3 URL for the video
     -------------------------------------------------------------- */
  useEffect(() => {
    if (!lesson?.videoKey) return;

    const fetchUrl = async () => {
      try {
        const { signedUrl } = await getPlaybackSignerUrl({ key: lesson.videoKey });
        setSignedUrl(signedUrl);
      } catch (e) {
        console.error("Signed URL error:", e);
      }
    };
    fetchUrl();
  }, [lesson?.videoKey, getPlaybackSignerUrl]);

  /* --------------------------------------------------------------
     3. Send “started” to your API
     -------------------------------------------------------------- */
  useEffect(() => {
    if (!started) return;

    const send = async () => {
       await createWatch({courseId, lessonId:lesson._id, moduleId, state:"started", lastTime:0});
     
      setStarted(false); // reset so we only fire once
    };
    send();
  }, [started, courseId, lesson._id, moduleId]);

  /* --------------------------------------------------------------
     4. Send “completed” to your API
     -------------------------------------------------------------- */
  useEffect(() => {
    if (!ended) return;

    const send = async () => {
    
    const res=   await createWatch({courseId,
                     lessonId:lesson._id,
                    moduleId,
                    state:"completed", 
                     lastTime:duration});
      if (res.ok) {
        setEnded(false);
        router.refresh();
      }
    };
    send();
  }, [ended, courseId, lesson._id, moduleId, duration, router]);

  if (!hasWindow) return <p>Loading player…</p>;
  if (!signedUrl) return <p>No video uploaded yet</p>;

  
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <video
        src={signedUrl}
        controls
        preload="metadata"
        className="w-full rounded-lg shadow-lg"
        style={{ height: "470px" }} // same height you used before
        onPlay={() => {
        
          setStarted(true);
        }}
        onEnded={() => {
          
          setEnded(true);
        }}
        onLoadedMetadata={(e) => {
          const vid = e.currentTarget as HTMLVideoElement;
          const dur = vid.duration;
        
          setDuration(dur);
        }}
        onTimeUpdate={(e) => {
          const vid = e.currentTarget as HTMLVideoElement;
          const secs = vid.currentTime;
          setProgress(secs);
          // you can debounce & send progress to /api/lesson-watch if you want
        }}
      >
        Your browser does not support the video tag.
      </video>

   
    </div>
  );
};