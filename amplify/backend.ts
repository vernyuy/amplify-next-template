import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data, MODEL_ID, generateHaikuFunction } from "./data/resource";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { sayHello } from './functions/bedrock-lambda-fn/resource';

export const backend = defineBackend({
  auth,
  data,
  generateHaikuFunction,
  sayHello
});

backend.generateHaikuFunction.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    effect: Effect.ALLOW,
    actions: ["bedrock:*"],
    resources: [
      `arn:aws:bedrock:*::foundation-model/${MODEL_ID}`,
    ],
  })
);