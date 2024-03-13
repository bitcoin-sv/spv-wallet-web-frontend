# SPV Wallet Frontend

The `spv-wallet-web-frontend` is a referential frontend app designed as a part of the **SPV Wallet** which is a custodial wallet for Bitcoin SV.
It utliizes the `spv-wallet` service as a non-custodial wallet in conjunction with the `spv-wallet-web-backend` as a backend server which is responsible for storing user data and private keys.

The frontend is written in React and can be run as a Docker image named `${DOCKERHUB_OWNER}/${DOCKERHUB_REPO}`, exposed on port 80.

## Running as a Docker Image

To run the `spv-wallet-web-frontend` as a Docker image, execute the following command:

```bash
docker run -p 3002:80 -v /path/to/env-config.json:/usr/share/nginx/html/env-config.json ${DOCKERHUB_OWNER}/${DOCKERHUB_REPO}:latest
```

Replace `/path/to/env-config.json` with the actual path to your `env-config.json` file.

This command will run the `spv-wallet-web-frontend` Docker image, exposing it on port 3002. The mounted `env-config.json` file will provide the necessary configuration to the frontend application.

## Configuration

To configure the `spv-wallet-web-frontend` Docker image, you need to create and mount a file named `env-config.json` under the location `/usr/share/nginx/html/env-config.json` in the Docker container.
The configuration file `env-config.json` can contain all or part of the following properties in JSON format:

```json
{
  "apiUrl": "http://localhost:8180",
  "wsUrl": "ws://localhost:8180/api/websocket"
}
```

| Property | Description                                                                                           | Default Value                       |
| -------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `apiUrl` | The URL pointing to the running `spv-wallet-web-backend`, to which this frontend should connect.      | `http://localhost:3002`             |
| `wsUrl`  | The URL pointing to endpoint in `spv-wallet-web-backend`, used for establishing websocket connection. | `ws://localhost:3002/api/websocket` |

You can customize these properties in the `env-config.json` file to fit your specific deployment environment.
