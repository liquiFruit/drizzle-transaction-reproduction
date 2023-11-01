import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { users } from "./schema";

const sqlite = new Database("./sqlite.db");
const db = drizzle(sqlite);

function seed(database: typeof db) {
  const { changes } = database
    .insert(users)
    .values([
      {
        fullName: "User_" + Date.now().toString(),
      },
    ])
    .run();

  const insertedUser = database.select().from(users).get();

  console.log(`>> seeded users: ${changes}, ${insertedUser.fullName}`);
}

function query(database: typeof db) {
  const allUsersAndProjects = database.select().from(users).all();
  console.log(allUsersAndProjects);
}

async function transact() {
  // clear db
  db.delete(users).run();

  // query before transaction
  console.log("state before transaction:");
  query(db);

  try {
    db.transaction((tx) => {
      // add a user
      seed(tx);

      // rollback user addition
      console.log(">> rolling back...");
      tx.rollback();
    });
  } catch (error) {
    console.log(`Transaction error: ${error.message}`);
  }

  // query after
  console.log("state after transaction:");
  query(db);
}

transact();
