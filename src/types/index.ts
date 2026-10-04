export type MovementType = 'entrada' | 'inicio_comida' | 'fin_comida' | 'salida';

export interface MovementRecord {
  id: string;
  type: MovementType;
  label: string;
  time: string; // "08:02"
  timestamp: string; // ISO string
  locationName: string;
  coords: {
    lat: number;
    lng: number;
  };
  method: 'biometric' | 'gps_remote' | 'qr_code' | 'manual';
  verified: boolean;
  notes?: string;
}

export interface DayAttendance {
  dateString: string; // "2026-09-29"
  displayDate: string; // "Lunes 29 de septiembre"
  dayOfWeek: string; // "L" | "M" | "M" | "J" | "V" | "S" | "D"
  dayNumber: number; // 29
  movements: MovementRecord[];
  totalWorkedHours?: string; // "09:03"
  extraHours?: string; // "00:30"
  status: 'presente' | 'en_trabajo' | 'en_comida' | 'salio' | 'ausente' | 'retardo';
}

export interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  email: string;
  phone: string;
  avatarUrl: string;
  branch: string;
  schedule: string;
  status: 'presente' | 'en_trabajo' | 'en_comida' | 'salio' | 'ausente';
  lastMovementTime?: string;
  weeklyWorkedHours: string;
  weeklyExtraHours: string;
  weeklyAttendances: number;
  weeklyAbsences: number;
}

export interface Solicitud {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'vacaciones' | 'permisos' | 'horas_extra';
  typeLabel: string;
  startDate: string;
  endDate: string;
  daysOrHours: string;
  reason: string;
  status: 'pendiente' | 'aprobada' | 'rechazada';
  createdAt: string;
}

export interface AttendanceKPIs {
  totalEmployees: number;
  presentes: number;
  ausentes: number;
  enComida: number;
  attendanceRate: number; // e.g. 87%
}

export type MobileTab = 'inicio' | 'registros' | 'solicitudes' | 'perfil';
export type MobileScreen = 
  | 'home' 
  | 'register_movement' 
  | 'records' 
  | 'remote_check' 
  | 'summary' 
  | 'request_modal';
