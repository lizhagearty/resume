import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Liz Hagearty",
  initials: "DV",
  url: "https://lizhagearty.me",
  location: "Portland, OR | New York, NY | Remote",
  // locationLink: "https://www.google.com/maps/place/portland",
  description:
    "Engineer. Artist. Entrepreneur.",
  summary:
    "I've always had a thing for both creativity and logic, which is how I ended up studying Computer Science at Berkeley and then spending 6 years as a software engineer. In 2021, I made a calculated choice to jump full time into the creative world, where I'd end up making videos for some of the biggest names in electronic music like EDC and GRiZ. 150 million total views later, ____. Let's create!",
  avatarUrl: "/me.png",
  skills: [
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "CSS",
    "Tailwind",
    "HTML",
    "Python",
    "GraphQL",
    "Git",
    "NPM",
    "Figma",
    "Responsive Web Design",
    "Accessibility",
    "WebFlow"
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    // { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "hello@example.com",
    tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/lizhagearty/",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/liz-hagearty/",
        icon: Icons.linkedin,

        navbar: true,
      },

      Instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/lizhagearty/",
        icon: Icons.instagram,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "University of California, Berkeley",
      href: "https://berkeley.edu",
      badges: [],
      location: "Berkeley, CA",
      title: "BA",
      team: "Computer Science",
      logoUrl: "/cal.png",
      start: "2012",
      end: "2015",
      description:
        "Major in Computer Science; Minor in Gender & Women's Studies"
    },
    {
      company: "Square (Block Inc)",
      href: "#",
      badges: [],
      location: "San Francisco, CA",
      title: "Software Engineering Intern",
      team: "Customers",
      logoUrl: "/square.png",
      start: "2015",
      end: "2015",
      description: "• Implemented interactive d3 visualization graphs in Square Dashboard, enabling merchants to better analyze sales data and customer behavior. \n •  Used ruby, coffeescript, handlebars, slim and sass."
    },
    {
      company: "Square (Block Inc)",
      href: "#",
      badges: [],
      location: "San Francisco, CA",
      title: "Software Engineer",
      team: "Dashboard",
      logoUrl: "/square.png",
      start: "2016",
      end: "2018",
      description:
        "• Improved core Dashboard components, enhancing UX for millions of merchants, and the dozen product teams building in the repository.\n• Implemented new data tracking, supported engineers with office hours.\n• Upgraded Dashboard infrastructure: migrated CoffeeScript to JavaScript, updated Ember framework."
    },
    {
      company: "Square (Block Inc)",
      href: "#",
      badges: [],
      location: "San Francisco, CA",
      title: "UI Engineer",
      team: "Glass Design System",
      logoUrl: "/square.png",
      start: "2018",
      end: "2019",
      description:
        "• Core member of a specialized team responsible for creating and implementing Square's design system, reusable UI components to standardize UI/UX across all web teams.\n• Built custom interactive documentation platform with a component playground and code examples, improving code reuse and ensuring design consistency across teams.\n• Standardized UI components for mobile by transitioning from .mobile classes to breakpoint-driven design, improving consistency and responsiveness across all devices."
    },
    {
      company: "Square (Block Inc)",
      href: "#",
      badges: [],
      location: "San Francisco, CA",
      title: "Senior Software Engineer",
      team: "Dashboard",
      logoUrl: "/square.png",
      start: "2019",
      end: "2020",
      description:
        "• Led the redesign of the Square Dashboard home page, modernizing and modularizing the code architecture, resolving a decade of technical debt, rolled out to 3 Million daily active users.\n• Improved the development experience for 100+ engineers across 15+ teams, enhancing the modularity, maintainability, and scalability of the codebase.\n• Very active in engineering hiring. Was core to creating a standardized hiring rubric to improve clarity, consistency, and equity."
    },
    {
      company: "Square (Block Inc)",
      href: "#",
      badges: [],
      location: "San Francisco, CA",
      title: "Senior Software Engineer",
      team: "Customer Data Platform",
      logoUrl: "/square.png",
      start: "2020",
      end: "2021",
      description:
        "• Recruited as the sole frontend engineer to build out the interface for an internal data segmentation tool, which processed millions of user attributes to enable personalized software experiences.\n• Architected the frontend using React and TypeScript.\n• Collaborated with design to determine UI/UX, roadmap, technical goals, and rollout strategy.\n• Operationalized communication between design and backend teams."
    },
    {
      company: "Videographer and Creative Director",
      href: "#",
      badges: [],
      location: "Los Angeles | Portland, OR",
      title: "Freelance",
      team: "Republic Records, Insomniac, GRiZ, etc.",
      logoUrl: "/sparkle.png",
      start: "2021",
      end: "Present",
      description:
        "• Led end-to-end content creation, from ideation and pitching to filming, editing, and posting, resulting in over 150 million views\n• Clients include Insomniac, Republic Records, Red Light Management, GRiZ, and Leah Kate. Creating content in the intimate setting of artist's homes to global music festivals such as EDC, Bonnaroo, and Electric Forest.\n• Grew personal TikTok to 63k followers and 15 million views"
    },
    {
      company: "StoryCut",
      href: "#",
      badges: [],
      location: "Portland, OR",
      title: "Co-founder, Engineer and Designer",
      team: "",
      logoUrl: "/storycut.png",
      start: "2024",
      end: "Present",
      description: 
        "• Created novel solution for long-form content creators to automate rough cut generation, saving users hours in editing.\n• Designed in Figma\n• Built with React, TypeScript, Next.js, and Tailwind"
    }
  ],
} as const;
