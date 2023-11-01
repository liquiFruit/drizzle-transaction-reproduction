import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { users } from "./schema";

const libsql = createClient({
  url: "file:sqlite.db",
});
const db = drizzle(libsql);

async function seed(database: typeof db) {
  const { rowsAffected } = await database
    .insert(users)
    .values([
      {
        fullName: "User_" + Date.now().toString(),
      },
    ])
    .run();

  console.log(`>> seeded users: ${rowsAffected}`);
}

async function query(database: typeof db) {
  const allUsersAndProjects = await database.select().from(users).all();
  console.log(allUsersAndProjects);
}

async function transact() {
  // clear db
  await db.delete(users).run();

  // query before transaction
  console.log("state before transaction:");
  await query(db);

  try {
    await db.transaction(async (tx) => {
      // add a user
      await seed(tx);

      // rollback user addition
      console.log(">> rolling back...");
      tx.rollback();
    });
  } catch (error) {
    console.log(`Transaction error: ${error.message}`);
  }

  // query after
  console.log("state after transaction:");
  await query(db);
}

transact();
