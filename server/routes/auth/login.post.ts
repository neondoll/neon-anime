import useSHA256Hash from "~/composables/useSHA256Hash";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return { ...body, id: 1, token: await useSHA256Hash(JSON.stringify(body)) };
});