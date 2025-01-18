"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ParticlesComponent from "@/components/particles";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Home() {
  return (
    <>
      <ParticlesComponent />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-8 row-start-2">
          <div className="hero flex flex-col gap-4 row-start-2 items-start">
            <div className="flex flex-row items-center gap-1 py-1.5 px-4 border rounded-full">
              <div className="relative">
                <div className="circle absolute rounded-full h-2.5 w-2.5"></div>
              </div>
              <p className="ml-2 opacity-80">Available for projects</p>
            </div>
            <div className="flex flex-row items-center gap-4 mb-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src="https://scontent-cph2-1.xx.fbcdn.net/v/t1.6435-9/94884268_3558506654165406_1295462050297806848_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=fe5cV7hR7W0Q7kNvgG13Iox&_nc_zt=23&_nc_ht=scontent-cph2-1.xx&_nc_gid=AKuykLPeyhFzjg17ODVa773&oh=00_AYADbreEDX4MukxllutjONpyLMVIpUe-4W8-dcEvRL3CGg&oe=678FC218"
                  alt="paulmorar"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="scroll-m-20 text-xl sm:text-4xl font-extrabold tracking-tight ">
                Hi, I’m Paul. <br />A Software Engineer.
              </h1>
            </div>
            <p className="max-w-xl text-xl text-slate-300">
              I’m a dedicated problem-solver who thrives on learning, building
              and leading high-performance teams.
            </p>
            <p className="max-w-xl text-xl text-slate-300">
              Working on something interesting? Let’s talk 😉
            </p>
            <div className="flex flex-row items-center gap-4 mt-4">
              <Link
                className="w-12 h-12 flex items-center justify-center rounded-lg border-solid border-2 border-gray-300 hover:border-gray-200 text-gray-300 hover:text-gray-200"
                href="https://github.com/paulmorar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Github"
              >
                <Github size="24"></Github>
              </Link>
              <Link
                className="w-12 h-12 flex items-center justify-center rounded-lg border-solid border-2 border-gray-300 hover:border-gray-200 text-gray-300 hover:text-gray-200"
                href="https://www.linkedin.com/in/paulmorar/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Linkedin"
              >
                <Linkedin size="24"></Linkedin>
              </Link>
              <Link
                className="w-12 h-12 flex items-center justify-center rounded-lg border-solid border-2 border-gray-300 hover:border-gray-200 text-gray-300 hover:text-gray-200"
                href="mailto:paul@devpill.dk?subject=Hi%20Paul&body=Hi%20👋"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
              >
                <Mail size="24"></Mail>
              </Link>
              <Link
                className="h-12 flex items-center justify-center rounded-lg border-solid border-2 border-gray-300 hover:border-gray-200 text-gray-300 hover:text-gray-200"
                href="/about"
                aria-label="More about me"
              >
                <span className="px-4 text-sm">ABOUT ME</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
