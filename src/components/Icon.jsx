import {
  AppWindow, BookOpen, Camera, ClipboardList, Eye, FileBarChart, FileText, IdCard, Lock, QrCode,
  GraduationCap, Target, ShieldCheck, SlidersHorizontal, UserCheck, Users, Workflow,
} from 'lucide-react';

// Single Lucide icon set, looked up by name from content.js.
const ICONS = {
  AppWindow, BookOpen, Camera, ClipboardList, Eye, FileBarChart, FileText, IdCard, Lock, QrCode,
  GraduationCap, Target, ShieldCheck, SlidersHorizontal, UserCheck, Users, Workflow,
};

export default function Icon({ name, size = 22 }) {
  const Cmp = ICONS[name];
  return Cmp ? <Cmp size={size} aria-hidden="true" strokeWidth={1.75} /> : null;
}
