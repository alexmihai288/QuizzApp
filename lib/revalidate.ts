"use server";
import { revalidatePath } from "next/cache";

export async function revalidatePathUrl(url: string) {
  revalidatePath(url);
}
