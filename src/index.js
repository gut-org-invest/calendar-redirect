import { CALENDAR_LINKS } from "./config.js";

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return new Response("ok", {
        status: 200,
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }

    if (CALENDAR_LINKS.length === 0) {
      return new Response("No calendar links configured.", {
        status: 503,
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }

    const index = pickRandomIndex(CALENDAR_LINKS.length);
    const destination = CALENDAR_LINKS[index];

    return Response.redirect(destination, 302);
  },
};

function pickRandomIndex(length) {
  const random = crypto.getRandomValues(new Uint32Array(1))[0];
  return random % length;
}
