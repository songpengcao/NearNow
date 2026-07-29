import { getAdminUser } from "@/lib/admin-auth";
import { getD1 } from "@/db";
import {
  syncBarcelonaAgenda,
  SyncAlreadyRunningError,
} from "@/lib/events/sync-barcelona-agenda";

export async function POST(request: Request) {
  const requestOrigin = request.headers.get("origin");
  if (requestOrigin && requestOrigin !== new URL(request.url).origin) {
    return Response.json({ error: "Cross-origin request rejected" }, { status: 403 });
  }

  const admin = await getAdminUser();
  if (!admin) {
    return Response.json({ error: "Admin access required" }, { status: 403 });
  }

  try {
    const result = await syncBarcelonaAgenda(getD1(), { trigger: "manual" });
    return Response.json({ sync: result });
  } catch (error) {
    const status = error instanceof SyncAlreadyRunningError ? 409 : 502;
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unexpected synchronization error",
      },
      { status },
    );
  }
}
