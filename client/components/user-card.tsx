import { Card, CardHeader } from "@heroui/card";
import { Badge } from "@heroui/badge";
import { CheckIcon, EyeSlashFilledIcon } from "@heroui/shared-icons";
import { Avatar } from "@heroui/avatar";
import { Skeleton } from "@heroui/skeleton";
import { UserDTO } from "@/types/user";
import { useRouter } from "next/router";

const UserCard = ({
  user,
  isClickable,
}: {
  user: UserDTO | undefined;
  isClickable?: boolean;
}) => {
  const router = useRouter();

  return (
    <Skeleton isLoaded={!!user}>
      <Card
        isPressable={isClickable}
        onPress={() => router.push(`/artists/${user?.login}`)}
      >
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Badge
              color="warning"
              content={<EyeSlashFilledIcon />}
              isInvisible={!user?.roles.some((role) => role.role === "Admin")}
            >
              <Badge
                color="primary"
                content={<CheckIcon />}
                isInvisible={
                  !user?.roles.some((role) => role.role === "Artist")
                }
              >
                <Avatar isBordered radius="full" size="lg" name={user?.login} />
              </Badge>
            </Badge>
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-2xl font-semibold leading-none text-default-600">
                {user?.login}
              </h4>
              <h5 className="text-large tracking-tight text-default-400">
                {user?.roles.map((role) => role.role + " • ")}
              </h5>
              <h5 className="text-sm tracking-tight text-default-400">
                Created at: {new Date(user?.createdAt || "").toDateString()}
              </h5>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Skeleton>
  );
};

export default UserCard;
