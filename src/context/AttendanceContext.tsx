import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  DayAttendance, 
  Employee, 
  MovementRecord, 
  MovementType, 
  Solicitud,
  MobileTab,
  MobileScreen
} from '../types';
import { CURRENT_EMPLOYEE, INITIAL_DAYS_ATTENDANCE, INITIAL_SOLICITUDES } from '../data/mockData';

interface AttendanceContextType {
  employee: Employee;
  daysAttendance: DayAttendance[];
  solicitudes: Solicitud[];
  activeTab: MobileTab;
  currentScreen: MobileScreen;
  isDrawerOpen: boolean;
  pendingMovement: {
    type: MovementType;
    label: string;
    time: string;
    locationName: string;
    isRemote: boolean;
  } | null;
  currentTime: Date;
  currentTimeString: string;
  currentDateDisplay: string;
  isWithinGeofence: boolean;
  gpsCoords: { lat: number; lng: number; address: string };
  toastMessage: string | null;
  selectedHistoryDay: number;
  
  // Navigation & Drawer
  setActiveTab: (tab: MobileTab) => void;
  setCurrentScreen: (screen: MobileScreen) => void;
  navigateTo: (screen: MobileScreen) => void;
  setSelectedHistoryDay: (day: number) => void;
  setIsDrawerOpen: (open: boolean) => void;
  toggleDrawer: () => void;
  
  // Punch operations
  prepareMovementPunch: (type: MovementType, isRemote?: boolean) => void;
  confirmMovementPunch: () => void;
  cancelMovementPunch: () => void;
  directPunch: (type: MovementType, isRemote?: boolean) => void;
  
  // Requests
  createSolicitud: (data: Omit<Solicitud, 'id' | 'createdAt' | 'status' | 'employeeId' | 'employeeName'>) => void;
  
  // Geolocation simulation
  toggleGeofence: () => void;
  setGpsLocation: (address: string, lat: number, lng: number, withinOffice: boolean) => void;
  resetAllData: () => void;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ATTENDANCE: 'mi_checador_attendance_v1',
  EMPLOYEE: 'mi_checador_employee_v1',
  SOLICITUDES: 'mi_checador_solicitudes_v1',
};

