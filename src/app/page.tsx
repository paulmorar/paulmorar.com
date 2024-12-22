import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight ">
            Hi, I’m Paul. <br />A Software Engineer.
          </h1>
        </div>
        <p className="max-w-xl">
          I’m a dedicated problem-solver who thrives on learning, building and
          leading high-performance teams.
        </p>
      </main>
    </div>
  );
}
