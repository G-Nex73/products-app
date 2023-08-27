import {
  pgTable,
  foreignKey,
  pgEnum,
  uuid,
  timestamp,
  unique,
  text,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";
export const key_status = pgEnum("key_status", [
  "default",
  "valid",
  "invalid",
  "expired",
]);
export const key_type = pgEnum("key_type", [
  "aead-ietf",
  "aead-det",
  "hmacsha512",
  "hmacsha256",
  "auth",
  "shorthash",
  "generichash",
  "kdf",
  "secretbox",
  "secretstream",
  "stream_xchacha20",
]);
export const aal_level = pgEnum("aal_level", ["aal1", "aal2", "aal3"]);
export const code_challenge_method = pgEnum("code_challenge_method", [
  "s256",
  "plain",
]);
export const factor_status = pgEnum("factor_status", [
  "unverified",
  "verified",
]);
export const factor_type = pgEnum("factor_type", ["totp", "webauthn"]);

export const products = pgTable("products", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  created_at: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  last_edited_at: timestamp("last_edited_at", {
    withTimezone: true,
    mode: "string",
  }),
  owner_id: uuid("owner_id")
    .notNull()
    .references(() => profiles.user_id, { onDelete: "cascade" }),
});

export const profiles = pgTable(
  "profiles",
  {
    user_id: uuid("user_id").primaryKey().notNull(),
    created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    name: text("name").notNull(),
    user_name: text("user_name").notNull(),
  },
  (table) => {
    return {
      profiles_user_name_unique: unique("profiles_user_name_unique").on(
        table.user_name,
      ),
    };
  },
);
