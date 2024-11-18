import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const translateKeys = {
  fullname: "Nombre",
  email: "Correo", 
  status: "Estado",
  name: "Nombre",
  country: "País",
  participants: "Participantes",
  description: "Descripción",
};

const translateValues = {
  status: {
    0: "Inactivo",
    1: "Activo"
  },
};

export const columns = (data, target, onActionClick) => {
  if (!data || data.length === 0) return [];

  const keys = Object.keys(data[0]);

  // Configuración específica para cada target
  const targetConfig = {
    members: {
      actions: (item) => {
        return (
          <>
            <DropdownMenuItem onClick={() => onActionClick("delete", item)}>
              Elimnar Miembro
            </DropdownMenuItem>
          </>
        );
      }
    },
    courses: {
      actions: (item) => {
        return (
          <>
            <DropdownMenuItem onClick={() => onActionClick("edit", item)}>
              Editar Curso
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onActionClick("delete", item)}>
              Elimnar Curso
            </DropdownMenuItem>
          </>
        );
      }
    },
  };

  const config = targetConfig[target] || {};

  // Crear columnas base
  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <div className="ml-2">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  keys.forEach((key) => {
    columns.push({
      accessorKey: key,
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center justify-center w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {translateKeys[key] || key.charAt(0).toUpperCase() + key.slice(1)}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const value = row.getValue(key);
        if (key in translateValues) {
          return <div className="w-20">{translateValues[key][value] || value}</div>;
        }
        return (
          <div className="px-4">
            {value}
          </div>
        );
      },
    });
  });

  // Columna de acciones personalizable
  columns.push({
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex justify-center align-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel> Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {config.actions?.(item) || (
                <DropdownMenuItem onClick={() => console.log("Default action")}>
                  Acción por Defecto
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  });

  return columns;
};
