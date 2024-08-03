import Image from "next/image";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
export default function Home() {
  return (
    <main className="w-screen h-screen">
      <section className="flex w-full h-full items-center justify-center">
        <div className="h-full bg-slate-100 w-[270px]">
          <div className="my-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <ul className="w-full my-2 px-3">
            <li className="w-full hover:bg-gray-300 py-2 rounded px-2 anim">
              <Link href={"product"} className="">
                Product
              </Link>
            </li>
            <li className="w-full hover:bg-gray-300 py-2 rounded px-2">
              <Link href={"product"} className="">
                Product
              </Link>
            </li>
            <li className="w-full hover:bg-gray-300 py-2 rounded px-2">
              <Link href={"product"} className="">
                Product
              </Link>
            </li>
          </ul>
          <div></div>
        </div>
        <div className="h-full  bg-slate-500 w-[calc(100%-270px)]"></div>
      </section>
    </main>
  );
}
