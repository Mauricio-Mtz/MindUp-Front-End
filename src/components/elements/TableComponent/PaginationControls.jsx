/* eslint-disable react/prop-types */
// PaginationControls.jsx
import { Button } from "@/components/ui/button";

export function PaginationControls({ table }) {
  return (
    <div className="flex items-center justify-between space-x-2 py-4 flex-wrap">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Anterior
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Siguiente
        </Button>
      </div>
    </div>
  );
}
