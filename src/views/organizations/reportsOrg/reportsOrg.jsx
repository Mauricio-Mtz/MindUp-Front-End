import { useState } from "react";
import {Card,CardContent,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Select,SelectContent,SelectGroup,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";
import axios from 'axios';
import { toast } from "sonner";

const SERVER = import.meta.env.VITE_API_URL;

export default function ReportsOrg() {
  const reportType      =  ["Miembros", "Cursos", "Usuarios"];
  const reportMembers   =  ["Todos", "Activos", "Inactivos"];
  const reportCourses   =  ["Todos", "Activos", "Inactivos", "Participantes"];
  const reportUsuarios  =  ["Todos x Curso","Avance x curso","Calificaciones","Usuarios Terminados",];
  const reportFormats   =  ["xlsx", "pdf"]; // Nuevas opciones para el formato

  // Estado para cada campo del formulario
  const [selectedReportType, setSelectedReportType] = useState("");
  const [selectedReport, setSelectedReport] = useState("");
  const [nombre, setNombre] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("pdf"); // Estado para el formato

  // Determina las opciones para el segundo SelectInput en base al tipo seleccionado
  const getReportOptions = () => {
    if (selectedReportType === "Miembros") return reportMembers;
    if (selectedReportType === "Cursos") return reportCourses;
    if (selectedReportType === "Usuarios") return reportUsuarios;
    return [];
  };

  // Manejar el envío del formulario
 
  const downloadReport = async () => {
    const reportData = {
      reportType: selectedReportType,
      report: selectedReport,
      name: nombre,
      startDate,
      endDate,
      format: selectedFormat, // Incluimos el formato seleccionado
    };
    console.log("Datos recopilados:", reportData);
    if (!reportData.report) {
      toast("Seleccione un reporte", {
        description: "Seleccione el tipo de reporte y el reporte.",
        dismissible: true,
        duration: 5000,
      });
      return;
    }
    try {
      const response = await axios.post(
        ` ${SERVER}/reports/getReport`,
        reportData,
        { responseType: 'blob' } // Importante para manejar archivos
      );
  
      const fileFormat = reportData.format === 'xlsx' ? 'xlsx' : 'pdf';
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report.${fileFormat}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error al descargar el reporte:', error);
    }
  }; 

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Genera tu reporte</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-wrap gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              downloadReport();
            }}
          >
            <div className="w-[200px]">
              <Label htmlFor="select">Tipo de reporte</Label>
              <SelectInput
                reportType={reportType}
                placeholder="Selecciona un tipo"
                onSelectChange={setSelectedReportType}
              />
            </div>
            <div className="w-[200px]">
              <Label htmlFor="select">Reporte</Label>
              <SelectInput
                reportType={getReportOptions()}
                placeholder="Selecciona un reporte"
                onSelectChange={setSelectedReport}
                disabled={!selectedReportType}
              />
            </div>
            <div className="w-[300px]">
              <Label htmlFor="nombre">Nombre del {selectedReportType}</Label>
              <Input
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                disabled={!selectedReportType}
              />
            </div>
            <div className="w-[200px]">
              <Label htmlFor="startDate">Fecha Inicial</Label>
              <Input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                disabled={!selectedReportType}
              />
            </div>
            <div className="w-[200px]">
              <Label htmlFor="endDate">Fecha Final</Label>
              <Input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={!selectedReportType}
              />
            </div>
            <div className="w-[100px]">
              <Label htmlFor="select">Formato</Label>
              <SelectInput
                reportType={reportFormats}
                placeholder="Selecciona un formato"
                onSelectChange={setSelectedFormat}
                disabled={!selectedReportType}
                value={selectedFormat}
              />
            </div>
            <div className="flex w-full align-center justify-center">
              <Button type="submit">Generar Reporte</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// Componente SelectInput mejorado con soporte para estilos personalizados y onChange
const SelectInput = ({
  reportType,
  placeholder,
  onSelectChange,
  disabled = false,
  value,
}) => {
  const [selected, setSelected] = useState("");

  const handleChange = (value) => {
    setSelected(value);
    if (onSelectChange) onSelectChange(value);
  };

  return (
    <Select onValueChange={handleChange} disabled={disabled} value={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {reportType.map((item, index) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
