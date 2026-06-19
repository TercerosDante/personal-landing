/**
 * Single source of ALL human-readable copy, in both locales.
 *
 * English is rendered into the HTML at build time; the Spanish object is
 * embedded once as JSON and swapped in place by `src/scripts/i18n.ts` when the
 * user toggles language. The `Content` interface guarantees `en` and `es` share
 * the same shape (array lengths must be kept in sync by hand).
 *
 * Non-translatable tokens (tech/brand names, proper nouns, icons, colors,
 * images, dates, percentages, URLs) stay in `src/data/*` and `src/data/site.ts`.
 */

export interface Content {
  common: { location: string };
  nav: {
    about: string;
    experience: string;
    projects: string;
    stack: string;
    education: string;
    contact: string;
    cv: string;
  };
  hero: {
    kicker: string;
    role: string;
    /** Rich (HTML) lead paragraph. */
    lead: string;
    coreStack: string;
    cv: string;
    /** Typewriter rotation. */
    tagline: string[];
  };
  exp: {
    eyebrow: string;
    title: string;
    sub: string;
    /** One per company in `src/data/experience.ts` (same order). */
    companies: {
      meta: string;
      when: string;
      roles: { client: string; desc: string }[];
    }[];
  };
  proj: {
    eyebrow: string;
    title: string;
    sub: string;
    view: string;
    /** One per group in `src/data/projects.ts` (same order); items match too. */
    groups: {
      label: string;
      note: string;
      items: {
        title: string;
        year: string;
        live?: string;
        alt?: string;
        desc: string;
      }[];
    }[];
  };
  stack: {
    eyebrow: string;
    title: string;
    sub: string;
    modules: string;
    technologies: string;
    layers: string;
    /** One per layer; `techs` notes align to the layer's tech order. */
    items: { name: string; note: string; techs: string[] }[];
  };
  edu: {
    eyebrow: string;
    title: string;
    languages: string;
    items: { title: string; inst: string }[];
    langs: { name: string; level: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    sub: string;
    name: string;
    email: string;
    message: string;
    namePh: string;
    emailPh: string;
    msgPh: string;
    send: string;
    note: string;
    /** Status shown while the mail client opens (set from client.ts). */
    opening: string;
  };
  footer: { copy: string; tech: string };
  boot: { loading: string };
  lightbox: { hint: string };
  colophon: { label: string; text: string; source: string };
}

const en: Content = {
  common: { location: 'Bolivia - Remote - UTC−4' },
  nav: {
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    stack: 'Stack',
    education: 'Education',
    contact: 'Contact',
    cv: 'CV ↓',
  },
  hero: {
    kicker: 'Full-Stack Engineer',
    role: 'Full-Stack Engineer',
    lead: 'Full-Stack Engineer with <b>6+ years</b> designing, building and operating <b>production-grade TypeScript</b> applications — React &amp; Next.js frontends, NestJS APIs, PostgreSQL and cloud infrastructure on AWS &amp; Linux VPS with Docker, Traefik and CI/CD. I ship scalable multi-tenant systems and business-critical integrations with Stripe, Shopee, Google Maps and AI-powered OCR.',
    coreStack: 'Core stack',
    cv: 'Download CV',
    tagline: [
      'TypeScript',
      'React - Next.js',
      'Node.js - NestJS',
      'PostgreSQL - Prisma',
      'AWS - Docker - CI/CD',
      'Multi-tenant SaaS',
      'Stripe - Google Maps',
    ],
  },
  exp: {
    eyebrow: '01 / Experience',
    title: 'Professional timeline.',
    sub: 'Most recent first — production work across remote teams and international clients.',
    companies: [
      {
        meta: 'Full-Stack Developer · Bolivia (Remote)',
        when: 'Feb 2024 – Present',
        roles: [
          {
            client: 'JP Client',
            desc: 'Mobile-first web platform for assisted-transport taxi matching. NestJS + TypeScript + PostgreSQL (Prisma) backend with a modular, event-driven structure and JWT auth (access/refresh) with RBAC. Idempotent Stripe payments layer with HMAC verification, scheduled background jobs, AWS (S3, SES, SNS) and Google Maps integrations. CI/CD on GitHub Actions, deployed on EC2 behind Traefik over HTTPS. Mobile-first client with React Native + Expo.',
          },
          {
            client: 'JP Client',
            desc: 'SaaS for Shopee seller management. REST API in NestJS 11 + Prisma 6 over PostgreSQL (58 models). Stripe subscriptions with signature-verified webhooks, Shopee integration (OAuth, product/order sync) and a resilient sync framework. Frontend in Next.js 15 + React 19 with MUI, TanStack Query and Zod.',
          },
          {
            client: 'JP Client',
            desc: 'Restaurant operations platform — full-stack work across backend APIs and frontend features.',
          },
          {
            client: 'JP Client',
            desc: 'Enterprise integration platform (iPaaS). Authored OpenAPI specifications to onboard services into an existing adapter-generation pipeline.',
          },
        ],
      },
      {
        meta: 'Full-Stack Developer · Bolivia (Remote / in-site)',
        when: '2020 – 2024',
        roles: [
          {
            client: 'BO Client',
            desc: 'Survey and evaluation platform. Backend services in Node.js (Fastify) with complex MongoDB queries over large datasets. Built a Python/FastAPI sentiment-analysis API serving a pre-trained BERT model, replaced the event emitter with a RabbitMQ messaging layer and designed a webhook delivery system. Containerized with Docker + Kubernetes (MicroK8s), CI/CD on GitLab. Frontend in React and Meteor.',
          },
          {
            client: 'US Client · Outsourcing',
            desc: 'Building data-tracking application. Built the React + TypeScript frontend (GraphQL, MUI, Redux) and contributed to the NestJS + Firestore backend implementation.',
          },
        ],
      },
    ],
  },
  proj: {
    eyebrow: '02 / Projects',
    title: "Things I've shipped.",
    sub: 'Products taken from architecture to delivery — side projects shipped solo, plus production builds co-developed with teams for international clients.',
    view: 'Live App',
    groups: [
      {
        label: 'Independent & Freelance',
        note: 'Self-shipped',
        items: [
          {
            title: 'Multi-Tenant ERP / POS for Restaurants',
            year: '2026 · Independent',
            live: 'In production',
            alt: 'Multi-Tenant ERP / POS for Restaurants — interface preview',
            desc: 'Multi-tenant architecture (AsyncLocalStorage TenantContext, tenantId isolation, JWT with tenant/location claims) with three auth layers. A modular "Lego" system activates core modules (POS, inventory, cash) and industry modules through a catalog and guards. DDD with unit-tested domain logic and event-driven cross-module communication. POS frontend (React 18, Vite, Ant Design, Zustand) runs on Android (Capacitor) and desktop (Electron) from one codebase. pnpm/Turborepo monorepo with shared Zod contracts, GitHub Actions, Docker + Traefik on a VPS.',
          },
          {
            title: 'Textile Manufacturing ERP',
            year: '2025 · Freelance · finished',
            live: 'In production',
            alt: 'Textile Manufacturing ERP — interface preview',
            desc: 'Textile manufacturing domain modeled in PostgreSQL/Prisma — products with variants, size groups, per-order garment matrices, state history and price tiers per client group. Integrated Google Gemini OCR for automatic garment-matrix extraction from images (~85% less order-entry time). NestJS API with 15+ domain modules. React frontend (Vite, Ant Design, TanStack Query, React Hook Form) with drag-and-drop order building (dnd-kit), Cloudinary uploads, WhatsApp share and Word/Excel export.',
          },
        ],
      },
      {
        label: 'Team & Client Work',
        note: 'Co-developed',
        items: [
          {
            title: 'TsunaGo — Assisted-Transport Taxi Platform',
            year: '2024 · Bolivian Devs',
            live: 'In production',
            alt: 'TsunaGo — interface preview',
            desc: 'Mobile-first platform that matches passengers with assisted-transport taxis — co-developed with the Bolivian Devs team for a Japanese client. Event-driven NestJS + TypeScript + PostgreSQL (Prisma) backend with JWT access/refresh + RBAC, an idempotent Stripe payments layer (HMAC-verified), scheduled background jobs and AWS (S3, SES, SNS) + Google Maps integrations. CI/CD on GitHub Actions, deployed on EC2 behind Traefik over HTTPS. Mobile-first client in React Native + Expo.',
          },
          {
            title: 'Makevi — Shopee Seller-Management SaaS',
            year: '2024 · Bolivian Devs',
            live: 'In production',
            desc: 'SaaS for Shopee seller management, co-developed with the Bolivian Devs team for a Japanese client. REST API in NestJS 11 + Prisma 6 over PostgreSQL (58 models), with Stripe subscriptions (signature-verified webhooks), a Shopee OAuth integration (product/order sync) and a resilient sync framework. Web app in Next.js 15 + React 19 with MUI, TanStack Query and Zod.',
          },
        ],
      },
    ],
  },
  stack: {
    eyebrow: '03 / Stack',
    title: 'The full stack, laid out.',
    sub: 'Production-grade tooling I reach for across the whole lifecycle — organised by layer.',
    modules: 'modules',
    technologies: 'technologies',
    layers: 'layers',
    items: [
      {
        name: 'Frontend',
        note: 'React 19 · Next.js 15 clients',
        techs: [
          'Client UIs across every product.',
          'App Router & SSR — Makevi web.',
          'Lightweight global state.',
          'TanStack — server-state caching.',
          'Material UI component system.',
          'POS & ERP UI kit.',
        ],
      },
      {
        name: 'Backend',
        note: 'Event-driven NestJS APIs',
        techs: [
          'End-to-end typing.',
          'NestJS & Fastify runtime.',
          'Modular APIs across products.',
          'Type-safe ORM — 58 models on Makevi.',
          'Primary integration surface.',
          'Smart Building & Joint specs.',
        ],
      },
      {
        name: 'Databases',
        note: 'Relational & document stores',
        techs: ['Primary store via Prisma.', 'Cosmic Latte datasets.'],
      },
      {
        name: 'DevOps & Tools',
        note: 'Containerized delivery & CI/CD',
        techs: [
          'Multi-stage images.',
          'EC2 · RDS · S3 · SES · SNS.',
          'Lint · test · build · deploy.',
          'Automated pipelines.',
          'Linux VPS hosting.',
          'HTTPS reverse proxy.',
          'MicroK8s on Cosmic Latte.',
          'Version control.',
          'Server operations.',
          'AI-assisted development.',
          'AI-assisted development.',
        ],
      },
    ],
  },
  edu: {
    eyebrow: '04 / Education',
    title: 'Training & languages.',
    languages: 'Languages',
    items: [
      {
        title: 'Research & Development Program',
        inst: 'Jala Foundation — software engineering training within a production project.',
      },
      {
        title: 'Commercial Software Development Training',
        inst: 'Jala Foundation — commercial development & engineering best practices.',
      },
      {
        title: 'Higher Technical Degree in Computer Systems',
        inst: 'CEFTE Institute, Bolivia — 3-year post-secondary technical program.',
      },
    ],
    langs: [
      { name: 'English', level: 'Professional' },
      { name: 'Spanish', level: 'Native' },
    ],
  },
  contact: {
    eyebrow: '05 / Contact',
    title: "Let's build something.",
    sub: 'Open to full-stack roles and freelance projects. Fastest reply via email or WhatsApp.',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    namePh: 'Your name',
    emailPh: 'you@company.com',
    msgPh: 'Tell me about the role or project…',
    send: 'Send message',
    note: 'Opens your email client · no data is stored',
    opening: 'Opening your email client…',
  },
  footer: {
    copy: '© 2026 Ronald Terceros — Full-Stack Engineer',
    tech: 'TypeScript · React · NestJS · PostgreSQL · AWS',
  },
  boot: { loading: 'Loading Portfolio' },
  lightbox: { hint: 'Esc · click outside · ✕ to close' },
  colophon: {
    label: 'Colophon',
    text: 'This very page — built with <b>Astro</b> &amp; <b>TypeScript</b>, a hand-rolled EN/ES i18n layer and <b>zero runtime dependencies</b>. Static, fast, open source.',
    source: 'View source',
  },
};

const es: Content = {
  common: { location: 'Bolivia - Remoto - UTC−4' },
  nav: {
    about: 'Sobre mí',
    experience: 'Experiencia',
    projects: 'Proyectos',
    stack: 'Stack',
    education: 'Educación',
    contact: 'Contacto',
    cv: 'CV ↓',
  },
  hero: {
    kicker: 'Ingeniero Full-Stack',
    role: 'Ingeniero Full-Stack',
    lead: 'Ingeniero Full-Stack con <b>6+ años</b> diseñando, construyendo y operando aplicaciones <b>TypeScript de nivel producción</b> — frontends en React &amp; Next.js, APIs en NestJS, PostgreSQL e infraestructura cloud en AWS &amp; VPS Linux con Docker, Traefik y CI/CD. Despliego sistemas multi-tenant escalables e integraciones críticas para el negocio con Stripe, Shopee, Google Maps y OCR con IA.',
    coreStack: 'Stack principal',
    cv: 'Descargar CV',
    tagline: [
      'TypeScript',
      'React - Next.js',
      'Node.js - NestJS',
      'PostgreSQL - Prisma',
      'AWS - Docker - CI/CD',
      'SaaS Multi-tenant',
      'Stripe - Google Maps',
    ],
  },
  exp: {
    eyebrow: '01 / Experiencia',
    title: 'Trayectoria profesional.',
    sub: 'Más reciente primero — trabajo en producción con equipos remotos y clientes internacionales.',
    companies: [
      {
        meta: 'Desarrollador Full-Stack · Bolivia (Remoto)',
        when: 'Feb 2024 – Presente',
        roles: [
          {
            client: 'Cliente JP',
            desc: 'Plataforma web mobile-first para emparejamiento de taxis de transporte asistido. Backend en NestJS + TypeScript + PostgreSQL (Prisma) con una estructura modular orientada a eventos y autenticación JWT (access/refresh) con RBAC. Capa de pagos idempotente con Stripe y verificación HMAC, tareas programadas en segundo plano, integraciones con AWS (S3, SES, SNS) y Google Maps. CI/CD en GitHub Actions, desplegado en EC2 tras Traefik sobre HTTPS. Cliente mobile-first con React Native + Expo.',
          },
          {
            client: 'Cliente JP',
            desc: 'SaaS para la gestión de vendedores de Shopee. API REST en NestJS 11 + Prisma 6 sobre PostgreSQL (58 modelos). Suscripciones de Stripe con webhooks verificados por firma, integración con Shopee (OAuth, sincronización de productos/pedidos) y un framework de sincronización resiliente. Frontend en Next.js 15 + React 19 con MUI, TanStack Query y Zod.',
          },
          {
            client: 'Cliente JP',
            desc: 'Plataforma de operaciones para restaurantes — trabajo full-stack en APIs de backend y funcionalidades de frontend.',
          },
          {
            client: 'Cliente JP',
            desc: 'Plataforma de integración empresarial (iPaaS). Redacté especificaciones OpenAPI para incorporar servicios a un pipeline existente de generación de adaptadores.',
          },
        ],
      },
      {
        meta: 'Desarrollador Full-Stack · Bolivia (Remoto / presencial)',
        when: '2020 – 2024',
        roles: [
          {
            client: 'Cliente BO',
            desc: 'Plataforma de encuestas y evaluación. Servicios de backend en Node.js (Fastify) con consultas complejas en MongoDB sobre grandes volúmenes de datos. Construí una API de análisis de sentimiento en Python/FastAPI sirviendo un modelo BERT preentrenado, reemplacé el event emitter por una capa de mensajería RabbitMQ y diseñé un sistema de entrega de webhooks. Contenerizado con Docker + Kubernetes (MicroK8s), CI/CD en GitLab. Frontend en React y Meteor.',
          },
          {
            client: 'Cliente US · Outsourcing',
            desc: 'Aplicación de seguimiento de datos de edificios. Desarrollé el frontend en React + TypeScript (GraphQL, MUI, Redux) y contribuí a la implementación del backend en NestJS + Firestore.',
          },
        ],
      },
    ],
  },
  proj: {
    eyebrow: '02 / Proyectos',
    title: 'Lo que he construido.',
    sub: 'Productos llevados de la arquitectura a la entrega — proyectos propios hechos en solitario, y desarrollos en producción co-creados con equipos para clientes internacionales.',
    view: 'App en vivo',
    groups: [
      {
        label: 'Independiente y Freelance',
        note: 'En solitario',
        items: [
          {
            title: 'ERP / POS Multi-Tenant para Restaurantes',
            year: '2026 · Independiente',
            live: 'En producción',
            alt: 'ERP / POS Multi-Tenant para Restaurantes — vista previa de la interfaz',
            desc: 'Arquitectura multi-tenant (TenantContext con AsyncLocalStorage, aislamiento por tenantId, JWT con claims de tenant/ubicación) con tres capas de autenticación. Un sistema modular tipo "Lego" activa módulos núcleo (POS, inventario, caja) y módulos por industria mediante un catálogo y guards. DDD con lógica de dominio probada unitariamente y comunicación entre módulos orientada a eventos. El frontend POS (React 18, Vite, Ant Design, Zustand) corre en Android (Capacitor) y escritorio (Electron) desde una sola base de código. Monorepo pnpm/Turborepo con contratos Zod compartidos, GitHub Actions, Docker + Traefik en un VPS.',
          },
          {
            title: 'ERP para Manufactura Textil',
            year: '2025 · Freelance · finalizado',
            live: 'En producción',
            alt: 'ERP para Manufactura Textil — vista previa de la interfaz',
            desc: 'Dominio de manufactura textil modelado en PostgreSQL/Prisma — productos con variantes, grupos de tallas, matrices de prendas por pedido, historial de estados y niveles de precio por grupo de cliente. Integré Google Gemini OCR para la extracción automática de matrices de prendas desde imágenes (~85% menos tiempo de captura de pedidos). API en NestJS con más de 15 módulos de dominio. Frontend en React (Vite, Ant Design, TanStack Query, React Hook Form) con construcción de pedidos por arrastrar y soltar (dnd-kit), subidas a Cloudinary, compartir por WhatsApp y exportación a Word/Excel.',
          },
        ],
      },
      {
        label: 'Trabajo en Equipo',
        note: 'Co-desarrollado',
        items: [
          {
            title: 'TsunaGo — Plataforma de Taxis de Transporte Asistido',
            year: '2024 · Bolivian Devs',
            live: 'En producción',
            alt: 'TsunaGo — vista previa de la interfaz',
            desc: 'Plataforma mobile-first que empareja pasajeros con taxis de transporte asistido — co-desarrollada con el equipo de Bolivian Devs para un cliente japonés. Backend orientado a eventos en NestJS + TypeScript + PostgreSQL (Prisma) con JWT access/refresh + RBAC, una capa de pagos idempotente con Stripe (verificada con HMAC), tareas programadas en segundo plano e integraciones con AWS (S3, SES, SNS) y Google Maps. CI/CD en GitHub Actions, desplegado en EC2 tras Traefik sobre HTTPS. Cliente mobile-first en React Native + Expo.',
          },
          {
            title: 'Makevi — SaaS de Gestión de Vendedores Shopee',
            year: '2024 · Bolivian Devs',
            live: 'En producción',
            desc: 'SaaS para la gestión de vendedores de Shopee, co-desarrollado con el equipo de Bolivian Devs para un cliente japonés. API REST en NestJS 11 + Prisma 6 sobre PostgreSQL (58 modelos), con suscripciones de Stripe (webhooks verificados por firma), integración con Shopee vía OAuth (sincronización de productos/pedidos) y un framework de sincronización resiliente. Web en Next.js 15 + React 19 con MUI, TanStack Query y Zod.',
          },
        ],
      },
    ],
  },
  stack: {
    eyebrow: '03 / Stack',
    title: 'El stack completo, desplegado.',
    sub: 'Herramientas de nivel producción que uso en todo el ciclo de vida — organizadas por capa.',
    modules: 'módulos',
    technologies: 'tecnologías',
    layers: 'capas',
    items: [
      {
        name: 'Frontend',
        note: 'Clientes React 19 · Next.js 15',
        techs: [
          'Interfaces de cliente en todos los productos.',
          'App Router y SSR — web de Makevi.',
          'Estado global ligero.',
          'TanStack — caché de estado del servidor.',
          'Sistema de componentes Material UI.',
          'Kit de UI para POS y ERP.',
        ],
      },
      {
        name: 'Backend',
        note: 'APIs NestJS orientadas a eventos',
        techs: [
          'Tipado de extremo a extremo.',
          'Runtime de NestJS y Fastify.',
          'APIs modulares en todos los productos.',
          'ORM con tipado seguro — 58 modelos en Makevi.',
          'Principal superficie de integración.',
          'Specs de Smart Building y Joint.',
        ],
      },
      {
        name: 'Bases de datos',
        note: 'Almacenes relacionales y documentales',
        techs: [
          'Almacén principal vía Prisma.',
          'Conjuntos de datos de Cosmic Latte.',
        ],
      },
      {
        name: 'DevOps y Herramientas',
        note: 'Entrega en contenedores y CI/CD',
        techs: [
          'Imágenes multi-etapa.',
          'EC2 · RDS · S3 · SES · SNS.',
          'Lint · test · build · deploy.',
          'Pipelines automatizados.',
          'Hosting en VPS Linux.',
          'Proxy inverso HTTPS.',
          'MicroK8s en Cosmic Latte.',
          'Control de versiones.',
          'Operación de servidores.',
          'Desarrollo asistido por IA.',
          'Desarrollo asistido por IA.',
        ],
      },
    ],
  },
  edu: {
    eyebrow: '04 / Educación',
    title: 'Formación e idiomas.',
    languages: 'Idiomas',
    items: [
      {
        title: 'Programa de Investigación y Desarrollo',
        inst: 'Jala Foundation — formación en ingeniería de software dentro de un proyecto en producción.',
      },
      {
        title: 'Formación en Desarrollo de Software Comercial',
        inst: 'Jala Foundation — desarrollo comercial y buenas prácticas de ingeniería.',
      },
      {
        title: 'Técnico Superior en Sistemas Informáticos',
        inst: 'Instituto CEFTE, Bolivia — programa técnico superior de 3 años.',
      },
    ],
    langs: [
      { name: 'Inglés', level: 'Profesional' },
      { name: 'Español', level: 'Nativo' },
    ],
  },
  contact: {
    eyebrow: '05 / Contacto',
    title: 'Construyamos algo.',
    sub: 'Disponible para roles full-stack y proyectos freelance. Respuesta más rápida por email o WhatsApp.',
    name: 'Nombre',
    email: 'Email',
    message: 'Mensaje',
    namePh: 'Tu nombre',
    emailPh: 'tú@empresa.com',
    msgPh: 'Cuéntame sobre el rol o el proyecto…',
    send: 'Enviar mensaje',
    note: 'Abre tu cliente de correo · no se guardan datos',
    opening: 'Abriendo tu cliente de correo…',
  },
  footer: {
    copy: '© 2026 Ronald Terceros — Ingeniero Full-Stack',
    tech: 'TypeScript · React · NestJS · PostgreSQL · AWS',
  },
  boot: { loading: 'Cargando Portafolio' },
  lightbox: { hint: 'Esc · clic fuera · ✕ para cerrar' },
  colophon: {
    label: 'Colofón',
    text: 'Esta misma página — hecha con <b>Astro</b> y <b>TypeScript</b>, una capa i18n EN/ES propia y <b>cero dependencias en runtime</b>. Estática, rápida, open source.',
    source: 'Ver código',
  },
};

export type Lang = 'en' | 'es';

export const content: Record<Lang, Content> = { en, es };

export const defaultLang: Lang = 'en';

/** The locale used for server-rendered HTML (what the swap restores "en" to). */
export const dict: Content = content[defaultLang];
