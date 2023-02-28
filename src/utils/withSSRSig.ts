import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

export function withSSRSig(fn: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const cookies = parseCookies(ctx);

    if (!cookies["user.token"]) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return await fn(ctx);
  };
}
