"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FeatureCardProps } from "@/types";

interface CardProps {
  cardData: FeatureCardProps;
}

const FeatureCard = ({ cardData }: CardProps) => {
  // console.log(cardData)
  const { title, description, image, url } = cardData;
  return (
    <div className=" min-w-[25%] w-[270px] shadow shadow-lg rounded-b-xl ">
      <div className="w-full bg-blue-200 rounded-t-xl overflow-hidden">
        <Image
          src={image}
          height={500}
          width={500}
          alt="First Aide"
          content="cover"
        />
      </div>
      <div className="px-3">
        <h1 className="font-bold text-lg py-4">{title}</h1>
        <p className="pb-10 text-gray-500">{description}</p>
      </div>
      <div className="flex">
        {/* <div className='mt-20'>
                                <Link href=''  className='text-white bg-black shadow shadow-lg border rounded-full px-8 py-3'>Get Started</Link>
                            </div> */}
        {/* <button className="flex -mt-10 mb-5 mx-auto py-1 justify-center shadow shadow-lg rounded-full w-[50%] ">
            <p className="my-auto">Continue</p>
            <svg className="my-auto" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path fill="currentColor" d="M11.05 12L7.175 6.575q-.35-.5-.087-1.037T7.975 5q.25 0 .475.113t.35.312L13.5 12l-4.7 6.575q-.125.2-.35.313T7.975 19q-.6 0-.875-.537t.075-1.038zM17 12l-3.875-5.425q-.35-.5-.088-1.037T13.926 5q.25 0 .475.113t.35.312L19.45 12l-4.7 6.575q-.125.2-.35.313t-.475.112q-.6 0-.875-.537t.075-1.038z"/></svg>
          </button> */}
      </div>
    </div>
  );
};

export default FeatureCard;
