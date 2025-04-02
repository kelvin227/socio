
import {
  MessageCircleQuestion,
  CoinsIcon,
  Home,
  PaperclipIcon,
  Settings,
  Share,
  User,
} from "lucide-react";
import { IconTransfer } from "@tabler/icons-react";
import { NavItem } from "../(admin)/config";

export const NavItems: NavItem[] = [
  {
    name: "Home",
    href: "/",
    icon: <Home size={20} />,
    position: "top",
  },
  {
    name: "Profile",
    href: "/profile",
    icon: <User size={20} />,
    position: "top",
  },
  {
    name: "Kyc",
    href: "/notifications",
    icon: <PaperclipIcon size={20} />,
    position: "top",
  },
  {
    name: "OTC",
    href: "/notifications",
    icon: <CoinsIcon size={20} />,
    position: "top",
  },
  {
    name: "About us",
    href: "/notifications",
    icon: <IconTransfer size={20} />,
    position: "top",
  },
  {
    name: "Referrals",
    href: "/notifications",
    icon: <Share size={20} />,
    position: "top",
  },
  {
    name: "FAQs",
    href: "/notifications",
    icon: <MessageCircleQuestion size={20} />,
    position: "top",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: <Settings size={20} />,
    position: "bottom",
  },
];
