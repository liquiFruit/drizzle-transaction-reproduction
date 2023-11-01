# Drizzle transaction bug with BetterSQLite 3

## Usage

```
npm install
npm run generate
npm run migrate
npm run dev
```

## Output

```
state before transaction:
[]
>> seeded users: 1
>> rolling back...
Transaction error: Rollback
state after transaction:
[ { id: 1, fullName: 'User_1698843448743' } ]
```

## Expected Output

```
state before transaction:
[]
>> seeded users: 1
>> rolling back...
Transaction error: Rollback
state after transaction:
[]
```
