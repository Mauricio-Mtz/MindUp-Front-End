import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import axios from "axios"; // Asegúrate de tener axios instalado

export default function ComboContry({ value, onChange }) {
  const [open, setOpen] = React.useState(false);
  const [countries, setCountries] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Efecto para obtener la lista de países
  React.useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countryList = response.data.map(country => ({
          value: country.cca2, // Código del país (2 letras)
          label: country.name.common, // Nombre del país
        }));

        // Ordenar la lista de países por el nombre del país
        countryList.sort((a, b) => a.label.localeCompare(b.label));

        setCountries(countryList);
      } catch (err) {
        setError(err);
        console.error("Error fetching countries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleSelectCountry = (selectedValue) => {
    const newValue = selectedValue === value ? "" : selectedValue;
    onChange(newValue); // Enviar el valor seleccionado al componente padre
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {value ? countries.find((country) => country.label === value)?.label : "Selecciona tu país"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            {loading ? (
              <CommandEmpty>Cargando países...</CommandEmpty>
            ) : error ? (
              <CommandEmpty>Error al cargar países.</CommandEmpty>
            ) : countries.length === 0 ? (
              <CommandEmpty>No se encontraron países.</CommandEmpty>
            ) : (
              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    key={country.value}
                    value={country.label}
                    onSelect={() => handleSelectCountry(country.label)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === country.label ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {country.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
