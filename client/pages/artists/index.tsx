import React, { useEffect, useState } from "react";
import { title } from "@/components/primitives";
import { UserDTO } from "@/types/user";
import { getUsers } from "@/api/api-requests";
import { Pagination } from "@heroui/pagination";
import { Skeleton } from "@heroui/skeleton";
import UserCard from "@/components/user-card";

const ArtistsPage = () => {
  const [artists, setArtists] = useState<UserDTO[] | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  useEffect(() => {
    getUsers(limit, 0).then((data) => {
      setArtists(data.users);
      setTotalPages(data.pages);
    });
  }, []);

  const changePage = (page: number) => {
    setCurrentPage(page);
    getUsers(limit, limit * (page - 1)).then((data) => setArtists(data.users));
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1 className={title()}>Artists</h1>
        <Skeleton isLoaded={!!artists}>
          <div className="grid lg:grid-cols-3 gap-4">
            {artists?.map((artist, index) => (
              <UserCard user={artist} isClickable key={index} />
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
};

export default ArtistsPage;
