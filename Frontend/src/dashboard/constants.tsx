import { 
  CheckCircle, 
  Users, 
  FileText, 
  ShieldAlert,
  Activity,
  Search,
  LayoutDashboard,
  BookOpen,
  Bell,
  User,
  MoreVertical,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Trash2,
  MessageSquare,
  Wrench,
  Briefcase,
  Mail
} from 'lucide-react';
import type { KPI, Activity as ActivityItem, BlogPost } from './types';

export const KPIS: KPI[] = [
  { label: 'Total Validations', value: '1,284', change: 12.5, trend: 'up', icon: 'CheckCircle' },
  { label: 'Active Clients', value: '342', change: 4.2, trend: 'up', icon: 'Users' },
  { label: 'Compliance Score', value: '98.4%', change: 0.8, trend: 'up', icon: 'ShieldAlert' },
  { label: 'Open Audits', value: '18', change: -2, trend: 'down', icon: 'Activity' }
];

export const RECENT_ACTIVITY: ActivityItem[] = [
  { id: '1', user: 'Sarah Jenkins', action: 'Finalized CSV Protocol', status: 'success', date: '2024-05-15 14:30', project: 'PharmaCore v2.0' },
  { id: '2', user: 'Mark Thompson', action: 'System Audit Failed', status: 'error', date: '2024-05-15 12:45', project: 'BioSync Global' },
  { id: '3', user: 'Alex Rivera', action: 'New QA Review Assigned', status: 'pending', date: '2024-05-15 11:15', project: 'MediFlow Systems' },
  { id: '4', user: 'Jessica Wu', action: 'Regulatory Update Applied', status: 'warning', date: '2024-05-14 16:20', project: 'General Compliance' },
  { id: '5', user: 'David Smith', action: 'Drafted Validation Summary', status: 'success', date: '2024-05-14 14:10', project: 'CloudData V1' }
];

export const MOCK_BLOGS: BlogPost[] = [
  { 
    id: '1', 
    title: 'The Future of Computer System Validation (CSV)', 
    excerpt: 'Exploring how cloud-based infrastructures are reshaping traditional CSV methodologies in 2024.', 
    category: 'CSV', 
    publishDate: 'May 12, 2024', 
    author: 'Dr. Emily Carter',
    image: 'https://picsum.photos/seed/csv/800/400'
  },
  { 
    id: '2', 
    title: 'QA Best Practices for Small Pharma', 
    excerpt: 'Streamlining quality assurance workflows without compromising on rigorous compliance standards.', 
    category: 'QA', 
    publishDate: 'May 08, 2024', 
    author: 'Robert Vance',
    image: 'https://picsum.photos/seed/qa/800/400'
  },
  { 
    id: '3', 
    title: 'Preparing for FDA Part 11 Audits', 
    excerpt: 'A comprehensive checklist to ensure your digital records meet federal requirements.', 
    category: 'Compliance', 
    publishDate: 'May 01, 2024', 
    author: 'Jessica Miller',
    image: 'https://picsum.photos/seed/audit/800/400'
  },
  { 
    id: '4', 
    title: 'Risk-Based Validation Approaches', 
    excerpt: 'Why adopting a risk-based strategy can save hundreds of man-hours during system deployment.', 
    category: 'Validation', 
    publishDate: 'April 25, 2024', 
    author: 'Sam Harrison',
    image: 'https://picsum.photos/seed/risk/800/400'
  },
  { 
    id: '5', 
    title: 'Digital Health Compliance Strategies', 
    excerpt: 'Managing SaMD (Software as a Medical Device) validations in a rapidly evolving market.', 
    category: 'Compliance', 
    publishDate: 'April 18, 2024', 
    author: 'Dr. Emily Carter',
    image: 'https://picsum.photos/seed/health/800/400'
  }
];

export const COMPLIANCE_TREND_DATA = [
  { name: 'Jan', score: 92, target: 95 },
  { name: 'Feb', score: 94, target: 95 },
  { name: 'Mar', score: 91, target: 95 },
  { name: 'Apr', score: 96, target: 95 },
  { name: 'May', score: 98, target: 95 },
  { name: 'Jun', score: 97, target: 95 },
];

export const DISTRIBUTION_DATA = [
  { name: 'Validated', value: 400, color: '#10b981' },
  { name: 'In Review', value: 300, color: '#f59e0b' },
  { name: 'Pending', value: 200, color: '#0d9488' },
  { name: 'Failed', value: 100, color: '#ef4444' },
];

export const ICONS = {
  CheckCircle, 
  Users, 
  FileText, 
  ShieldAlert,
  Activity,
  Search,
  LayoutDashboard,
  BookOpen,
  Bell,
  User,
  MoreVertical,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Trash2,
  MessageSquare,
  Wrench,
  Briefcase,
  Mail
};
