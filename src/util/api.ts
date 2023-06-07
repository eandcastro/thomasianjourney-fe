import ky from "ky";
import { NextApiRequest, NextApiResponse } from "next";

export async function apiHandler(
  accessToken: string,
  path: string,
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

    const kyApi = ky.create({ prefixUrl: process.env.TJ_API_BASE_URL });

    switch (requestMethod || req?.method) {
      case "GET":
        kyResponse = await kyApi.get(path, {
          headers,
        });
        break;
      case "POST":
        kyResponse = await kyApi.post(path, {
          headers,
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

    return { statusCode: kyResponse.status, responsePayload };
  } catch (error: any) {
    console.log("error here", error);
    responsePayload = await error.response.json();
    // statusCode = error.response.status;

    throw error;
  }
}
