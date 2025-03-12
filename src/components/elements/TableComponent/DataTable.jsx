/* eslint-disable react/prop-types */
import { flexRender } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Function to truncate text
const truncateText = (text, maxLength = 50) => {
  if (!text) return text;
  
  return text.length > maxLength 
    ? `${text.slice(0, maxLength)}...` 
    : text;
};

export function DataTable({ table }) {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table className="table-auto w-full">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead className="text-center" key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="whitespace-nowrap">
                {row.getVisibleCells().map((cell) => {
                  // Determine if the cell needs special handling
                  const isTruncatable = cell.id.includes('_description');
                  const cellContent = flexRender(cell.column.columnDef.cell, cell.getContext());
                  
                  // Render cell content
                  const content = isTruncatable && typeof cellContent === 'string' 
                    ? truncateText(cellContent) 
                    : cellContent;

                  return (
                    <TableCell 
                      key={cell.id} 
                      className={`p-2 text-sm text-center max-w-40 ${
                        ['_id', '_status', '_actions'].some(substring => cell.id.includes(substring)) 
                          ? 'w-10' 
                          : ''
                      } ${isTruncatable ? 'truncate' : ''}`}
                    >
                      {isTruncatable && typeof cellContent === 'string' && cellContent.length > 50 ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="cursor-help">{content}</TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs">
                              {cellContent}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        content
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}