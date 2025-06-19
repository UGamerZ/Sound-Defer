import React, { useState } from "react";
import { subtitle, title } from "@/components/primitives";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { register } from "@/api/api-requests";
import FormLayout from "@/layouts/form";
import { Link } from "@heroui/link";

const RegisterPage = () => {
  const [sending, setSending] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const registerHandler = () => {
    setIsInvalid(false);
    setSuccess(false);
    setSending(true);
    register()
      .then(() => {
        setSending(false);
        setSuccess(true);
      })
      .catch(() => {
        setIsInvalid(true);
        setErrorMessage(
          "User with such login already exists or invalid credentials were supplied",
        );
        setSending(false);
      });
  };

  return (
    <FormLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 ">
        <div className="inline-block max-w-lg text-center justify-center py-8 md:py-10 ">
          <h1 className={title({ color: "pink" })}>Register account</h1>
          <div className={subtitle({ class: "mt-4" })}>
            Dozens of songs are waiting for you
          </div>
          <form
            id="register-form"
            className="max-w-xs justify-self-center flex flex-col items-center justify-center gap-4 py-8 md:py-10 "
          >
            <Input
              name="login"
              errorMessage={errorMessage}
              isInvalid={isInvalid}
              isRequired
              label="Login"
            />
            <Input
              name="password"
              isInvalid={isInvalid}
              isRequired
              label="Password"
            />
            <Button onPress={registerHandler}>
              {sending ? <Spinner size="sm" color="current" /> : "Register"}
            </Button>
          </form>
          {success && (
            <>
              <p className={subtitle({ class: "mt-4" })}>Register success!</p>
              <Link href="/login">Now you can log into created profile</Link>
            </>
          )}
        </div>
      </section>
    </FormLayout>
  );
};

export default RegisterPage;
