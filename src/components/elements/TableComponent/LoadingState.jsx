// LoadingState.jsx
import { ProgressBar } from "@/components/elements/progressBar";

export function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-[625px]">
      <div className="mt-8 flex flex-col items-center justify-center w-full align-middle">
        <div className="w-[60%]">
          <ProgressBar />
        </div>
        <h1 className="text-3xl font-bold text-center">Cargando Información...</h1>
      </div>
    </div>
  );
}