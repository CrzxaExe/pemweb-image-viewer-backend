import { HTTPHeaders, StatusMap } from "elysia";
import { Cookie, ElysiaCookie } from "elysia/dist/cookies";

const authentication = ({
  set,
  cookie: { session },
}: {
  set: {
    headers: HTTPHeaders;
    status?: number | keyof StatusMap;
    redirect?: string;
    cookie?: Record<string, ElysiaCookie>;
  };
  cookie: Record<string, Cookie<unknown>>;
}) => {};

export default authentication;
