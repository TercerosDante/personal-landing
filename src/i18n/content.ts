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
    /** `<summary>` label for the expandable technical details. */
    techDetails: string;
    /** Link label for "I'll walk you through the private repo" (own projects). */
    walkthrough: string;
    /** Static label for client/NDA repos shown as private. */
    privateRepo: string;
    /** One per group in `src/data/projects.ts` (same order); items match too. */
    groups: {
      label: string;
      note: string;
      items: {
        title: string;
        year: string;
        live?: string;
        alt?: string;
        /** Plain-language product line (visible). */
        product: string;
        /** Technical deep-dive (collapsed in a <details>). */
        tech: string;
      }[];
    }[];
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
    /** Live form states (set from client.ts; mirrored in the API). */
    sending: string;
    success: string;
    errorGeneric: string;
    invalidName: string;
    invalidEmail: string;
    invalidMessage: string;
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
    education: 'Education',
    contact: 'Contact',
    cv: 'CV ↓',
  },
  hero: {
    kicker: 'Full-Stack Engineer',
    role: 'Full-Stack Engineer',
    lead: 'Full-Stack Engineer with <b>6+ years</b> building and maintaining web applications in TypeScript, React, Next.js, NestJS, PostgreSQL, Docker and AWS. I deliver end-to-end product features, integrate services like Stripe, Shopee, Google Maps and OCR, and run applications in <b>production</b>. I focus on clean architecture, maintainable code, automation, and solving real business problems with reliable software.',
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
    eyebrow: '02 / Experience',
    title: 'Professional timeline.',
    sub: 'Most recent first. Production work across remote teams and international clients.',
    companies: [
      {
        meta: 'Full-Stack Developer · Bolivia (Remote)',
        when: 'Feb 2024 – Present',
        roles: [
          {
            client: 'JP Client',
            desc: 'Built the NestJS, TypeScript and PostgreSQL backend with JWT authentication and role-based access for drivers, passengers and admins, plus a reliable Stripe payment flow with webhook handling, automated retries and transaction-consistency safeguards. Added background automation for the ride lifecycle, reminders and notifications, and integrated AWS and Google Maps. Set up CI/CD on GitHub Actions with Docker and Traefik on AWS, and built the React Native and Expo client.',
          },
          {
            client: 'JP Client',
            desc: 'Co-developed a multi-tenant SaaS in NestJS, TypeScript, PostgreSQL and Prisma, working on backend architecture, business logic, authentication and access control. Integrated Stripe subscriptions, Shopee marketplace sync and AWS for billing, e-commerce and customer communications. Built background workflows for data sync and billing automation, shipped a multi-stage Dockerfile to AWS ECR/ECS through GitHub Actions, and contributed frontend features in Next.js and React.',
          },
          {
            client: 'JP Client',
            desc: 'Restaurant operations platform. Full-stack work in NestJS, Prisma and React across backend APIs and frontend features.',
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
            desc: 'Built backend services and API endpoints in Node.js and MongoDB for survey processing and data analysis, plus a Python sentiment-analysis service running a pre-trained model on open-ended responses. Moved messaging to RabbitMQ for more reliable email and notification delivery, and added configurable webhooks for event-driven client updates. Set up Docker, Kubernetes and GitLab CI/CD across staging and production, added automated API integration tests, and built React and Meteor frontend features including real-time dashboards and survey management.',
          },
          {
            client: 'US Client · Outsourcing',
            desc: 'Built the React and TypeScript frontend (GraphQL, MUI, Redux) for a building data-tracking application, and contributed to the NestJS and Firestore backend.',
          },
        ],
      },
    ],
  },
  proj: {
    eyebrow: '01 / Projects',
    title: "Things I've shipped.",
    sub: 'Products taken from architecture to delivery. Side projects shipped solo, plus production builds co-developed with teams for international clients.',
    view: 'Live App',
    techDetails: 'Technical details',
    walkthrough: 'Walkthrough on request',
    privateRepo: 'Private repo',
    groups: [
      {
        label: 'Independent & Freelance',
        note: 'Self-shipped',
        items: [
          {
            title: 'Multi-Tenant ERP / POS for Restaurants',
            year: '2026 · Independent',
            live: 'In production',
            alt: 'Multi-Tenant ERP / POS for Restaurants, interface preview',
            product:
              "A point-of-sale and back-office platform that runs a restaurant's registers, inventory and cash from one app, on Android tablets and desktop.",
            tech: 'Multi-tenant backend with tenant isolation, row-level security, JWT auth and role-based access across multiple business locations. A modular system lets each business turn on the capabilities it needs (point of sale, inventory, cash, recipes, kitchen workflows) from one shared platform, with domain-driven design keeping the business logic maintainable as modules grow. The cross-platform POS runs on desktop and touch devices from a single React codebase (Vite, Ant Design, Zustand, Capacitor, Electron). pnpm and Turborepo monorepo with shared Zod contracts, GitHub Actions CI/CD, and Docker and Traefik on a VPS. AI-assisted development was used under direct supervision to speed up delivery.',
          },
          {
            title: 'Textile Manufacturing ERP',
            year: '2025 · Freelance · finished',
            live: 'In production',
            alt: 'Textile Manufacturing ERP, interface preview',
            product:
              'An ERP for a textile manufacturer that brings orders, garment matrices, variants and per-client pricing into one system. Google Gemini OCR reads garment matrices straight from photos, cutting order-entry time by about 85%.',
            tech: 'Backend in NestJS, TypeScript, PostgreSQL and Prisma, with secure authentication, role-based access control and workflows across the textile domain: products, variants, production attributes, pricing structures and order states. The React frontend (Vite, Ant Design, TanStack Query, React Hook Form) streamlines order management, image handling, client communication and document generation, with drag-and-drop order building (dnd-kit), Cloudinary uploads and Word/Excel export. Delivered from architecture and implementation through deployment and client adoption.',
          },
        ],
      },
      {
        label: 'Team & Client Work',
        note: 'Co-developed',
        items: [
          {
            title: 'TsunaGo',
            year: '2024 · Bolivian Devs',
            live: 'In production',
            alt: 'TsunaGo, interface preview',
            product:
              'A mobile-first platform that matches passengers with assisted-transport taxis, co-developed for a Japanese client.',
            tech: 'NestJS, TypeScript and PostgreSQL (Prisma) backend with JWT authentication and role-based access for drivers, passengers and admins. Reliable Stripe payment processing with webhook handling, automated retries and transaction-consistency safeguards. Background automation for the ride lifecycle, reminders and notifications, plus AWS (S3, SES, SNS) and Google Maps integrations. CI/CD on GitHub Actions with Docker and Traefik on AWS. React Native and Expo client with role-based experiences and payment flows.',
          },
          {
            title: 'Makevi',
            year: '2024 · Bolivian Devs',
            live: 'In production',
            product:
              'A SaaS that helps Shopee sellers run their stores end-to-end, from products and orders to subscriptions, co-developed for a Japanese client.',
            tech: 'Multi-tenant SaaS in NestJS, TypeScript, PostgreSQL and Prisma. Stripe subscriptions, Shopee marketplace synchronization and AWS for billing, e-commerce and customer communications. Background workflows for data synchronization and billing automation, with input validation, structured logging, API documentation, health monitoring and automated testing. Multi-stage Dockerfile shipped to AWS ECR/ECS through GitHub Actions. Frontend features in Next.js and React.',
          },
        ],
      },
    ],
  },
  edu: {
    eyebrow: '03 / Education',
    title: 'Training & languages.',
    languages: 'Languages',
    items: [
      {
        title: 'Research & Development Program',
        inst: 'Jala Foundation. Intensive software engineering training with hands-on development in a production project.',
      },
      {
        title: 'Commercial Software Development Training',
        inst: 'Jala Foundation. Intensive training in commercial software development and engineering best practices.',
      },
      {
        title: 'Higher Technical Degree in Computer Systems',
        inst: 'CEFTE Institute, Bolivia. A 3-year post-secondary technical program.',
      },
    ],
    langs: [
      { name: 'English', level: 'Professional' },
      { name: 'Spanish', level: 'Native' },
    ],
  },
  contact: {
    eyebrow: '04 / Contact',
    title: "Let's build something.",
    sub: 'Open to full-stack roles and freelance projects. Fastest reply via email or WhatsApp.',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    namePh: 'Your name',
    emailPh: 'you@company.com',
    msgPh: 'Tell me about the role or project…',
    send: 'Send message',
    note: 'Sends straight to my inbox · I usually reply within a day.',
    sending: 'Sending your message…',
    success: "Thanks, your message is on its way. I'll reply soon.",
    errorGeneric:
      'Something went wrong sending your message. Please try again or email me directly.',
    invalidName: 'Please enter your name (at least 2 characters).',
    invalidEmail: 'Please enter a valid email address.',
    invalidMessage: 'Please add a short message (at least 10 characters).',
  },
  footer: {
    copy: '© 2026 Ronald Terceros · Full-Stack Engineer',
    tech: 'TypeScript · React · NestJS · PostgreSQL · AWS',
  },
  boot: { loading: 'Loading Portfolio' },
  lightbox: { hint: 'Esc · click outside · ✕ to close' },
  colophon: {
    label: 'Colophon',
    text: 'This very page is built with <b>Astro</b> and <b>TypeScript</b>, a hand-rolled EN/ES i18n layer and a <b>zero-dependency client bundle</b>. Static pages, one serverless endpoint, open source.',
    source: 'View source',
  },
};

