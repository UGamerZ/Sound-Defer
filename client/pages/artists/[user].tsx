import { useEffect, useState } from "react";
import { UserDTO } from "@/types/user";
import { getUser } from "@/api/api-requests";
import { title } from "@/components/primitives";
import UserCard from "@/components/user-card";
import { useRouter } from "next/router";

export default function UserPage() {
  const [user, setUser] = useState<UserDTO | undefined>();
  const router = useRouter();

  useEffect(() => {
    getUser(router.query.user?.toString())
      .then((profile) => setUser(profile))
      .catch((msg) => msg.status === 400 && window.location.replace("/"));
  }, [router.query]);

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1 className={title()}>Artist profile</h1>
        <UserCard user={user} />
      </section>
    </>
  );
}
