interface TimeData {
  hours: number;
  minutes: number;
  seconds: number;
  total_seconds: number;
  digital: string;
  decimal: string;
  text: string;
  percent?: number;
}

interface RangeData {
  start: string;
  end: string;
  date: string;
  text: string;
  timezone: string;
}

interface ProjectData extends TimeData {
  name: string;
  color: string | null;
}

interface LanguageData extends TimeData {
  name: string;
}

interface DependencyData extends TimeData {
  name: string;
}

interface MachineData extends TimeData {
  name: string;
  machine_name_id: string;
}

interface EditorData extends TimeData {
  name: string;
}

interface OperatingSystemData extends TimeData {
  name: string;
}

interface CategoryData extends TimeData {
  name: string;
}

export interface WakaTimeStats {
  grand_total: TimeData;
  range: RangeData;
  projects: ProjectData[];
  languages: LanguageData[];
  dependencies: DependencyData[];
  machines: MachineData[];
  editors: EditorData[];
  operating_systems: OperatingSystemData[];
  categories: CategoryData[];
}