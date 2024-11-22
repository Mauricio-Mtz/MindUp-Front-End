/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from 'axios';
import { toast } from "sonner";

const SERVER = import.meta.env.VITE_API_URL;

export default function ReportsOrg() {
  const reportType = ["Miembros", "Cursos", "Usuarios"];
  const reportMembers = ["Todos", "Activos", "Inactivos"];
  const reportCourses = ["Todos", "Activos", "Inactivos"];
  const reportUsuarios = ["Por Curso", "Avance por curso", "Usuarios Terminados por curso"];
  const reportFormats = ["xlsx", "pdf"];

  const [selectedReportType, setSelectedReportType] = useState("");
  const [selectedReport, setSelectedReport] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Obtener cursos disponibles si es necesario
  useEffect(() => {
    if (selectedReportType === "Usuarios") {
      fetchCourses();
    } else {
      setCourses([]);
      setSelectedCourse(null);
    }
  }, [selectedReportType]);

  // Reset course selection when report category changes
  useEffect(() => {
    setSelectedCourse(null);
  }, [selectedReport]);

  const fetchCourses = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await fetch(`${SERVER}/content/getCoursesByOrganization/${user.organization_id}`);
      const data = await response.json();
      setCourses(data.data);
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
      toast.error("No se pudieron cargar los cursos.");
    }
  }

  const getReportOptions = () => {
    if (selectedReportType === "Miembros") return reportMembers;
    if (selectedReportType === "Cursos") return reportCourses;
    if (selectedReportType === "Usuarios") return reportUsuarios;
    return [];
  };

  const downloadReport = async () => {
    const reportData = {
      reportType: selectedReportType,
      reportCategory: selectedReport,
      course: selectedCourse,
      format: selectedFormat,
    };
  
    // Validations
    if (!reportData.reportCategory || !reportData.reportType) {
      toast.error("Seleccione un tipo de reporte y un reporte válido.");
      return;
    }
  
    if (reportData.reportType === "Usuarios" && 
        ["Por Curso", "Avance por curso", "Usuarios Terminados por curso"].includes(reportData.reportCategory)) {
      if (!reportData.course) {
        toast.error("Seleccione el curso del cual desea hacer el reporte.");
        return;
      }
    }
  
    try {
      const response = await axios.post(
        `${SERVER}/reports/getReport`,
        reportData,
        { responseType: 'blob' }
      );
  
      // Verify if response is JSON error
      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('application/json')) {
        const text = await response.data.text();
        const jsonResponse = JSON.parse(text);
  
        if (!jsonResponse.success) {
          toast.error(jsonResponse.message || 'Error al generar el reporte.');
          return;
        }
      }
  
      // Process downloadable file
      const date = new Date().toISOString().split('T')[0] + '-' + 
                   new Date().getHours().toString().padStart(2, '0') + 
                   new Date().getMinutes().toString().padStart(2, '0');
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
            {/* Selector de tipo de reporte */}
            <div className="w-[250px]">
              <Label>Tipo de reporte</Label>
              <SelectInput
                reportType={reportType}
                placeholder="Selecciona un tipo"
                onSelectChange={setSelectedReportType}
                value={selectedReportType}
              />
            </div>

            {/* Selector de categoría por tipo de reporte */}
            <div className="w-[250px]">
              <Label>Categoría</Label>
              <SelectInput
                reportType={getReportOptions()}
                placeholder="Selecciona un reporte"
                onSelectChange={setSelectedReport}
                value={selectedReport}
                disabled={!selectedReportType}
              />
            </div>

            {/* Selector de curso para reportes de usuarios específicos */}
            {selectedReportType === "Usuarios" && 
             ["Por Curso", "Avance por curso", "Usuarios Terminados por curso"].includes(selectedReport) && (
              <div className="w-[250px]">
                <Label>Curso</Label>
                <Select 
                  onValueChange={(value) => {
                    setSelectedCourse(value);
                  }} 
                  value={selectedCourse?.id || ""}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={selectedCourse ? courses.find((course) => course.id === selectedCourse)?.name : "Selecciona un curso"}/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {courses.length > 0 ? (
                        courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem disabled value="">
                          No hay cursos disponibles
                        </SelectItem>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Selector de formato */}
            <div className="w-[150px]">
              <Label>Formato</Label>
              <SelectInput
                reportType={reportFormats}
                placeholder="Selecciona un formato"
                onSelectChange={setSelectedFormat}
                value={selectedFormat}
              />
            </div>

            {/* Botón para generar reporte */}
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
const SelectInput = ({ reportType, placeholder, onSelectChange, disabled = false, value }) => {
  return (
    <Select 
      onValueChange={onSelectChange} 
      disabled={disabled} 
      value={value}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {reportType.map((item, index) => (
            <SelectItem key={index} value={item.value || item}>
              {item.label || item }
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};