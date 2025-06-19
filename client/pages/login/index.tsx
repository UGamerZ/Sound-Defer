import React, { useState } from "react";
import { subtitle, title } from "@/components/primitives";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { login } from "@/api/api-requests";
import FormLayout from "@/layouts/form";

const LoginPage = () => {
  const [sending, setSending] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const loginHandler = () => {
    setIsInvalid(false);
    setSending(true);
    login()
      .then(() => {
        window.location.replace("/");
      })
      .catch(() => {
        setIsInvalid(true);
        setErrorMessage("Invalid login or password");
        setSending(false);
      });
  };

  return (
    <FormLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 ">
        <div className="inline-block max-w-lg text-center justify-center py-8 md:py-10 ">
          <h1 className={title({ color: "pink" })}>Log into account</h1>
          <div className={subtitle({ class: "mt-4" })}>One final step</div>
          <form
            id="login-form"
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
            <Button onPress={loginHandler}>
              {sending ? <Spinner size="sm" color="current" /> : "Login"}
            </Button>
          </form>
        </div>
      </section>
    </FormLayout>
  );
};

export default LoginPage;
