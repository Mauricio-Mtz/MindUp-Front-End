/* eslint-disable react/prop-types */
import { Pagination, PaginationContent, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";

export function PaginationControls({ module, setModule, maxModules }) {
  return (
    <Pagination className="my-6">
      <PaginationContent>
        <PaginationPrevious onClick={() => setModule(Math.max(module - 1, 0))} />
        <PaginationNext onClick={() => setModule(Math.min(module + 1, maxModules - 1))} />
      </PaginationContent>
    </Pagination>
  );
}
