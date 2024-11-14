import { ProgressBar } from "@/components/elements/progressBar";

export function ContentLoader() {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50%] flex flex-col justify-center items-center">
      <ProgressBar />
      <h1 className="text-3xl font-bold text-center">Cargando Información..</h1>
    </div>
  );
}
