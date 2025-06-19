import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import React from "react";
import {
  CloseIcon,
  HeartIcon,
  NextIcon,
  PauseCircleIcon,
  PreviousIcon,
  RepeatOneIcon,
  ShuffleIcon,
} from "@/components/icons";
import { Slider } from "@heroui/slider";
import { Image } from "@heroui/image";
import { observer } from "mobx-react-lite";
import { currentTrackState } from "@/store/current-track";
import NextLink from "next/link";
import { loggedState } from "@/store/is-logged-in";
import { useRouter } from "next/router";

const Footer = observer(() => {
  const [liked, setLiked] = React.useState(false);
  const [play, setPlay] = React.useState(false);
  const router = useRouter();

  const removeSong = () => {
    currentTrackState.setTrack(undefined);
    localStorage.removeItem("track");
  };

  return (
    <footer className="sticky bottom-0">
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50"
        shadow="sm"
      >
        <CardBody>
          <div className="flex gap-5 md:gap-4 items-center justify-center">
            <Image
              isBlurred
              alt="Album cover"
              className="object-cover w-16 h-16 sm:h-32 sm:w-32"
              shadow="md"
              src={
                "http://192.168.0.113:3000/covers/" +
                currentTrackState.currentTrack?.cover
              }
            />

            <div className="flex flex-col col-span-6 md:col-span-8 w-5/6">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0">
                  <h3 className="text-small font-semibold text-foreground/90">
                    {currentTrackState.currentTrack?.name}
                  </h3>
                  <NextLink
                    href={
                      "/artists/" + currentTrackState.currentTrack?.author.login
                    }
                    className="text-xs text-foreground/80"
                  >
                    {currentTrackState.currentTrack?.author.login}
                  </NextLink>
                </div>
                <div className="flex gap-1">
                  <Button
                    isIconOnly
                    size="sm"
                    className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-1 translate-x-1"
                    radius="full"
                    variant="light"
                    isDisabled={!currentTrackState.currentTrack}
                    onPress={() =>
                      loggedState.isLogged
                        ? setLiked((v) => !v)
                        : router.push("/login")
                    }
                  >
                    <HeartIcon
                      size={22}
                      className={liked ? "[&>path]:stroke-transparent" : ""}
                      fill={liked ? "currentColor" : "none"}
                    />
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-1 translate-x-1"
                    radius="full"
                    variant="light"
                    isDisabled={!currentTrackState.currentTrack}
                    onPress={removeSong}
                  >
                    <CloseIcon size={26} />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col mt-1 gap-1">
                <Slider
                  isDisabled={!currentTrackState.currentTrack}
                  aria-label="Music progress"
                  classNames={{
                    track: "bg-default-500/30",
                    thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
                  }}
                  color="foreground"
                  defaultValue={33}
                  size="sm"
                />
                <div className="flex justify-between">
                  <p className="text-xs">1:23</p>
                  <p className="text-xs text-foreground/50">4:32</p>
                </div>
              </div>

              <div className="flex w-full items-center justify-center">
                <Button
                  isIconOnly
                  className="data-[hover]:bg-foreground/10"
                  size="sm"
                  radius="full"
                  variant="light"
                >
                  <RepeatOneIcon size={18} className="text-foreground/80" />
                </Button>
                <Button
                  isIconOnly
                  size="sm"
                  className="data-[hover]:bg-foreground/10"
                  radius="full"
                  variant="light"
                >
                  <PreviousIcon size={20} />
                </Button>
                <Button
                  size="sm"
                  isIconOnly
                  className="w-auto h-auto data-[hover]:bg-foreground/10"
                  radius="full"
                  variant="light"
                >
                  <PauseCircleIcon size={40} />
                </Button>
                <Button
                  size="sm"
                  isIconOnly
                  className="data-[hover]:bg-foreground/10"
                  radius="full"
                  variant="light"
                >
                  <NextIcon size={20} />
                </Button>
                <Button
                  size="sm"
                  isIconOnly
                  className="data-[hover]:bg-foreground/10"
                  radius="full"
                  variant="light"
                >
                  <ShuffleIcon size={18} className="text-foreground/80" />
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </footer>
  );
});

export default Footer;
