import { fetchAuthSession } from "aws-amplify/auth/server";
import { NextRequest, NextResponse } from "next/server";
import { runWithAmplifyServerContext } from "./utils/server-utils";
import { getCurrentUser } from 'aws-amplify/auth/server';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

 try{
  const user = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: (contextSpec) => getCurrentUser(contextSpec)
  });

  console.log("User", user)
 }catch(err){
  console.log(err)
 }

  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        return (
          session.tokens?.accessToken !== undefined &&
          session.tokens?.idToken !== undefined
        );
      } catch (error) {
        console.log("Error",  error);
        return false;
      }
    }
  });
console.log(authenticated)
  if (authenticated) {
    return response;
  }

  return NextResponse.redirect(new URL('/signin', request.url));
}

export const config = {
  matcher: ["/", "/home", "/pharmacy"],
};