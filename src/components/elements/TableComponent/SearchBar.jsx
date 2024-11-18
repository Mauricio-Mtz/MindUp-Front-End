/* eslint-disable react/prop-types */
import { Input } from "@/components/ui/input";

export function SearchBar({ filterValue, setFilterValue }) {
  return (
    <Input
      placeholder="Buscar miembros..."
      value={filterValue}
      onChange={(e) => setFilterValue(e.target.value)}
      className="max-w-sm w-full sm:w-[90%] lg:w-[100%]"
    />
  );
}
