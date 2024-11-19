import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from 'axios';
import { toast } from "sonner";

const SERVER = import.meta.env.VITE_API_URL;

export default function ReportsOrg() {
  const reportType = ["Miembros", "Cursos", "Usuarios"];
  const reportMembers = ["Todos", "Activos", "Inactivos"];
  const reportCourses = ["Todos", "Activos", "Inactivos", "Participantes"];
  const reportUsuarios = ["Todos x Curso", "Avance x curso", "Calificaciones", "Usuarios Terminados"];
  const reportFormats = ["xlsx", "pdf"];

  const [selectedReportType, setSelectedReportType] = useState("");
  const [selectedReport, setSelectedReport] = useState("");
  const [nombre, setNombre] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("pdf");

  // Actualizar las opciones disponibles basado en el tipo de reporte
  const getReportOptions = () => {
    if (selectedReportType === "Miembros") return reportMembers;
    if (selectedReportType === "Cursos") return reportCourses;
    if (selectedReportType === "Usuarios") return reportUsuarios;
    return [];
  };

  // Limpiar `selectedReport` cuando cambia el `selectedReportType`
  useEffect(() => {
    setSelectedReport("");
  }, [selectedReportType]);

  const downloadReport = async () => {
    const reportData = {
      reportType: selectedReportType,
      report: selectedReport,
      name: nombre,
      format: selectedFormat,
    };

    if (!reportData.report || !reportData.reportType) {
      toast.error("Seleccione un tipo de reporte y un reporte válido.");
      return;
    }

    try {
      const response = await axios.post(
        `${SERVER}/reports/getReport`,
        reportData,
        { responseType: 'blob' }
      );
      const date = new Date().toISOString().split('T')[0] + '-' + new Date().getHours().toString().padStart(2, '0') + new Date().getMinutes().toString().padStart(2, '0');
      const fileFormat = reportData.format === 'xlsx' ? 'xlsx' : 'pdf';
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${selectedReportType} - ${selectedReport} - ${date}.${fileFormat}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error al descargar el reporte:', error);
      toast.error('Error al descargar el reporte.');
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
            className="flex flex-wrap gap-4 items-center justify-center"
            onSubmit={(e) => {
              e.preventDefault();
              downloadReport();
            }}
          >
            <div className="w-[250px]">
              <Label>Tipo de reporte</Label>
              <SelectInput
                reportType={reportType}
                placeholder="Selecciona un tipo"
                onSelectChange={setSelectedReportType}
                value={selectedReportType}
              />
            </div>
            <div className="w-[250px]">
              <Label>Reporte</Label>
              <SelectInput
                reportType={getReportOptions()}
                placeholder="Selecciona un reporte"
                onSelectChange={setSelectedReport}
                value={selectedReport}
                disabled={!selectedReportType}
              />
            </div>
            <div className="w-[400px]">
              <Label>Nombre del {selectedReportType}</Label>
              <Input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                disabled={!selectedReportType}
              />
            </div>
            <div className="w-[150px]">
              <Label>Formato</Label>
              <SelectInput
                reportType={reportFormats}
                placeholder="Selecciona un formato"
                onSelectChange={setSelectedFormat}
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

// Componente SelectInput mejorado
const SelectInput = ({
  reportType,
  placeholder,
  onSelectChange,
  disabled = false,
  value,
}) => {
  return (
    <Select onValueChange={onSelectChange} disabled={disabled} value={value}>
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
