# Drizzle transaction bug with BetterSQLite 3

## Usage

```
npm install
npm run generate
npm run migrate
npm run dev
```

## Output when using `await`

```
state before transaction:
[]
>> seeded users: 1
>> rolling back...
Transaction error: Rollback
state after transaction:
[ { id: 1, fullName: 'User_1698843448743' } ]
```

## Output when calling syncronisly

```
state before transaction:
[]
>> seeded users: 1
>> rolling back...
Transaction error: Rollback
state after transaction:
[]
```
