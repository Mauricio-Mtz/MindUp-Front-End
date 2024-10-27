import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const columns = ( handleEditCourse ) => [
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
    {
      accessorKey: "name",
      align: "center",
      header: ({ column }) => (
          <Button
            variant="ghost"
            className="flex items-center justify-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nombre del Curso
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        
      ),
      cell: ({ row }) => {
        const name = row.getValue("name");
        return (
          <div className="pl-6">
            {/* Muestra hasta 20 caracteres en pantallas pequeñas y hasta 50 en pantallas más grandes */}
            <span className="sm:hidden">{name.length > 20 ? name.substring(0, 20) + "..." : name}</span>
            <span className="hidden sm:inline">{name.length > 50 ? name.substring(0, 50) + "..." : name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "participants",
      header: ({ column }) => (
        <div className="text-center">
          No. de Participantes
        </div>
      ),
      cell: ({ row }) => <div className="text-center">{row.getValue("participants")}</div>,
    },
    {
      accessorKey: "description",
      header: "Descripción",
      cell: ({ row }) => {
        const description = row.getValue("description");
        return <div>{description.length > 70 ? description.substring(0, 70) + "..." : description}</div>;
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <div className="text-center">
          Status
        </div>
      ),
      cell: ({ row }) => (
        <div className="capitalize text-center">{row.getValue("status")}</div>
      ),
    },
    {
      id: "actions",
      header: ({ column }) => (
        <div className="text-center">
         Acciones
        </div>
      ),
      cell: ({ row }) => {
        const curso = row.original;
        const navigate = useNavigate();

        const handleButton = (course) => {
          handleEditCourse(curso);
      };

        return (
          <div className="flex justify-center alint-center">
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
                <DropdownMenuItem> Ver detalles del curso</DropdownMenuItem>
                <DropdownMenuItem onClick={() =>handleButton(curso) }>Editar curso</DropdownMenuItem>
                <DropdownMenuItem>Cambiar status</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    }
  ];
  