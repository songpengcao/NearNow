import assert from "node:assert/strict";
import test from "node:test";
import { isAdminUser } from "../lib/admin-auth";
import { setRuntimeBindings } from "../db/runtime";

const user = {
  displayName: "Admin",
  email: "admin@example.com",
  fullName: "NearNow Admin",
};

test("matches the server-side admin allowlist case-insensitively", () => {
  setRuntimeBindings({
    ADMIN_EMAILS: "owner@example.com, ADMIN@example.com ",
  });

  assert.equal(isAdminUser(user), true);
});

test("denies authenticated users when the allowlist is empty", () => {
  setRuntimeBindings({ ADMIN_EMAILS: "" });

  assert.equal(isAdminUser(user), false);
});
