"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2">
        <div className="hero flex flex-col gap-8 row-start-2 items-start">
          <div className="flex flex-row items-center gap-2 py-1.5 px-4 border rounded-full">
            <div className="relative">
              <div className="circle absolute rounded-full h-2.5 w-2.5"></div>
            </div>
            <p className="ml-2 opacity-80">Available for projects</p>
          </div>
          <div className="flex flex-row items-center gap-4">
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
          <p className="max-w-xl">
            I’m a dedicated problem-solver who thrives on learning, building and
            leading high-performance teams.
          </p>
        </div>
      </main>
    </div>
  );
}
