import {
  Bell,
  Home,
  Settings,
  Share,
  User,
  Wallet,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  position: string;
}

export const NavItems: NavItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
    position: "top",
  },
  {
    name: "User Management",
    href: "/user_management",
    icon: User,
    position: "top",
  },
  {
    name: "KYC Requests",
    href: "/kyc",
    icon: ShieldCheck,
    position: "top",
  },
  {
    name: "Transactions",
    href: "/admin/transactions",
    icon: TrendingUp,
    position: "top",
  },
  {
    name: "Withdrawal Requests",
    href: "/withdrawals",
    icon: Wallet,
    position: "top",
  },
  {
    name: "Referrals stats",
    href: "/referral_system",
    icon: Share,
    position: "top",
  },
  {
    name: "Notifications",
    href: "/admin/notifications",
    icon: Bell,
    position: "top",
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
    position: "bottom",
  },
];
