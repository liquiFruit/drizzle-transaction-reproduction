# Drizzle transaction bug with Libsql

## Usage

```
npm install
npm run generate
npm run migrate
npm run dev
```

## Output

Functioning correctly:

```
state before transaction:
[]
>> seeded users: 1
>> rolling back...
Transaction error: Rollback
state after transaction:
[]
```
