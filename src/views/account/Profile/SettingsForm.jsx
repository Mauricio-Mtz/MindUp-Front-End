// SettingsForm.js
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch";
import { useDarkMode } from '@/hooks/useDarkMode';

export function SettingsForm() {
    const [isDarkMode, toggleDarkMode] = useDarkMode();

    return (
        <div className="flex flex-col gap-2 mt-2 p-4 border rounded-md mb-2">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Configuración</h2>
            <div className="space-y-2">
                <div className="flex text-left sm:flex-row justify-between items-center gap-2">
                    <Label htmlFor="nombre">Tema</Label>
                    <div className="w-full sm:w-3/4 flex justify-end">
                        <span className="dark:text-gray-400 text-gray-600">🌞</span>
                        <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
                        <span className="dark:text-gray-400 text-gray-600">🌜</span>
                    </div>
                </div>
            </div>
    </div>
    );
}
