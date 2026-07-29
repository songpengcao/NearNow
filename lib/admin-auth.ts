import { getChatGPTUser, type ChatGPTUser } from "@/app/chatgpt-auth";
import { getRuntimeBindings } from "@/db/runtime";

function configuredAdminEmails() {
  const bindings = getRuntimeBindings();
  return (bindings.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminUser(user: ChatGPTUser) {
  const allowedEmails = configuredAdminEmails();
  return allowedEmails.includes(user.email.toLowerCase());
}

export async function getAdminUser() {
  const user = await getChatGPTUser();
  return user && isAdminUser(user) ? user : null;
}
