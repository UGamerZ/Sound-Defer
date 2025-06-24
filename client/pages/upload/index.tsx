import { title } from "@/components/primitives";
import { useEffect, useState } from "react";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { createTrack, validateLogin } from "@/api/api-requests";
import { Button } from "@heroui/button";

export default function DocsPage() {
  const [pending, setPending] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    validateLogin().catch(() => window.location.replace("/"));
  }, []);

  const upload = () => {
    setPending(true);
    createTrack()
      .then(() => setMsg("Track uploaded successfully!"))
      .catch(() => setMsg("An error occurred uploading track"))
      .finally(() => setPending(false));
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Upload new track</h1>
          <Form id="track-form" className="m-5 flex-col items-center">
            <Input name="name" label="Track name" />
            <Input name="genre" label="Genre" />
            <Input name="cover" label="Cover" type="file" />
            <Input name="audio" label="Audio file" type="file" />
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
