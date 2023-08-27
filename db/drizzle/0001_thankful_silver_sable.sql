CREATE TABLE IF NOT EXISTS "products" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"last_edited_at" timestamp with time zone,
	"owner_id" uuid NOT NULL,
	CONSTRAINT "products_id_key" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profiles" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"user_name" text NOT NULL,
	CONSTRAINT "profiles_user_name_unique" UNIQUE("user_name")
);
