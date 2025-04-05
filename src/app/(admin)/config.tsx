import {
  Bell,
  CoinsIcon,
  Home,
  PaperclipIcon,
  Settings,
  Share,
  User,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  position: string;
}
export const NavItems : NavItem[] = [
  {
    name: "Home",
    href: "/",
    icon: Home,
    position: "top",
  },
  {
    name: "Users",
    href: "/user_management",
    icon: User,
    position: "top",
  },
  {
    name: "Kyc",
    href: "/notifications",
    icon: PaperclipIcon,
    position: "top",
  },
  {
    name: "Coins",
    href: "/notifications",
    icon: CoinsIcon,
    position: "top",
  },
  {
    name: "Withdrawal",
    href: "/Withdrawal_request",
    icon: User,
    position: "top",
  },
  {
    name: "Referrals",
    href: "/referral_system",
    icon: Share,
    position: "top",
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: Bell,
    position: "top",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    position: "bottom",
  },
];
