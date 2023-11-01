import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { users } from "./schema";

const sqlite = new Database("./sqlite.db");
const db = drizzle(sqlite);

async function seed(database: typeof db) {
  const { changes } = await database
    .insert(users)
    .values([
      {
        fullName: "User_" + Date.now().toString(),
      },
    ])
    .run();

  console.log(`>> seeded users: ${changes}`);
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
