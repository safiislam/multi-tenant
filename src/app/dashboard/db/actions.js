// app/actions.js
"use server";

import { revalidateTag } from "next/cache";

export async function revalidateMyTag(tagName) {
  revalidateTag(tagName);
}
