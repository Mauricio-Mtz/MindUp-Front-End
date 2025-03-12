/* eslint-disable react/prop-types */
import { Pagination, PaginationContent, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";

export function PaginationControls({ 
  setModule, 
  currentIndex, 
  modules 
}) {
  const handlePrevious = () => {
    if (currentIndex > 0) {
      const previousModuleId = modules[currentIndex - 1];
      setModule(previousModuleId);
    }
  };

  const handleNext = () => {
    if (currentIndex < modules.length - 1) {
      const nextModuleId = modules[currentIndex + 1];
      setModule(nextModuleId);
    }
  };

  return (
    <Pagination className="my-6">
      <PaginationContent>
        <PaginationPrevious 
          onClick={handlePrevious} 
          disabled={currentIndex <= 0}
          className={`
            ${currentIndex <= 0 ? 'pointer-events-none opacity-50' : ''}
            cursor-pointer hover:bg-accent hover:text-accent-foreground
          `}
        />
        <PaginationNext 
          onClick={handleNext} 
          disabled={currentIndex >= modules.length - 1}
          className={`
            ${currentIndex >= modules.length - 1 ? 'pointer-events-none opacity-50' : ''}
            cursor-pointer hover:bg-accent hover:text-accent-foreground
          `}
        />
      </PaginationContent>
    </Pagination>
  );
}