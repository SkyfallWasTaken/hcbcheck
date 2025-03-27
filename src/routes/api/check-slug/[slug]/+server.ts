import {
  HCB_ORG,
  BANK_SESSION,
  MAIN_SESSION_TOKEN,
  HCB_CSRF_TOKEN,
} from "$env/static/private";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params }) => {
  const response = await fetch(
    `https://hcb.hackclub.com/${HCB_ORG}/validate_slug`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": HCB_CSRF_TOKEN,
        Cookie: `_bank_session=${encodeURIComponent(
          BANK_SESSION
        )}; session_token=${encodeURIComponent(MAIN_SESSION_TOKEN)}`,
      },
      body: JSON.stringify({
        value: params.slug,
      }),
    }
  );

  const data = await response.json();
  return json(data);
};
