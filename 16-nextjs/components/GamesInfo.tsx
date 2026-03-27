import { PrismaClient } from "@/src/generated/prisma"; 
import { PrismaNeon } from "@prisma/adapter-neon";
import Link from "next/link";
import { deleteGame } from "@/app/actions/gameActions";
import SearchBar from "./SearchBar";

const prisma = new PrismaClient({
  adapter: new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
  }),
});

export const dynamic = "force-dynamic";

export default async function GamesInfo({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const params = await searchParams;
  const searchTerm = params?.search || "";
  const currentPage = Number(params?.page) || 1;
  const pageSize = 8; 

  const p = prisma as any;
  const gamesModel = p.games || p.game;
  const consoleModelName = p.consoles ? "consoles" : "console";

  const where = searchTerm
    ? { title: { contains: searchTerm, mode: "insensitive" as const } }
    : {};

  const [totalGames, games] = await Promise.all([
    gamesModel.count({ where }),
    gamesModel.findMany({
      where,
      include: { [consoleModelName]: true },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      orderBy: { id: "desc" },
    }),
  ]);

  const totalPages = Math.ceil(totalGames / pageSize);
  const hasGames = games.length > 0;

  return (
    <div className="relative min-h-screen">
      {/* FONDO */}
      <div className="absolute inset-0 bg-[url('/imgs/bg_game.png')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

      <div className="relative z-10 p-6 text-white">

        <h1 className="text-4xl font-black mb-8 text-center uppercase tracking-widest text-cyan-400">
          🎮 Video Games 
        </h1>

        {/* BUSCADOR */}
        <div className="max-w-md mx-auto mb-10">
          <SearchBar />
        </div>

        {/* INFO */}
        <div className="mb-8 flex justify-between items-center max-w-7xl mx-auto">
          <p className="text-sm text-gray-400">
            {searchTerm ? `Resultados para "${searchTerm}": ` : "Mostrando "}
            <span className="text-cyan-400 font-bold">{games.length}</span> de {totalGames}
          </p>

          <Link href="/games/crear">
            <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-black font-bold hover:scale-110 transition">
              + Nuevo Juego
            </button>
          </Link>
        </div>

        {/* GRID */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">

          {!hasGames ? (
            <div className="col-span-full text-center py-24 bg-white/5 border border-white/10 rounded-3xl">
              <p className="text-2xl text-gray-400 font-bold">No hay juegos 😢</p>
            </div>
          ) : (
            games.map((game: any) => (

              <div
                key={game.id}
                className="group relative rounded-2xl overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_0_40px_rgba(0,255,255,0.4)]"
              >

                {/* BORDE NEON */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl border border-cyan-400 blur-md animate-pulse"></div>
                </div>

                {/* IMAGEN */}
                <div className="relative h-56 overflow-hidden">

                  <img
                    src={`/imgs/${game.cover}`}
                    alt={game.title}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-125 group-hover:rotate-1"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                  {/* EFECTO SCAN */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-[linear-gradient(transparent,rgba(0,255,255,0.2),transparent)] animate-[scan_2s_linear_infinite]"></div>

                  {/* PRECIO */}
                  <div className="absolute top-3 right-3 px-3 py-1 bg-black/70 backdrop-blur-md rounded-lg border border-cyan-400/30">
                    <p className="text-cyan-400 font-bold text-sm">${game.price}</p>
                  </div>

                </div>

                {/* INFO */}
                <div className="p-5 flex flex-col">

                  <h2 className="font-black text-lg text-white group-hover:text-cyan-400 transition uppercase">
                    {game.title}
                  </h2>

                  <span className="text-xs text-gray-400 mt-1 mb-4 uppercase">
                    {game[consoleModelName]?.name || "Sin consola"}
                  </span>

                  {/* BOTONES PRO */}
                  <div className="grid grid-cols-3 gap-3 mt-auto">

                    {/* VER */}
                    <Link
                      href={`/games/${game.id}`}
                      className="relative text-center text-xs font-bold py-2 rounded-xl overflow-hidden border border-cyan-400/30 group transition"
                    >
                      <span className="relative z-10 text-cyan-400 group-hover:text-black transition">
                        Ver
                      </span>
                      <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-100 transition"></div>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.5),transparent)] animate-[shine_1s_linear]"></div>
                    </Link>

                    {/* EDITAR */}
                    <Link
                      href={`/games/editar/${game.id}`}
                      className="relative text-center text-xs font-bold py-2 rounded-xl overflow-hidden border border-yellow-400/30 group transition"
                    >
                      <span className="relative z-10 text-yellow-400 group-hover:text-black transition">
                        Editar
                      </span>
                      <div className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-100 transition"></div>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.5),transparent)] animate-[shine_1s_linear]"></div>
                    </Link>

                    {/* BORRAR */}
                    <form action={async () => { "use server"; await deleteGame(game.id); }}>
                      <button className="relative w-full text-xs font-bold py-2 rounded-xl overflow-hidden border border-red-400/30 group transition">
                        <span className="relative z-10 text-red-400 group-hover:text-white transition">
                          Borrar
                        </span>
                        <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-100 transition"></div>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.5),transparent)] animate-[shine_1s_linear]"></div>
                      </button>
                    </form>

                  </div>

                </div>

                {/* GLOW ABAJO */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition"></div>

              </div>

            ))
          )}
        </div>

        {/* PAGINACIÓN */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-16 gap-3 pb-12">
            {Array.from({ length: totalPages }, (_, i) => {
              const pNum = i + 1;
              const pageUrl = `/games?page=${pNum}${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ""}`;
              const active = currentPage === pNum;

              return (
                <Link
                  key={pNum}
                  href={pageUrl}
                  className={`w-12 h-12 flex items-center justify-center rounded-xl font-bold ${
                    active
                      ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white scale-110"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  {pNum}
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}