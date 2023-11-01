import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import { createClient } from "@libsql/client";

const libsql = createClient({
  url: "file:sqlite.db",
});
const db = drizzle(libsql);

// this will automatically run needed migrations on the database
migrate(db, { migrationsFolder: "./drizzle" });
