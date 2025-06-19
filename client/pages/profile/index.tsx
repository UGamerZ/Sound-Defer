import { useEffect, useState } from "react";
import { UserDTO } from "@/types/user";
import { getProfile } from "@/api/api-requests";
import { title } from "@/components/primitives";
import { Button } from "@heroui/button";
import UserCard from "@/components/user-card";

export default function ProfilePage() {
  const [user, setUser] = useState<UserDTO | undefined>();

  useEffect(() => {
    getProfile()
      .then((profile) => setUser(profile))
      .catch(() => window.location.replace("/"));
  }, []);

  const logout = () => {
    localStorage.setItem("access", "");
    window.location.replace("/");
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1 className={title()}>Your profile</h1>
        <UserCard user={user} />
        <Button color="danger" onPress={logout}>
          Log out
        </Button>
      </section>
    </>
  );
}
