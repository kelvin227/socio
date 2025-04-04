
import {
  MessageCircleQuestion,
  CoinsIcon,
  Home,
  PaperclipIcon,
  Settings,
  Share,
  User
} from "lucide-react";
import { NavItem } from "../(admin)/config";

export const NavItems: NavItem[] = [
  {
    name: "Home",
    href: "/user_dashboard",
    icon: Home,
    position: "top",
  },
  {
    name: "Profile",
    href: "/profile",
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
    name: "OTC",
    href: "/otc",
    icon: CoinsIcon,
    position: "top",
  },
  {
    name: "About us",
    href: "/notifications",
    icon: User,
    position: "top",
  },
  {
    name: "Referrals",
    href: "/notifications",
    icon: Share,
    position: "top",
  },
  {
    name: "FAQs",
    href: "/notifications",
    icon: MessageCircleQuestion,
    position: "top",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    position: "bottom",
  },
];
