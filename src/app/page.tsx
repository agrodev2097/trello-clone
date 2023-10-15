import { BoadrsList } from "./components";
import { prisma } from "@/app/core/prisma";

export default async function Home() {
  const boards = await prisma.boards.findMany();

  return (
    <div className="container mx-auto">
      <BoadrsList initialData={boards} />
    </div>
  );
}
