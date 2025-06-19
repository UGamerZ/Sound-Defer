import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { title, subtitle } from "@/components/primitives";
import "swiper/css";
import Slider from "@/components/slider";
import { getProfile } from "@/api/api-requests";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { loggedState } from "@/store/is-logged-in";

const IndexPage = observer(() => {
  const [userLogin, setUserLogin] = useState("");

  useEffect(() => {
    getProfile()
      .then((user) => setUserLogin(user.login))
      .catch(() => setUserLogin(""));
  }, [loggedState.isLogged]);

  return (
    <>
      <Slider />
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          {userLogin ? (
            <>
              <span className={title()}>Welcome back, {userLogin}</span>
              <br />
              <div className={subtitle({ class: "mt-4" })}>
                Ready to jump back in?
              </div>
            </>
          ) : (
            <>
              <span className={title()}>
                Discover, listen and upload songs absolutely for free&nbsp;
              </span>
              <span className={title({ color: "pink" })}>
                anytime, anywhere&nbsp;
              </span>
              <br />
              <div className={subtitle({ class: "mt-4" })}>
                A music service for everybody.
              </div>
            </>
          )}
        </div>
        <div>
          <Link
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href="/songs"
          >
            Discover the songs
          </Link>
        </div>
      </section>
    </>
  );
});

export default IndexPage;
