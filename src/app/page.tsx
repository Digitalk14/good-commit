import { Input, Credentials } from "@/components";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-start sm:items-center justify-items-center bg-white dark:bg-gray-950 min-h-screen p-8  gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] transition-colors duration-200">
      <header className="row-start-1 flex gap-[24px] flex-wrap items-center justify-start w-full max-w-[640px] mx-auto">
        <h1 className="text-2xl font-bold text-left">Git Commit<br/>Message Generator</h1>
      </header>
      <main className="flex flex-col gap-[32px] w-full row-start-2 items-center " >
        <Input/>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Credentials />
        {/* <ThemeToggle /> */}
      </footer>
    </div>
  );
}
