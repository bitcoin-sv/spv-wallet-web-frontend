# BUX Wallet Frontend

The `bux-wallet-frontend` is a referential frontend application for a custodial web wallet. 
It is used in conjunction with the `bux-wallet-backend` component, which serves as the backend server. The frontend is written in React and can be run as a Docker image named `${DOCKERHUB_OWNER}/${DOCKERHUB_REPO}`, exposed on port 3002.

## Running as a Docker Image

To run the `bux-wallet-frontend` as a Docker image, execute the following command:

```bash
docker run -p 3002:3002 -v /path/to/env-config.json:/usr/share/nginx/html/env-config.json ${DOCKERHUB_OWNER}/${DOCKERHUB_REPO}:latest
```

Replace `/path/to/env-config.json` with the actual path to your `env-config.json` file.

This command will run the `bux-wallet-frontend` Docker image, exposing it on port 3002. The mounted `env-config.json` file will provide the necessary configuration to the frontend application.

## Configuration

To configure the `bux-wallet-frontend` Docker image, you need to create and mount a file named `env-config.json` under the location `/usr/share/nginx/html/env-config.json` in the Docker container.
The configuration file `env-config.json` can contain all or part of the following properties in JSON format:

```json
{
  "apiUrl": "http://localhost:3002",
  "paymailDomain": "4chain.space"
}
```

| Property        | Description                                                                                       | Default Value    |
|-----------------|---------------------------------------------------------------------------------------------------|------------------|
| `apiUrl`        | The URL pointing to the running `bux-wallet-backend`, to which this frontend should connect.     | `http://localhost:3002` |
| `paymailDomain` | The paymail domain used to provide a user of this app with their paymail address for BSV transfers. | `4chain.space`   |

You can customize these properties in the `env-config.json` file to fit your specific deployment environment.

