<p align="center">
    <img width="96" height="96" src="https://raw.githubusercontent.com/fillout/zitedb-api-client/refs/heads/main/assets/zite-icon.svg" alt="Fillout logo">
</p>

<h1 align="center">
  ZiteDB API Client
</h1>

<p align="center">
  TypeScript SDK for working with data in Zite 🤖
</p>

<br /><br />

## Connecting to the API

```js
import { Zite } from "zitedb"

const z = new Zite(ZITE_API_KEY)
```

You can generate an API key for your organization at https://build.fillout.com/home/settings/developer. It should start with `sk_prod_`.
Don't save secret keys in your code - use an environmental variable instead.

## Get started with these examples

Print a list of databases:

```js
const databases = await z.database.list()
console.log(databases)
```

```js
[
  {
    id: "54752b5b7c373e06",
    name: "Event RSVP",
    createdAt: "2026-02-05T20:50:26.924Z",
    updatedAt: "2026-02-05T20:50:26.924Z",
    url: "https://build.fillout.com/database/54752b5b7c373e06",
  }, {
    id: "e9ebbbaa15a04bc9",
    name: "Contact Form Database",
    createdAt: "2026-01-26T15:20:14.489Z",
    updatedAt: "2026-01-26T15:20:14.489Z",
    url: "https://build.fillout.com/database/e9ebbbaa15a04bc9",
  }
]
```

Create record:

```js
const record = await z.record.create(DATABASE_ID, TABLE_ID, {
    Name: "Toby W",
    Email: "tobyw@zite.com"
})

console.log(`Created record with id ${record.id}`)
```

Filter records in a table:

```js
const { records } = await z.record.list(DATABASE_ID, TABLE_ID, {
    filter: {
        field: "Email",
        ends_with: "@gmail.com"
    },
    limit: 10,
    sort: [
        {
            field: "Email",
            direction: "asc"
        }
    ]
})
console.log(records.map(r => ({ id: r.id, fields: r.fields })))
```

```js
[
  {
    id: "0f1dadf4-0069-4116-99c2-a77dcfba57cf",
    fields: {
      Name: "Alan Smith",
      Email: "alan@gmail.com",
      Message: "How are you doing?",
      "Submitted At": "2025-03-05T08:44:00.000Z",
    },
  }, {
    id: "818c847e-8088-41e3-820c-6e0edc20cdea",
    fields: {
      Name: "John Harper",
      Email: "john@gmail.com",
      Message: "Hello",
      "Submitted At": "2026-02-09T22:39:27.039Z",
    },
  }
]
```

(You can also use field IDs instead of labels.)

## Documentation

Take a look at our [API documentation](https://www.fillout.com/help/database/api) to find out everything you can do.

**[zitedb](https://www.npmjs.com/package/zitedb)** | [n8n-nodes-zitedb](https://www.npmjs.com/package/n8n-nodes-zitedb) | [@fillout/api](https://www.npmjs.com/package/@fillout/api) | [@fillout/react](https://www.npmjs.com/package/@fillout/react) | [n8n-nodes-fillout](https://www.npmjs.com/package/n8n-nodes-fillout)
