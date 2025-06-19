import { title } from "@/components/primitives";
import { getTracks } from "@/api/api-requests";
import { TrackDTO } from "@/types/track";
import { useEffect, useState } from "react";
import { Skeleton } from "@heroui/skeleton";
import { Card, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { Pagination } from "@heroui/pagination";
import NextLink from "next/link";
import { currentTrackState } from "@/store/current-track";

export default function SongsPage() {
  const [tracks, setTracks] = useState<TrackDTO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  useEffect(() => {
    getTracks(limit, 0).then((data) => {
      setTotalPages(data.pages);
      setTracks(data.tracks);
    });
  }, []);

  const changePage = (page: number) => {
    setCurrentPage(page);
    getTracks(limit, limit * (page - 1)).then((data) => setTracks(data.tracks));
  };

  const changeTrack = (track: TrackDTO) => {
    currentTrackState.setTrack(track);
    localStorage.setItem("track", JSON.stringify(track));
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1 className={title()}>List of tracks</h1>
        <Skeleton isLoaded={!!tracks}>
          <div className="grid md:grid-cols-3 gap-4">
            {tracks.map((track, index) => (
              <Card isPressable key={index} onPress={() => changeTrack(track)}>
                <CardHeader className="justify-between">
                  <div className="flex gap-5">
                    <Image
                      isBlurred
                      className="w-16 h-16 lg:w-24 lg:h-24"
                      src={`http://192.168.0.113:3000/covers/${track.cover}`}
                      alt="cover"
                    />
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <h3 className="text-medium lg:text-xl font-semibold leading-none text-default-600">
                        {track.name}
                      </h3>
                      <div className="flex gap-1 items-center">
                        <NextLink
                          href={"/artists/" + track.author.login}
                          className="hover:text-current transition text-small lg:text-medium tracking-tight text-default-400"
                        >
                          {track.author.login}
                        </NextLink>
                      </div>
                      <p className="text-xs lg:text-xs tracking-tight text-default-400">
                        {track.genre}
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Skeleton>
        <Pagination
          showControls
          total={totalPages}
          page={currentPage}
          onChange={(page) => changePage(page)}
        />
      </section>
    </>
  );
}
