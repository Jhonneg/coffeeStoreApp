import fetchGamesStores, { fetchGameStore } from "@/lib/games-stores";
import { GameStoreType } from "@/types";
import Image from "next/image";
import Link from "next/link";

async function getData(id: string) {
  return await fetchGameStore(id);
}

export async function generateStaticParams() {
  const gamesStores = await fetchGamesStores();
  return gamesStores.map((gamesStore: GameStoreType) => ({
    id: gamesStore.id,
  }));
}

export default async function Page(props: { params: { id: string } }) {
  const {
    params: { id },
  } = props;
  const coffeeStore = await getData(id);
  const { name = "", address = "", imgUrl = "" } = coffeeStore;

  return (
    <div className="h-full pb-80">
      <div className="m-auto grid max-w-full px-12 py-12 lg:max-w-6xl lg:grid-cols-2 lg:gap-4">
        <div className="">
          <div className="mb-2 mt-24 text-lg font-bold">
            <Link href="/">← Back to home</Link>
          </div>
          <div className="my-4">
            <h1 className="text-4xl">{name}</h1>
          </div>
          <Image
            src={imgUrl}
            width={740}
            height={360}
            className="max-h-[420px] min-w-full max-w-full rounded-lg border-2 sepia lg:max-w-[470px] "
            alt={"Game Store Image"}
          />
        </div>

        <div className={`glass mt-12 flex-col rounded-lg p-4 lg:mt-48`}>
          {address && (
            <div className="mb-4 flex">
              <Image
                src="/static/icons/places.svg"
                width="24"
                height="24"
                alt="places icon"
              />
              <p className="pl-2">{address}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
