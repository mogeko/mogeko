import { importPKCS8, SignJWT } from "jose";

export async function jwt(): Promise<string> {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const pkcs8 = process.env.APP_PRIVATE_KEY;

  if (!pkcs8 || !clientId) {
    throw new Error("Missing environment variables for authentication.");
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
