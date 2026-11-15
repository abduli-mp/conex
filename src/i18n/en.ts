import type { Dict } from "./de";

export const en: Dict = {
  meta: {
    title: "Conex – IT service & repair",
    description:
      "Conex – repair and support for PCs, laptops and networks. Diagnosis first, then a quote.",
  },

  nav: {
    home: "home",
    services: "services",
    contact: "contact",
    signIn: "Sign in",
    menu: "Open or close menu",
    primary: "Main navigation",
  },

  language: {
    label: "Language",
    de: "Deutsch",
    en: "English",
  },

  hero: {
    title: "Computer broken? We'll get it running again.",
    text: "Repair and support for PCs, laptops and networks – for private customers and small businesses. You describe the problem, we get back to you with a clear proposal before anything is repaired.",
    ctaTicket: "Create a ticket",
    ctaTrack: "Track ticket",
    note: "We change nothing without your approval.",
    card: {
      label: "Sample ticket",
      device: "Device",
      deviceValue: "Laptop",
      issue: "Problem",
      issueValue: "Won't start, fan spins up loudly",
      steps: [
        { label: "Received", state: "done" },
        { label: "Under review", state: "done" },
        { label: "Quote", state: "current" },
        { label: "Repair", state: "todo" },
        { label: "Done", state: "todo" },
      ],
    },
  },

  facts: {
    items: [
      { title: "Systems", text: "Windows, macOS, Linux" },
      { title: "Devices", text: "Laptops, desktop PCs, routers, printers" },
      { title: "Customers", text: "Private and small businesses" },
    ],
  },

  services: {
    title: "Services",
    aside: "Hardware, software and everything in between.",
    intro:
      "From diagnosis to a backup that actually runs. If something isn't on the list, just ask.",
    casesLabel: "Typical cases",
    more: "See all services",
    items: [
      {
        name: "PC and laptop repair",
        text: "We find the cause and replace what is broken – display, battery, fan, power supply, drive.",
        cases: [
          "Device won't start or shuts down",
          "Cracked or flickering display",
          "Battery barely lasts",
          "Loud fan, device runs very hot",
        ],
      },
      {
        name: "Data recovery and backup",
        text: "Recover photos and documents from failed hard drives, SSDs and USB sticks – then set up a backup that really works.",
        cases: [
          "Drive is not recognised",
          "File deleted by accident",
          "Set up automatic backups",
          "Move to a new device",
        ],
      },
      {
        name: "Viruses and system cleanup",
        text: "Remove malware, reinstall Windows, get updates and drivers back in order.",
        cases: [
          "Browser keeps opening ad pages",
          "Device is slow for no obvious reason",
          "Updates keep failing",
          "Reinstall while keeping your data",
        ],
      },
      {
        name: "Network and Wi-Fi",
        text: "Stable internet throughout your home or office: routers, FRITZ!Box, mesh, network printers and VPN for working from home.",
        cases: [
          "Wi-Fi drops or is too weak",
          "Set up and secure a router",
          "Connect a printer to the network",
          "Reach the company network from home",
        ],
      },
      {
        name: "Upgrades",
        text: "More memory or an SSD instead of the old hard drive – often far cheaper than a new device.",
        cases: [
          "Takes forever to boot",
          "Not enough storage",
          "Programs run sluggishly",
          "Advice on what is still worth it",
        ],
      },
      {
        name: "Setup and advice",
        text: "Set up a new device, transfer data, buying advice – and for small businesses email, Microsoft 365 and ongoing support.",
        cases: [
          "Get a new laptop ready to use",
          "Set up email accounts and calendars",
          "Buying advice for a device or router",
          "Regular maintenance for small businesses",
        ],
      },
    ],
  },

  process: {
    title: "How a repair works",
    aside: "Four steps, two sides.",
    intro:
      "A clear process between you and us. You always know where your device stands.",
    you: "You",
    us: "Us",
    steps: [
      {
        key: "A",
        title: "Create a ticket.",
        text: "Describe the device and the problem. The more precise, the better we can judge what is needed.",
      },
      {
        key: "B",
        title: "Review the request.",
        text: "We read your request, ask follow-up questions if needed and tell you what happens next.",
      },
      {
        key: "C",
        title: "Choose a time.",
        text: "You pick a suitable time to drop the device off or have us visit.",
      },
      {
        key: "D",
        title: "Fix the problem.",
        text: "Once you approve, we repair it and close the ticket when everything works again.",
      },
    ],
  },

  principles: {
    title: "How we work",
    aside: "No fine print.",
    items: [
      {
        title: "Diagnosis first, then a quote",
        text: "You learn the cause and the cost before we replace anything. Nothing is repaired without your consent.",
      },
      {
        title: "Repair before replace",
        text: "If a repair isn't worth it, we tell you openly – even if that means you buy nothing from us.",
      },
      {
        title: "Your data stays yours",
        text: "We only access data that is needed for the repair and delete copies once the job is done.",
      },
      {
        title: "A traceable invoice",
        text: "The invoice states what was done and which parts were fitted.",
      },
    ],
  },

  faq: {
    title: "Common questions",
    aside: "Short answers.",
    items: [
      {
        q: "What does a repair cost?",
        a: "That depends on the fault and the device. After the diagnosis you receive a quote with a fixed price. We only start once you agree.",
      },
      {
        q: "How long does it take?",
        a: "Simple cases often take a few days. If parts have to be ordered, the expected time is stated in the quote.",
      },
      {
        q: "Is my data safe?",
        a: "We only work with what the repair requires. Where it makes sense, we back up your data first – in agreement with you.",
      },
      {
        q: "Is a repair still worth it?",
        a: "We compare repair cost and device value and advise against repairing when a new device is the better choice.",
      },
      {
        q: "How do I get started?",
        a: "Create a ticket with the device and a description of the problem. We get in touch, clear up open questions and arrange a time.",
      },
    ],
  },

  cta: {
    title: "Something not working?",
    text: "Describe the problem in a few sentences. We'll get back to you with a proposal.",
    button: "Create a ticket",
  },

  contact: {
    title: "Contact",
    aside: "We answer every request.",
    intro:
      "A ticket is the fastest way. You can also reach us by phone or email.",
    phone: "Phone",
    email: "Email",
    address: "Address",
    hours: "Availability",
    ticketHint: "Prefer writing?",
    ticketLink: "Create a ticket",
  },

  ticket: {
    title: "Create a ticket",
    intro:
      "Describe the device and the problem. Submitting opens your email program with a prepared message to us.",
    name: "Name",
    email: "Email",
    phone: "Phone (optional)",
    device: "Device",
    deviceOptions: [
      "Laptop",
      "Desktop PC",
      "Router / network",
      "Printer",
      "Other",
    ],
    issue: "What isn't working?",
    issuePlaceholder: "When did the problem start? Any error messages?",
    handover: "How should we proceed?",
    handoverOptions: [
      "Drop off at the workshop",
      "On-site appointment",
      "Not sure yet",
    ],
    consentBefore: "I have read the",
    consentLink: "privacy policy",
    consentAfter: ".",
    submit: "Prepare request",
    subject: "Ticket",
    mailName: "Name",
    mailEmail: "Email",
    mailPhone: "Phone",
    mailDevice: "Device",
    mailHandover: "Preference",
    mailIssue: "Problem",
  },

  auth: {
    login: "Sign in",
    signup: "Sign up",
    loginTitle: "Welcome back.",
    signupTitle: "Create account.",
    loginText: "Sign in to follow your tickets.",
    signupText: "With an account you can see the status of your repair at any time.",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    password: "Password",
    forgot: "Forgot password?",
    submitLogin: "Sign in",
    submitSignup: "Create account",
    notice: "The customer area is in preparation.",
    back: "back",
  },

  notFound: {
    title: "404",
    code: "_page_not_found",
    text: "This page doesn't exist (any more).",
    back: "Back to home",
  },

  footer: {
    rights: "© 2026 Conex",
    imprint: "Legal notice",
    privacy: "Privacy",
    credit: "Built by",
    legal: "Legal",
  },

  imprint: {
    title: "Legal notice",
    section: "Information pursuant to § 5 DDG",
    contact: "Contact",
    phone: "Phone",
    email: "Email",
    vat: "VAT ID",
    responsible: "Responsible for content",
  },

  privacy: {
    title: "Privacy policy",
    blocks: [
      {
        heading: "Controller",
        text: "The operator named in the legal notice is responsible for data processing on this website.",
      },
      {
        heading: "Hosting and server logs",
        text: "When you visit this page, the hosting provider processes technically necessary data such as IP address, date, time and requested page in order to deliver and secure the website. The legal basis is Art. 6(1)(f) GDPR.",
      },
      {
        heading: "Cookies and tracking",
        text: "This website sets no cookies and uses no analytics or advertising services. Your language choice is stored only locally in your browser and is not sent to us.",
      },
      {
        heading: "Fonts",
        text: "The fonts used are loaded from our own server. No connection to third parties is made.",
      },
      {
        heading: "Contact and tickets",
        text: "If you contact us by email or through the ticket form, we process your details solely to handle your request. The ticket form opens your email program; the message is only sent once you send it. The legal basis is Art. 6(1)(b) GDPR.",
      },
      {
        heading: "Your rights",
        text: "You have the right to access, rectification, erasure, restriction of processing, data portability and objection. You may also lodge a complaint with a data protection supervisory authority.",
      },
    ],
  },
};
