"use client";

import Link from "next/link"
import Image from "next/image"
import { FingerprintIcon, SignIn as SignIcon, UserPlusIcon } from "@phosphor-icons/react";

export default function HomeInfo() {
  return (
    <div
      className="hero min-h-screen bg-[url('/imgs/bg-home.jpeg')]"

    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center pt-0 md:pt-28">
        <div className="max-w-md ">
          <Image
            src="/imgs/logo.png"
            alt="GameNext.js"
            width={300}
            height={150}
            className="flex mx-auto -mt-24" />

          <p className="my-8 text-justify justify-start pt-1">
            <strong>GameNext.js</strong> is a modern platform to manage and organize
            videogames. Built with Next.js, it uses Prisma, Neon database, and
            Stack Auth to provide secure authentication, fast performance, and scalable
            data management.
          </p>
          <Link href="handler/sign-in" className="btn btn-outline btn-success me-4 px-10 mt-8">
            <FingerprintIcon width={20} height={20} />
            sign in
          </Link>
          <Link href="handler/sign-up" className="btn btn-outline btn-success me-4 px-10 mt-8">
            <UserPlusIcon width={20} height={20} />
            sign up
          </Link>
        </div>
      </div>
    </div>
  )
}