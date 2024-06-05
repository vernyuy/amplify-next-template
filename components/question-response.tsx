"use client";

import { FormEvent, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { Schema } from "@/amplify/data/resource";
import Footer from "./footer";
import NavBar from "./navbar";

const client = generateClient<Schema>();

export default function QuestionResponse() {
  const [prompt, setPrompt] = useState<string>("");
  const [answer, setAnswer] = useState<string | null>(null);

  const sendPrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, errors } = await client.queries.generateHaiku({
      prompt,
    });

    console.log(data);

    if (!errors) {
      setAnswer(data);
      setPrompt("");
    } else {
      console.log(errors);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 dark:text-white">
      <div>
        <h1 className="text-3xl font-bold text-center mb-4">Haiku Generator</h1>

        <form className="mb-4 self-center max-w-[500px]" onSubmit={sendPrompt}>
          <input
            className="text-black p-2 w-full"
            placeholder="Enter a prompt..."
            name="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </form>

        <div className="text-center">
          <pre>{answer}</pre>
        </div>
      </div>
                </main>
    // <div className="bg-blue-100/40 pt-4">
    //   <div className="h-full w-full">
    //     <div className="h-full w-full bg-blur sticky top-5">
    //       <div className="mx-auto bg-white/40 w-[85%] border shadow shadow-lg rounded-full">
    //         <NavBar />
    //       </div>
    //     </div>

    //     <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //       <div className="mt-20 flex flex-col justify-between">
    //         <h1 className="text-3xl font-bold text-center mb-4">
    //           Haiku Generator
    //         </h1>

    //         <form
    //           className="mb-4 self-center max-w-[500px] sticky bottom-0"
    //           onSubmit={sendPrompt}
    //         >
    //           <input
    //             className="text-black p-2 w-full"
    //             placeholder="Enter a prompt..."
    //             name="prompt"
    //             value={prompt}
    //             onChange={(e) => setPrompt(e.target.value)}
    //           />
    //         </form>

    //         <div className="text-center">
    //           <pre>{answer}</pre>
    //         </div>
    //       </div>
    //     </main>

    //     <div className="h-full"></div>
    //     <Footer />
    //     <div></div>
    //   </div>
    // </div>
  );
}
