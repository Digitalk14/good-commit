import { Input, Credentials, CommitLogs } from "@/components";

export default function Home() {
  return (
    <div className="flex flex-col items-start sm:items-center justify-items-center bg-white dark:bg-gray-950 min-h-screen p-8  gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] transition-colors duration-200">
      <header className="row-start-1 flex gap-[16px] flex-wrap items-end justify-between w-full max-w-[640px] mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold text-left dark:text-[#666]">Git Commit<br/>Message Generator</h1>
        <p>
          Good Commit helps you stop worrying about writing perfect Git commit messages. Just type what you did and it generates a clean, conventional commit message for you, like: <span><i>&ldquo;updated login button style&rdquo;</i></span>
        </p>
        <Credentials />
      </header>
      <main className="flex flex-col gap-[32px] w-full row-start-2 items-center " >
        <Input/>
        <CommitLogs/>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {/* <ThemeToggle /> */}
      </footer>
    </div>
  );
}
