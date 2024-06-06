"use client";

import { FormEvent, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { Schema } from "@/amplify/data/resource";
import Footer from "./footer";
import NavBar from "./navbar";

const client = generateClient<Schema>();

export default function QuestionResponse() {
  const data = [];
  const [answer, setAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false)
  
  const sendPrompt = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const prompt = formData.get("prompt")?.toString()!;
    const { data, errors } = await client.queries.generateHaiku({
      prompt,
    });
    if (!errors) {
      setAnswer(data);
      setIsLoading(false)
    } else {
      console.log(errors);
      setIsLoading(false)
    }
  };

  return (
    
    <div className="bg-blue-100/40 pt-4">
      <div className="h-full w-full">
        <div className="h-full w-full bg-blur sticky top-5">
          <div className="mx-auto bg-white/40 w-[85%] border shadow shadow-lg rounded-full">
            <NavBar />
          </div>
        </div>

        <main className="flex min-h-[70%] flex-col items-center justify-center p-24 text-black">
      <div className="flex flex-col">
        <div className="text-center text-black">
          <pre>{answer}</pre>
        </div>
        <h1 className="text-3xl font-bold text-center mb-4 mx-auto">Ask any Question about your situation</h1>

        <form className="mb-4 flex gap-2 self-center min-w-[500px] sticky bottom-0 w-full mx-auto" onSubmit={sendPrompt}>
                <textarea
                  disabled={isLoading}
                  name="prompt"
                  className="min-h-12 max-h-12 shadow shadow-xl border my-auto rounded-full py-2 px-4 w-full"
                ></textarea>
                <button
                  type="submit"
                  className="w-[50px] my-auto flex  "
                >
                  <svg className="my-auto shadow shadow-lg bg-transparent" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M3 20V4l19 8zm2-3l11.85-5L5 7v3.5l6 1.5l-6 1.5zm0 0V7z"/></svg>
                </button>
        </form>

        
      </div>
    </main>

        <div className="h-full"></div>
        <Footer />
        <div></div>
      </div>
    </div>
  );
}