export const AttendanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Stored state
  const [employee, setEmployee] = useState<Employee>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EMPLOYEE);
      return saved ? JSON.parse(saved) : CURRENT_EMPLOYEE;
    } catch {
      return CURRENT_EMPLOYEE;
    }
  });

  const [daysAttendance, setDaysAttendance] = useState<DayAttendance[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
      return saved ? JSON.parse(saved) : INITIAL_DAYS_ATTENDANCE;
    } catch {
      return INITIAL_DAYS_ATTENDANCE;
    }
  });

  const [solicitudes, setSolicitudes] = useState<Solicitud[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SOLICITUDES);
      return saved ? JSON.parse(saved) : INITIAL_SOLICITUDES;
    } catch {
      return INITIAL_SOLICITUDES;
    }
  });

  // Navigation states
  const [activeTab, setActiveTab] = useState<MobileTab>('inicio');
  const [currentScreen, setCurrentScreen] = useState<MobileScreen>('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedHistoryDay, setSelectedHistoryDay] = useState<number>(29);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Time & Location
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isWithinGeofence, setIsWithinGeofence] = useState<boolean>(true);
  const [gpsCoords, setGpsCoords] = useState<{ lat: number; lng: number; address: string }>({
    lat: 19.4326,
    lng: -99.1332,
    address: 'Oficina Principal (Insurgentes Sur)',
  });

  // Pending movement to confirm in Screen 2
  const [pendingMovement, setPendingMovement] = useState<{
    type: MovementType;
    label: string;
    time: string;
    locationName: string;
    isRemote: boolean;
  } | null>(null);

  // Live timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(daysAttendance));
      localStorage.setItem(STORAGE_KEYS.EMPLOYEE, JSON.stringify(employee));
      localStorage.setItem(STORAGE_KEYS.SOLICITUDES, JSON.stringify(solicitudes));
    } catch (e) {
      console.warn('Storage save error:', e);
    }
  }, [daysAttendance, employee, solicitudes]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(prev => !prev);
  };

  // Format current time "08:02" or HH:MM
  const formatTimeHM = (date: Date): string => {
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
  };

  // Format date display: e.g. "Lunes, 29 de septiembre de 2026"
  const getCurrentDateDisplay = (): string => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    const formatted = currentTime.toLocaleDateString('es-ES', options);
    // Capitalize first letter
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  const getLabelForType = (type: MovementType): string => {
    switch (type) {
      case 'entrada': return 'Entrada';
      case 'inicio_comida': return 'Inicio de comida';
      case 'fin_comida': return 'Fin de comida';
      case 'salida': return 'Salida';
    }
  };

  const navigateTo = (screen: MobileScreen) => {
    setCurrentScreen(screen);
    setIsDrawerOpen(false);
    if (screen === 'home') setActiveTab('inicio');
    if (screen === 'records') setActiveTab('registros');
    if (screen === 'summary') setActiveTab('perfil');
    if (screen === 'request_modal') setActiveTab('solicitudes');
  };

  const handleSetActiveTab = (tab: MobileTab) => {
    setActiveTab(tab);
    setIsDrawerOpen(false);
    switch (tab) {
      case 'inicio':
        setCurrentScreen('home');
        break;
      case 'registros':
        setCurrentScreen('records');
        break;
      case 'solicitudes':
        setCurrentScreen('request_modal');
        break;
      case 'perfil':
        setCurrentScreen('summary');
        break;
    }
  };

  // Prepare movement for Screen 2
  const prepareMovementPunch = (type: MovementType, isRemote: boolean = false) => {
    const timeStr = formatTimeHM(currentTime);
    const locName = isRemote ? 'Av. Reforma 123, Ciudad de México' : 'Oficina Principal';
    setPendingMovement({
      type,
      label: getLabelForType(type),
      time: timeStr,
      locationName: locName,
      isRemote,
    });
    setCurrentScreen('register_movement');
  };

  const cancelMovementPunch = () => {
    setPendingMovement(null);
    setCurrentScreen('home');
  };

  // Direct or Confirmed punch
  const executePunch = (
    type: MovementType, 
    timeStr: string, 
    locName: string, 
    coords: { lat: number; lng: number }, 
    isRemote: boolean
  ) => {
    const newMovement: MovementRecord = {
      id: `mov-${Date.now()}`,
      type,
      label: getLabelForType(type),
      time: timeStr,
      timestamp: new Date().toISOString(),
      locationName: locName,
      coords,
      method: isRemote ? 'gps_remote' : 'biometric',
      verified: true,
    };

    // Find or create today's record in daysAttendance
    const todayNum = currentTime.getDate();
    const todayDateString = currentTime.toISOString().slice(0, 10);
    const todayDisplay = getCurrentDateDisplay();

    setDaysAttendance(prev => {
      const copy = [...prev];
      const todayIndex = copy.findIndex(d => d.dateString === todayDateString || d.dayNumber === 29); // sync with demo or today
      
      let nextStatus: DayAttendance['status'] = 'en_trabajo';
      if (type === 'entrada') nextStatus = 'en_trabajo';
      else if (type === 'inicio_comida') nextStatus = 'en_comida';
      else if (type === 'fin_comida') nextStatus = 'en_trabajo';
      else if (type === 'salida') nextStatus = 'salio';

      if (todayIndex >= 0) {
        const existingDay = copy[todayIndex];
        copy[todayIndex] = {
          ...existingDay,
          status: nextStatus,
          movements: [...existingDay.movements, newMovement],
        };
      } else {
        copy.unshift({
          dateString: todayDateString,
          displayDate: todayDisplay,
          dayOfWeek: 'L',
          dayNumber: todayNum,
          status: nextStatus,
          totalWorkedHours: '08:00',
          extraHours: '00:00',
          movements: [newMovement],
        });
      }
      return copy;
    });

    // Update Employee active status
    setEmployee(prev => {
      let status: Employee['status'] = 'en_trabajo';
      if (type === 'entrada') status = 'en_trabajo';
      if (type === 'inicio_comida') status = 'en_comida';
      if (type === 'fin_comida') status = 'en_trabajo';
      if (type === 'salida') status = 'salio';

      return {
        ...prev,
        status,
        lastMovementTime: timeStr,
      };
    });

    // Confetti celebration
    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#22c55e', '#3b82f6', '#f59e0b', '#10b981'],
      });
    } catch {
      // ignore
    }

    showToast(`✓ ${getLabelForType(type)} registrada exitosamente a las ${timeStr}`);
  };

  const confirmMovementPunch = () => {
    if (!pendingMovement) return;
    executePunch(
      pendingMovement.type,
      pendingMovement.time,
      pendingMovement.locationName,
      pendingMovement.isRemote ? { lat: 19.4270, lng: -99.1677 } : gpsCoords,
      pendingMovement.isRemote
    );
    setPendingMovement(null);
    setCurrentScreen('home');
  };

  const directPunch = (type: MovementType, isRemote: boolean = false) => {
    const timeStr = formatTimeHM(currentTime);
    const locName = isRemote ? 'Av. Reforma 123, Ciudad de México' : 'Oficina Principal';
    executePunch(
      type,
      timeStr,
      locName,
      isRemote ? { lat: 19.4270, lng: -99.1677 } : gpsCoords,
      isRemote
    );
  };

  const createSolicitud = (data: Omit<Solicitud, 'id' | 'createdAt' | 'status' | 'employeeId' | 'employeeName'>) => {
    const newSol: Solicitud = {
      id: `sol-${Date.now()}`,
      employeeId: employee.id,
      employeeName: employee.name,
      ...data,
      status: 'pendiente',
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setSolicitudes(prev => [newSol, ...prev]);
    showToast(`Solicitud de ${data.typeLabel} enviada a RH`);
  };

  const toggleGeofence = () => {
    setIsWithinGeofence(prev => !prev);
  };

  const setGpsLocation = (address: string, lat: number, lng: number, withinOffice: boolean) => {
    setGpsCoords({ lat, lng, address });
    setIsWithinGeofence(withinOffice);
  };

  const resetAllData = () => {
    setEmployee(CURRENT_EMPLOYEE);
    setDaysAttendance(INITIAL_DAYS_ATTENDANCE);
    setSolicitudes(INITIAL_SOLICITUDES);
    setCurrentScreen('home');
    setActiveTab('inicio');
    setIsDrawerOpen(false);
    showToast('Datos reiniciados con éxito');
  };

  return (
    <AttendanceContext.Provider
      value={{
        employee,
        daysAttendance,
        solicitudes,
        activeTab,
        currentScreen,
        isDrawerOpen,
        pendingMovement,
        currentTime,
        currentTimeString: formatTimeHM(currentTime),
        currentDateDisplay: getCurrentDateDisplay(),
        isWithinGeofence,
        gpsCoords,
        toastMessage,
        selectedHistoryDay,
        setActiveTab: handleSetActiveTab,
        setCurrentScreen,
        navigateTo,
        setSelectedHistoryDay,
        setIsDrawerOpen,
        toggleDrawer,
        prepareMovementPunch,
        confirmMovementPunch,
        cancelMovementPunch,
        directPunch,
        createSolicitud,
        toggleGeofence,
        setGpsLocation,
        resetAllData,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error('useAttendance must be used within an AttendanceProvider');
  }
  return context;
};