const es: Content = {
  common: { location: 'Bolivia - Remoto - UTC−4' },
  nav: {
    about: 'Sobre mí',
    experience: 'Experiencia',
    projects: 'Proyectos',
    education: 'Educación',
    contact: 'Contacto',
    cv: 'CV ↓',
  },
  hero: {
    kicker: 'Ingeniero Full-Stack',
    role: 'Ingeniero Full-Stack',
    lead: 'Ingeniero Full-Stack con <b>6+ años</b> construyendo y manteniendo aplicaciones web en TypeScript, React, Next.js, NestJS, PostgreSQL, Docker y AWS. Desarrollo APIs, integraciones y funcionalidades full-stack, integro servicios como Stripe, Shopee, Google Maps y OCR, y opero aplicaciones en <b>producción</b>. Me enfoco en arquitectura limpia, código mantenible, automatización y en resolver problemas reales de negocio con software confiable.',
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
    eyebrow: '02 / Experiencia',
    title: 'Trayectoria profesional.',
    sub: 'Más reciente primero. Trabajo en producción con equipos remotos y clientes internacionales.',
    companies: [
      {
        meta: 'Desarrollador Full-Stack · Bolivia (Remoto)',
        when: 'Feb 2024 – Presente',
        roles: [
          {
            client: 'Cliente JP',
            desc: 'Construí el backend en NestJS, TypeScript y PostgreSQL con autenticación JWT y acceso por roles para conductores, pasajeros y administradores, además de un flujo de pagos confiable con Stripe (manejo de webhooks, reintentos automáticos y resguardos de consistencia transaccional). Agregué automatización en segundo plano para el ciclo de vida del viaje, recordatorios y notificaciones, e integré AWS y Google Maps. Monté el CI/CD en GitHub Actions con Docker y Traefik en AWS, y construí el cliente en React Native y Expo.',
          },
          {
            client: 'Cliente JP',
            desc: 'Co-desarrollé un SaaS multi-tenant en NestJS, TypeScript, PostgreSQL y Prisma, trabajando en la arquitectura del backend, la lógica de negocio, la autenticación y el control de acceso. Integré suscripciones de Stripe, sincronización con el marketplace de Shopee y AWS para facturación, e-commerce y comunicaciones con clientes. Construí flujos en segundo plano para sincronización de datos y automatización de facturación, publiqué un Dockerfile multi-etapa a AWS ECR/ECS con GitHub Actions, y aporté funcionalidades de frontend en Next.js y React.',
          },
          {
            client: 'Cliente JP',
            desc: 'Plataforma de operaciones para restaurantes. Trabajo full-stack en NestJS, Prisma y React, en APIs de backend y funcionalidades de frontend.',
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
            desc: 'Construí servicios de backend y endpoints de API en Node.js y MongoDB para el procesamiento de encuestas y el análisis de datos, más un servicio de análisis de sentimiento en Python que corría un modelo preentrenado sobre respuestas abiertas. Moví la mensajería a RabbitMQ para una entrega más confiable de correos y notificaciones, y agregué webhooks configurables para actualizaciones orientadas a eventos. Monté Docker, Kubernetes y CI/CD en GitLab entre staging y producción, agregué pruebas automatizadas de integración de API, y construí funcionalidades de frontend en React y Meteor, incluyendo dashboards en tiempo real y gestión de encuestas.',
          },
          {
            client: 'Cliente US · Outsourcing',
            desc: 'Construí el frontend en React y TypeScript (GraphQL, MUI, Redux) para una aplicación de seguimiento de datos de edificios, y contribuí al backend en NestJS y Firestore.',
          },
        ],
      },
    ],
  },
  proj: {
    eyebrow: '01 / Proyectos',
    title: 'Lo que he construido.',
    sub: 'Productos llevados de la arquitectura a la entrega. Proyectos propios hechos en solitario, y desarrollos en producción co-creados con equipos para clientes internacionales.',
    view: 'App en vivo',
    techDetails: 'Detalles técnicos',
    walkthrough: 'Te lo muestro al contactar',
    privateRepo: 'Repo privado',
    groups: [
      {
        label: 'Independiente y Freelance',
        note: 'En solitario',
        items: [
          {
            title: 'ERP / POS Multi-Tenant para Restaurantes',
            year: '2026 · Independiente',
            live: 'En producción',
            alt: 'ERP / POS Multi-Tenant para Restaurantes, vista previa de la interfaz',
            product:
              'Plataforma de punto de venta y back-office que maneja ventas, inventario y caja de un restaurante desde una sola app, en tablets Android y escritorio.',
            tech: 'Backend multi-tenant con aislamiento por tenant, seguridad a nivel de fila (RLS), autenticación JWT y acceso por roles en varias ubicaciones de negocio. Un sistema modular permite a cada negocio activar las capacidades que necesita (punto de venta, inventario, caja, recetas, flujos de cocina) desde una sola plataforma compartida, con diseño orientado al dominio que mantiene la lógica de negocio mantenible a medida que crecen los módulos. El POS multiplataforma corre en escritorio y dispositivos táctiles desde una sola base de código React (Vite, Ant Design, Zustand, Capacitor, Electron). Monorepo pnpm y Turborepo con contratos Zod compartidos, CI/CD en GitHub Actions, y Docker y Traefik en un VPS. Usé desarrollo asistido por IA bajo supervisión directa para acelerar la entrega.',
          },
          {
            title: 'ERP para Manufactura Textil',
            year: '2025 · Freelance · finalizado',
            live: 'En producción',
            alt: 'ERP para Manufactura Textil, vista previa de la interfaz',
            product:
              'Un ERP para una fábrica textil que reúne pedidos, matrices de prendas, variantes y precios por grupo de cliente en un solo sistema. Google Gemini OCR lee las matrices directo de fotos, reduciendo cerca de 85% el tiempo de captura de pedidos.',
            tech: 'Backend en NestJS, TypeScript, PostgreSQL y Prisma, con autenticación segura, control de acceso por roles y flujos en todo el dominio textil: productos, variantes, atributos de producción, estructuras de precio y estados de pedido. El frontend en React (Vite, Ant Design, TanStack Query, React Hook Form) agiliza la gestión de pedidos, el manejo de imágenes, la comunicación con el cliente y la generación de documentos, con construcción de pedidos por arrastrar y soltar (dnd-kit), subidas a Cloudinary y exportación a Word/Excel. Entregado desde la arquitectura e implementación hasta el despliegue y la adopción del cliente.',
          },
        ],
      },
      {
        label: 'Trabajo en Equipo',
        note: 'Co-desarrollado',
        items: [
          {
            title: 'TsunaGo',
            year: '2024 · Bolivian Devs',
            live: 'En producción',
            alt: 'TsunaGo, vista previa de la interfaz',
            product:
              'Plataforma mobile-first que empareja pasajeros con taxis de transporte asistido, co-desarrollada para un cliente japonés.',
            tech: 'Backend en NestJS, TypeScript y PostgreSQL (Prisma) con autenticación JWT y acceso por roles para conductores, pasajeros y administradores. Procesamiento de pagos confiable con Stripe (manejo de webhooks, reintentos automáticos y resguardos de consistencia transaccional). Automatización en segundo plano para el ciclo de vida del viaje, recordatorios y notificaciones, más integraciones con AWS (S3, SES, SNS) y Google Maps. CI/CD en GitHub Actions con Docker y Traefik en AWS. Cliente en React Native y Expo con experiencias por rol y flujos de pago.',
          },
          {
            title: 'Makevi',
            year: '2024 · Bolivian Devs',
            live: 'En producción',
            product:
              'Un SaaS que ayuda a vendedores de Shopee a gestionar sus tiendas de punta a punta, desde productos y pedidos hasta suscripciones, co-desarrollado para un cliente japonés.',
            tech: 'SaaS multi-tenant en NestJS, TypeScript, PostgreSQL y Prisma. Suscripciones de Stripe, sincronización con el marketplace de Shopee y AWS para facturación, e-commerce y comunicaciones con clientes. Flujos en segundo plano para sincronización de datos y automatización de facturación, con validación de entradas, logging estructurado, documentación de API, monitoreo de salud y pruebas automatizadas. Dockerfile multi-etapa publicado a AWS ECR/ECS con GitHub Actions. Funcionalidades de frontend en Next.js y React.',
          },
        ],
      },
    ],
  },
  edu: {
    eyebrow: '03 / Educación',
    title: 'Formación e idiomas.',
    languages: 'Idiomas',
    items: [
      {
        title: 'Programa de Investigación y Desarrollo',
        inst: 'Jala Foundation. Formación intensiva en ingeniería de software con desarrollo práctico en un proyecto en producción.',
      },
      {
        title: 'Formación en Desarrollo de Software Comercial',
        inst: 'Jala Foundation. Formación intensiva en desarrollo de software comercial y buenas prácticas de ingeniería.',
      },
      {
        title: 'Técnico Superior en Sistemas Informáticos',
        inst: 'Instituto CEFTE, Bolivia. Programa técnico superior de 3 años.',
      },
    ],
    langs: [
      { name: 'Inglés', level: 'Profesional' },
      { name: 'Español', level: 'Nativo' },
    ],
  },
  contact: {
    eyebrow: '04 / Contacto',
    title: 'Construyamos algo.',
    sub: 'Disponible para roles full-stack y proyectos freelance. Respuesta más rápida por email o WhatsApp.',
    name: 'Nombre',
    email: 'Email',
    message: 'Mensaje',
    namePh: 'Tu nombre',
    emailPh: 'tú@empresa.com',
    msgPh: 'Cuéntame sobre el rol o el proyecto…',
    send: 'Enviar mensaje',
    note: 'Llega directo a mi bandeja · suelo responder en un día.',
    sending: 'Enviando tu mensaje…',
    success: 'Gracias, tu mensaje está en camino. Te responderé pronto.',
    errorGeneric:
      'Algo salió mal al enviar tu mensaje. Inténtalo de nuevo o escríbeme directamente.',
    invalidName: 'Ingresa tu nombre (al menos 2 caracteres).',
    invalidEmail: 'Ingresa un correo electrónico válido.',
    invalidMessage: 'Escribe un mensaje breve (al menos 10 caracteres).',
  },
  footer: {
    copy: '© 2026 Ronald Terceros · Ingeniero Full-Stack',
    tech: 'TypeScript · React · NestJS · PostgreSQL · AWS',
  },
  boot: { loading: 'Cargando Portafolio' },
  lightbox: { hint: 'Esc · clic fuera · ✕ para cerrar' },
  colophon: {
    label: 'Colofón',
    text: 'Esta misma página está hecha con <b>Astro</b> y <b>TypeScript</b>, una capa i18n EN/ES propia y un <b>bundle de cliente sin dependencias</b>. Páginas estáticas, un endpoint serverless, open source.',
    source: 'Ver código',
  },
};

export type Lang = 'en' | 'es';

export const content: Record<Lang, Content> = { en, es };

export const defaultLang: Lang = 'en';

/** The locale used for server-rendered HTML (what the swap restores "en" to). */
export const dict: Content = content[defaultLang];
