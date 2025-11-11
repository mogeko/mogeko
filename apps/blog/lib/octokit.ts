import { env } from "node:process";
import { importPKCS8, SignJWT } from "jose";
import { UnauthorizedError } from "@/lib/errors";

import "server-only";

export async function discussions() {
  const data = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${await jwt()}`,
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          repository(owner: $owner, name: $name) {
            totalCount
          }
        }
      `,
      variables: {
        owner: "mogeko",
        name: "mogeko",
      },
    }),
  });

  return await data.json();
}

export async function jwt(): Promise<string> {
  const clientId = env.GH_APP_CLIENT_ID;
  const pkcs8 = env.GH_APP_PRIVATE_KEY;

  if (!pkcs8 || !clientId) {
    throw new UnauthorizedError(
      "Missing environment variables for authentication",
    );
  }

  const privateKey = await importPKCS8(pkcs8, "RS256");

  return await new SignJWT({
    iat: Math.floor(Date.now() / 1000 - 60), // issued at time (now - 60 seconds)
    exp: Math.floor(Date.now() / 1000 + 5 * 60), // expiration time (now + 5 minutes)
    iss: clientId, // issuer (GitHub App's identifier)
  })
    .setProtectedHeader({
      alg: "RS256", // algorithm ("RS256" as required by GitHub)
    })
    .sign(privateKey);
}
