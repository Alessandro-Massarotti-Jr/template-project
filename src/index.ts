import { server } from './server';
import { logger } from './utilities/Logger';

const port = process.env.PORT || 3000;
server.listen(Number(port), () => {
  logger.http({ message: `Http server listening on port: ${port}` });
});
