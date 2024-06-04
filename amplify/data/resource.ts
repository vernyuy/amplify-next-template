import { 
  type ClientSchema,
   a, 
   defineData, 
  defineFunction, 
} from "@aws-amplify/backend";

export const MODEL_ID = "anthropic.claude-3-haiku-20240307-v1:0";

export const generateHaikuFunction = defineFunction({
  entry: "./generateHaiku.ts",
  environment: {
    MODEL_ID,
  },
});

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  generateHaiku: a
  .query()
  .arguments({ prompt: a.string().required() })
  .returns(a.string())
  .authorization((allow) => [allow.guest(), allow.authenticated()])
  .handler(a.handler.function(generateHaikuFunction)),

  Type: a.enum([
    'PRIVATE',
    'PUBLIC'
  ]),
  Location: a.customType({
    lat: a.float(),
    long: a.float(),
  }),

  User: a
    .model({
      userId: a.id(),
      cognitoId: a.string(),
      username: a.string(),  
      phoneNumber: a.phone(),
      email: a.email(),
      firstName: a.string(),
      lastName: a.string()
    }).authorization(allow => [allow.authenticated().to(["read"]), allow.owner()]),

    Drug: a.model({
      drugId: a.id(),
      name: a.string(),
      description: a.string(),
      pharmacies: a.hasMany('PharmacyDrug', 'drugId'),
    }).authorization(allow => [allow.authenticated().to(["read"]), allow.guest()]),

    Pharmacy: a.model({
      pharmacyId: a.id(),
      name: a.string(),
      description: a.string(),
      location: a.ref('Location'),
      drugs: a.hasMany('PharmacyDrug', 'pharmacyId'),
      healthCareProviderId: a.id(),
      healthCareProvider: a.belongsTo('HealthCareProvider', 'healthCareProviderId')
    }).authorization(allow => [allow.authenticated().to(["read"]), allow.owner()]),

    PharmacyDrug: a.model({
      pharmacyId: a.id().required(),
      drugId: a.id().required(),    
      pharmacy: a.belongsTo('Pharmacy', 'pharmacyId'),
      drug: a.belongsTo('Drug', 'drugId'),
    }).authorization(allow => [allow.authenticated().to(["read"]), allow.owner()]),

    Disease: a.model({
      diseaseId: a.id(),
      name: a.string(),
      description: a.string(),
      symptoms: a.string().array(),
      preventionTips: a.string().array()
    }).authorization(allow => [allow.authenticated().to(["read"]), allow.guest().to(['read']), allow.owner()]),

    HealthCareProvider: a.model({
      healthCareProviderId: a.id(),
      name: a.string(),
      description: a.string(),
      location: a.ref('Location'),
      type: a.ref('Type'),
      pharmacy: a.hasOne('Pharmacy', 'healthCareProviderId')
    }).authorization(allow => [allow.authenticated().to(["read"]), allow.owner()]),

    FirstAide: a.model({
      firstAideId: a.string(),
      title: a.string(),
      description: a.string(),
    }).authorization(allow => [allow.authenticated().to(["read"]), allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
