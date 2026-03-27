import { StackHandler } from "@stackframe/stack";
import BackHomebutton from "@/components/BackHome";

export default function Handler() {
  return (
    <div className="bg-base-200 min-h-screen flex flex-col gap-2 items-center justify-center">
      <div className="hero min-h-screen bg-[url('/img/bg-home.png')]">
        <div className="hero-overlay"></div>
        <div className="hero-content bg-base-200 rounded backdrop-blur-md flex flex-col text-neutral-content text-center">
          <StackHandler fullPage={false} />
          <BackHomebutton />

        </div>
      </div>
    </div>
  )
}