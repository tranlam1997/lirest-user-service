import { Signer } from "@aws-sdk/rds-signer";
import config from "config";

const hostname = config.get<string>("postgres.host");
const port = config.get<number>("postgres.port");
const username = config.get<string>("postgres.username");
const region = config.get<string>("aws.region");
const credentials = {
  accessKeyId: config.get<string>("aws.accessKeyId"),
  secretAccessKey: config.get<string>("aws.secretAccessKey"),
}

export default new Signer({
  /**
   * Required. The hostname of the database to connect to.
   */
  hostname,
  /**
   * Required. The port number the database is listening on.
   */
  port,
  /**
   * Required. The username to login as.
   */
  username,
  /**
   * Optional. The AWS credentials to sign requests with. Uses the default credential provider chain in not specified.
   */
  credentials,
  /**
   * Optional. The region the database is located in. Uses the region inferred from the runtime if omitted.
   */
  region,
});
