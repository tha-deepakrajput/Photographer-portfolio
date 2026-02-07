"use server";

import { sendContactEmail } from "@/lib/email";

export async function submitContact(formData: FormData) {
  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    shootType: formData.get("shootType") as string,
    message: formData.get("message") as string,
  };

  await sendContactEmail(data);
}
