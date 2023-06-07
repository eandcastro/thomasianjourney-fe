import ky from "ky";
import { NextApiRequest, NextApiResponse } from "next";

export async function apiHandler(
  path: string,
  accessToken?: string,
  requestMethod?: string,
  res?: NextApiResponse,
  req?: NextApiRequest
) {
  let responsePayload: NextApiResponse;
  let kyResponse: any;

  try {
    const headers: { [key: string]: any } = {
      "Content-Type": "application/json",
      Accepts: "application/json",
    };

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const requestBody = req?.body ? JSON.parse(req?.body) : {};

    if (
      requestBody?.isPublicRequest !== undefined &&
      requestBody?.isPublicRequest
    ) {
      headers["x-tj-api-security-token"] = process.env.TJ_SECURITY_TOKEN;
    }

    delete requestBody["isPublicRequest"];

    const kyApi = ky.create({ prefixUrl: process.env.TJ_API_BASE_URL });

    console.log("headers", headers);
    switch (requestMethod || req?.method) {
      case "GET":
        kyResponse = await kyApi.get(path, {
          headers,
        });
        break;
      case "POST":
        kyResponse = await kyApi.post(path, {
          headers,
          body: JSON.stringify(requestBody),
        });
        break;
      case "PATH":
        kyResponse = await kyApi.patch(path, {
          headers,
        });
        break;
      case "PUT":
        kyResponse = await kyApi.put(path, {
          headers,
        });
        break;
      case "DELETE":
        kyResponse = await kyApi.delete(path, {
          headers,
        });
        break;
      default:
        kyResponse = await kyApi.get(path, {
          headers,
        });
        break;
    }

    responsePayload = await kyResponse.json();

    console.log("status HERE", kyResponse.status);
    console.log("RESPONSE HERE", responsePayload);
    return { statusCode: kyResponse.status, responsePayload };
  } catch (error: any) {
    console.log("RAW error", error);
    responsePayload = await error.response.json();
    // statusCode = error.response.status;

    console.log("real error here", responsePayload);
    throw error;
  }
}
