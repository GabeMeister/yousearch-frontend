const BACKEND_API = import.meta.env.VITE_BACKEND_API;

export function getQueryStr(query: any = {}) {
  return new URLSearchParams(query).toString();
}

const Fetcher = {
  get: async function (endpoint: string): Promise<any> {
    const r = await fetch(BACKEND_API + endpoint, {
      method: "GET",
    });

    return await r.json();
  },

  post: async function (
    endpoint: string,
    query: any = {},
    body: any = {}
  ): Promise<any> {
    const r = await fetch(BACKEND_API + endpoint + "?" + getQueryStr(query), {
      method: "POST",
      body: JSON.stringify(body),
    });

    return await r.json();
  },
};

export default Fetcher;
