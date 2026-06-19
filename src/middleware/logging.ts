import { Terminal } from "../utils/Terminal";

const logger = ({ request }: { request: Request }) => {
  Terminal.log(request.method, request.url);
};

export default logger;
