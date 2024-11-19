/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table";
import { SearchBar } from "./SearchBar";
import { ColumnVisibilityDropdown } from "./ColumnVisibilityDropdown";
import { LoadingState } from "./LoadingState";
import { DataTable } from "./DataTable";
import { PaginationControls } from "./PaginationControls";
import { columns as baseColumns } from "./Columns";

export default function TableComponent({TableComponentData, TableComponentType, onActionClick}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(TableComponentData);
      setIsLoading(false);
    }, 1500);
  }, []);

  const columns = baseColumns(data, TableComponentType, onActionClick);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  });

  return (
    <div className="w-full overflow-x-auto">
      {isLoading ? (
        <LoadingState />
      ) : (
        <>
          <div className="flex items-center justify-between py-4 gap-4">
            <SearchBar
              filterValue={table.getColumn("fullname")?.getFilterValue() ?? ""}
              setFilterValue={(value) => {
                table.getColumn("fullname")?.setFilterValue(value);
                table.getColumn("name")?.setFilterValue(value);
              }}
            />
            <ColumnVisibilityDropdown columns={table.getAllColumns().filter(column => column.getCanHide() && column.id !== "actions")} />
          </div>

          <DataTable table={table} />
          
          <PaginationControls table={table} />
        </>
      )}
    </div>
  );
}
