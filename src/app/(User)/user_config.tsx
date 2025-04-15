
import {
  MessageCircleQuestion,
  CoinsIcon,
  Home,
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
    name: "OTC",
    href: "/otc",
    icon: CoinsIcon,
    position: "top",
  },
  {
    name: "About us",
    href: "/About",
    icon: User,
    position: "top",
  },
  {
    name: "Referrals",
    href: "/profile/referrals",
    icon: Share,
    position: "top",
  },
  {
    name: "FAQs",
    href: "/faq",
    icon: MessageCircleQuestion,
    position: "top",
  }
];
