import { title } from "@/components/primitives";
import { ChangeEvent, useEffect, useState } from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { createTrack, validateLogin } from "@/api/api-requests";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { PauseCircleIcon, PlayIcon } from "@/components/icons";

let audio: HTMLAudioElement;

export default function UploadPage() {
  const [pending, setPending] = useState(false);
  const [msg, setMsg] = useState("");
  const [cover, setCover] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");

  useEffect(() => {
    audio = new Audio();
    validateLogin().catch(() => window.location.replace("/"));
  }, []);

  useEffect(() => {
    audio.src = audioUrl;
  }, [audioUrl]);

  const upload = () => {
    setPending(true);
    createTrack()
      .then(() => setMsg("Track uploaded successfully!"))
      .catch(() => setMsg("An error occurred uploading track"))
      .finally(() => setPending(false));
  };

  const loadCover = (e: ChangeEvent<HTMLInputElement>) => {
    if (FileReader && e.target.files?.length) {
      const fileReader = new FileReader();
      fileReader.onload = function () {
        if (typeof fileReader.result === "string") {
          setCover(fileReader.result);
        }
      };
      fileReader.readAsDataURL(e.target.files[0]);
    } else console.warn("no files or FR is unsupported");
  };

  const loadAudio = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPlaying(false);
    if (FileReader && e.target.files?.length) {
      const fileReader = new FileReader();
      fileReader.onload = function () {
        if (typeof fileReader.result === "string") {
          setAudioUrl(fileReader.result);
        }
      };
      fileReader.readAsDataURL(e.target.files[0]);
    } else console.warn("no files or FR is unsupported");
  };

  const playPreview = () => {
    isPlaying ? audio.pause() : audio.play();
    setIsPlaying((prevState) => !prevState);
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Upload new track</h1>
          <Form id="track-form" className="mt-5 flex-col items-center">
            <div className="flex gap-2">
              <Image
                className="w-12 h-12 sm:w-24 sm:h-24 lg:w-32 lg:h-32"
                isBlurred
                alt="cover"
                src={cover}
              />
              <div className="flex flex-col gap-1 items-start justify-evenly">
                <Input size="sm" name="name" label="Track name" />
                <Input size="sm" name="genre" label="Genre" />
              </div>
            </div>
            <Input
              name="cover"
              onChange={loadCover}
              accept="image/*"
              label="Cover"
              type="file"
            />
            <div className="flex gap-2 items-center">
              <Input
                accept="audio/*"
                name="audio"
                label="Audio file"
                onChange={loadAudio}
                type="file"
              />
              <Button
                size="md"
                isIconOnly
                className="data-[hover]:bg-foreground/10"
                radius="full"
                variant="light"
                onPress={playPreview}
              >
                {isPlaying ? (
                  <PauseCircleIcon size={38} />
                ) : (
                  <PlayIcon size={32} />
                )}
              </Button>
            </div>
            <Button onPress={upload} isLoading={pending}>
              Upload
            </Button>
          </Form>
          <p>{msg}</p>
        </div>
      </section>
    </>
  );
}
