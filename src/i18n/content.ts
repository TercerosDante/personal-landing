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
    aiDev: string;
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
      roles: { client: string; bullets: string[] }[];
    }[];
  };
  proj: {
    eyebrow: string;
    title: string;
    sub: string;
    view: string;
    /** `<summary>` label for the expandable technical details. */
    techDetails: string;
    /** Repo label. Own/freelance repos link to contact; client repos are static. */
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
        /** Plain-language product description, one entry per paragraph (visible). */
        product: string[];
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
  aiDev: {
    eyebrow: string;
    title: string;
    /** Lead paragraph (rendered as the section sub). */
    lead: string;
    /** Flowing body paragraphs. */
    body: string[];
    /** Accountability statement, pulled out as a callout. */
    accountable: string;
    /** Closing line. */
    close: string;
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
    errorNetwork: string;
    errorVerification: string;
    errorTooLong: string;
    errorInvalid: string;
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
    aiDev: 'AI & Dev',
    contact: 'Contact',
    cv: 'CV ↓',
  },
  hero: {
    kicker: 'Full-Stack Engineer',
    role: 'Full-Stack Engineer',
    lead: "I build modern web applications from <b>concept to production</b>. With <b>6+ years</b> of experience working with TypeScript, React/Next.js, NestJS, and PostgreSQL, I deliver reliable products across the full development lifecycle, from architecture and implementation to deployment and maintenance. I've integrated services such as Stripe, Shopee, Google Maps, and OCR solutions while leading backend architecture and technical decisions across multiple projects.",
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
            bullets: [
              'Led delivery and owned backend architecture across auth, payments and the ride lifecycle.',
              'Built the NestJS and PostgreSQL backend with JWT auth and role-based access for drivers, passengers and admins.',
              'Shipped a reliable Stripe flow with webhooks, automated retries and transaction-consistency safeguards.',
              'Automated the ride lifecycle and notifications, and integrated AWS and Google Maps.',
              'Set up GitHub Actions CI/CD with Docker and Traefik on AWS, and built the React Native and Expo client.',
            ],
          },
          {
            client: 'JP Client',
            bullets: [
              'Co-developed a multi-tenant SaaS in NestJS, PostgreSQL and Prisma: backend architecture, business logic, auth and access control.',
              'Hardened Stripe subscriptions and Shopee marketplace sync, resolving edge cases in background workflows for reliable billing and e-commerce.',
              'Built reusable UI and user-facing features on the Next.js and React frontend.',
            ],
          },
          {
            client: 'JP Client',
            bullets: [
              'Full-stack work across backend APIs and frontend features for a restaurant operations platform.',
            ],
          },
          {
            client: 'JP Client',
            bullets: [
              'Authored OpenAPI specifications to onboard services into an existing adapter-generation pipeline.',
            ],
          },
        ],
      },
      {
        meta: 'Full-Stack Developer · Bolivia (Remote / in-site)',
        when: '2020 – 2024',
        roles: [
          {
            client: 'BO Client',
            bullets: [
              'Built Node.js and MongoDB backend services and APIs for survey processing and data analysis.',
              'Built a Python sentiment-analysis service running a pre-trained model on open-ended responses.',
              'Moved messaging to RabbitMQ for reliable email and notification delivery, and added configurable webhooks for event-driven updates.',
              'Ran Docker, Kubernetes and GitLab CI/CD across staging and production, with automated API integration tests.',
              'Built React and Meteor frontend features: real-time dashboards, data visualizations and survey management.',
              'Mentored developers through regular code reviews.',
            ],
          },
          {
            client: 'US Client · Outsourcing',
            bullets: [
              'Built the React and TypeScript frontend (GraphQL, MUI, Redux) for a building data-tracking app.',
              'Contributed to the NestJS and Firestore backend.',
            ],
          },
        ],
      },
    ],
  },
  proj: {
    eyebrow: '01 / Projects',
    title: 'Featured projects.',
    sub: 'Side projects I shipped solo, and products co-developed with teams for international clients, all running in production.',
    view: 'Live App',
    techDetails: 'Technical details',
    privateRepo: 'Private repo',
    groups: [
      {
        label: 'Independent & Freelance',
        note: 'Self-shipped',
        items: [
          {
            title: 'Multi-Tenant ERP / POS for Restaurants',
            year: '2026 · Freelance',
            live: 'In production',
            alt: 'Multi-Tenant ERP / POS for Restaurants, interface preview',
            product: [
              'An ERP and POS for restaurants and small businesses that brings the whole day into one place, from setting up your products to charging the customer and closing the register at night.',
              'Instead of typing in your menu item by item, you snap a photo from your phone and the system reads it for you to review, or start from a ready-made catalog and adjust it to fit. From there it takes shape like building blocks: switch on only what you need, keep each location on its own, and give every person the right access.',
              'It adapts to how you work: organize your catalog, take orders, watch the register, and check built-in reports at a glance.',
            ],
            tech: 'Multi-tenant backend with tenant isolation, row-level security, JWT auth and role-based access across multiple business locations. A modular system lets each business turn on the capabilities it needs (point of sale, inventory, cash, recipes, kitchen workflows) from one shared platform, with domain-driven design keeping the business logic maintainable as modules grow. The cross-platform POS runs on desktop and touch devices from a single React codebase (Vite, Ant Design, Zustand, Capacitor, Electron). pnpm and Turborepo monorepo with shared Zod contracts, GitHub Actions CI/CD, and Docker and Traefik on a VPS. AI-assisted development was used under direct supervision to speed up delivery.',
          },
          {
            title: 'Textile Manufacturing ERP',
            year: '2025 · Freelance',
            live: 'In production',
            alt: 'Textile Manufacturing ERP, interface preview',
            product: [
              'An ERP for a textile manufacturer that brings the whole order workflow into one place, from the first photo of a garment to the finished order.',
              'Instead of typing every detail, you photograph the garment matrix and the system reads it for you, filling in the data for you to review. Photos are stored in the cloud, and orders appear as a scrollable gallery, like a photo album, so any one is easy to find among hundreds.',
              'It adapts to the workshop: define your own size groups, follow each order through its stages (moving several at once in batches), and check built-in reports to see how the business is doing.',
            ],
            tech: 'Backend in NestJS, TypeScript, PostgreSQL and Prisma, with secure authentication, role-based access control and workflows across the textile domain: products, variants, production attributes, pricing structures and order states. The React frontend (Vite, Ant Design, TanStack Query, React Hook Form) streamlines order management, image handling, client communication and document generation, with drag-and-drop order building (dnd-kit), Cloudinary uploads and Word/Excel export. Delivered from architecture and implementation through deployment and client adoption.',
          },
        ],
      },
      {
        label: 'Team & Client Work',
        note: 'Co-developed',
        items: [
          {
            title: 'TsunaGo · Assisted-transport taxi matching',
            year: '2024 · Bolivian Devs',
            live: 'In production',
            alt: 'TsunaGo, interface preview',
            product: [
              'An app that connects people who need assisted transport (patients, older adults, and their companions) with available drivers nearby. You request a ride, choose the type of care needed, get matched with a driver, and pay in the app.',
              "The matching is based on care needs, not just location: you specify what's required and the app pairs you with a driver who fits. You can review the trip details and complete payment in the same flow.",
              'It also supports booking in advance, viewing past trips, rating drivers, and managing your account. Drivers can register, set their schedule, and track their earnings.',
            ],
            tech: 'NestJS, TypeScript and PostgreSQL (Prisma) backend with JWT authentication and role-based access for drivers, passengers and admins. Reliable Stripe payment processing with webhook handling, automated retries and transaction-consistency safeguards. Background automation for the ride lifecycle, reminders and notifications, plus AWS (S3, SES, SNS) and Google Maps integrations. CI/CD on GitHub Actions with Docker and Traefik on AWS. React Native and Expo client with role-based experiences and payment flows.',
          },
          {
            title: 'Makevi · Shopee seller management',
            year: '2024 · Bolivian Devs',
            live: 'In production',
            alt: 'Makevi, interface preview',
            product: [
              'Makevi is an all-in-one platform designed to simplify the day-to-day management of Shopee stores. It centralizes product listings, inventory, order processing, and sales analytics into a single system, reducing manual work and providing a more efficient, organized workflow for marketplace operations.',
            ],
            tech: 'Multi-tenant SaaS in NestJS, TypeScript, PostgreSQL and Prisma. Stripe subscriptions, Shopee marketplace synchronization and AWS for billing, e-commerce and customer communications. Background workflows for data synchronization and billing automation, with input validation, structured logging, API documentation, health monitoring and automated testing. Multi-stage Dockerfile shipped to AWS ECR/ECS through GitHub Actions. Frontend features in Next.js and React.',
          },
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
      { name: 'English', level: 'Upper-intermediate' },
      { name: 'Spanish', level: 'Native' },
    ],
  },
  aiDev: {
    eyebrow: '03 / AI & Dev',
    title: 'AI as a productivity multiplier.',
    lead: 'I use AI across the entire software development lifecycle to boost productivity and cut down on repetitive work.',
    body: [
      'It supports me with implementation, testing, documentation, debugging, code analysis, and technical research.',
      "By offloading routine tasks, I can focus on what really matters: architecture, scalability, product requirements, and solving complex engineering problems. AI helps me move faster, but it doesn't replace engineering judgment.",
    ],
    accountable:
      'I stay fully accountable for every line of code that reaches production. Every AI-assisted contribution is reviewed, validated, and adapted to meet my standards for quality, security, and maintainability.',
    close:
      "For me, the real value of AI isn't automation. It's the freedom to spend more energy on the problems that create the greatest impact.",
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
    note: 'Sends straight to my inbox · I usually reply within a day.',
    sending: 'Sending your message…',
    success: "Thanks, your message is on its way. I'll reply soon.",
    errorGeneric:
      'Something went wrong sending your message. Please try again or email me directly.',
    errorNetwork:
      "Couldn't reach the server. Check your connection and try again.",
    errorVerification:
      "Couldn't confirm you're human. Please try the check again.",
    errorTooLong: 'Your message is a little too long. Shorten it and resend.',
    errorInvalid: 'Some details look off. Check the fields and try again.',
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
    aiDev: 'IA & Dev',
    contact: 'Contacto',
    cv: 'CV ↓',
  },
  hero: {
    kicker: 'Ingeniero Full-Stack',
    role: 'Ingeniero Full-Stack',
    lead: 'Construyo aplicaciones web modernas <b>desde el concepto hasta la producción</b>. Con <b>más de 6 años</b> de experiencia trabajando con TypeScript, React/Next.js, NestJS y PostgreSQL, entrego productos confiables en todo el ciclo de desarrollo, desde la arquitectura y la implementación hasta el despliegue y el mantenimiento. He integrado servicios como Stripe, Shopee, Google Maps y soluciones de OCR, liderando la arquitectura de backend y las decisiones técnicas en múltiples proyectos.',
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
            bullets: [
              'Lideré la entrega y fui responsable de la arquitectura de backend en autenticación, pagos y ciclo de vida del viaje.',
              'Construí el backend en NestJS y PostgreSQL con autenticación JWT y acceso por roles para conductores, pasajeros y administradores.',
              'Entregué un flujo de pagos confiable con Stripe: webhooks, reintentos automáticos y resguardos de consistencia transaccional.',
              'Automaticé el ciclo de vida del viaje y las notificaciones, e integré AWS y Google Maps.',
              'Monté CI/CD en GitHub Actions con Docker y Traefik en AWS, y construí el cliente en React Native y Expo.',
            ],
          },
          {
            client: 'Cliente JP',
            bullets: [
              'Co-desarrollé un SaaS multi-tenant en NestJS, PostgreSQL y Prisma: arquitectura de backend, lógica de negocio, autenticación y control de acceso.',
              'Endurecí las suscripciones de Stripe y la sincronización con el marketplace de Shopee, resolviendo casos límite en flujos en segundo plano para una facturación y un e-commerce confiables.',
              'Construí UI reutilizable y funcionalidades de cara al usuario en el frontend de Next.js y React.',
            ],
          },
          {
            client: 'Cliente JP',
            bullets: [
              'Trabajo full-stack en APIs de backend y funcionalidades de frontend para una plataforma de operaciones de restaurantes.',
            ],
          },
          {
            client: 'Cliente JP',
            bullets: [
              'Redacté especificaciones OpenAPI para incorporar servicios a un pipeline existente de generación de adaptadores.',
            ],
          },
        ],
      },
      {
        meta: 'Desarrollador Full-Stack · Bolivia (Remoto / presencial)',
        when: '2020 – 2024',
        roles: [
          {
            client: 'Cliente BO',
            bullets: [
              'Construí servicios de backend y APIs en Node.js y MongoDB para el procesamiento de encuestas y el análisis de datos.',
              'Construí un servicio de análisis de sentimiento en Python que corría un modelo preentrenado sobre respuestas abiertas.',
              'Moví la mensajería a RabbitMQ para una entrega confiable de correos y notificaciones, y agregué webhooks configurables para actualizaciones orientadas a eventos.',
              'Operé Docker, Kubernetes y CI/CD en GitLab entre staging y producción, con pruebas automatizadas de integración de API.',
              'Construí funcionalidades de frontend en React y Meteor: dashboards en tiempo real, visualizaciones de datos y gestión de encuestas.',
              'Mentoreé a desarrolladores mediante revisiones de código.',
            ],
          },
          {
            client: 'Cliente US · Outsourcing',
            bullets: [
              'Construí el frontend en React y TypeScript (GraphQL, MUI, Redux) para una aplicación de seguimiento de datos de edificios.',
              'Contribuí al backend en NestJS y Firestore.',
            ],
          },
        ],
      },
    ],
  },
  proj: {
    eyebrow: '01 / Proyectos',
    title: 'Proyectos destacados.',
    sub: 'Proyectos personales que desarrollé solo, y productos co-desarrollados con equipos para clientes internacionales, todos en producción.',
    view: 'App en vivo',
    techDetails: 'Detalles técnicos',
    privateRepo: 'Repo privado',
    groups: [
      {
        label: 'Independiente y Freelance',
        note: 'En solitario',
        items: [
          {
            title: 'ERP / POS Multi-Tenant para Restaurantes',
            year: '2026 · Freelance',
            live: 'En producción',
            alt: 'ERP / POS Multi-Tenant para Restaurantes, vista previa de la interfaz',
            product: [
              'Un ERP y POS para restaurantes y pequeños negocios que reúne todo el día en un solo lugar, desde configurar tus productos hasta cobrar al cliente y cerrar la caja por la noche.',
              'En lugar de cargar tu menú producto por producto, tomas una foto desde tu teléfono y el sistema lo lee para que lo revises, o empiezas desde un catálogo listo y lo ajustas a tu medida. A partir de ahí se arma como bloques: activa solo lo que necesitas, mantén cada sucursal por separado y da a cada persona el acceso correcto.',
              'Se adapta a cómo trabajas: organiza tu catálogo, toma pedidos, vigila la caja y consulta los reportes integrados de un vistazo.',
            ],
            tech: 'Backend multi-tenant con aislamiento por tenant, seguridad a nivel de fila (RLS), autenticación JWT y acceso por roles en varias ubicaciones de negocio. Un sistema modular permite a cada negocio activar las capacidades que necesita (punto de venta, inventario, caja, recetas, flujos de cocina) desde una sola plataforma compartida, con diseño orientado al dominio que mantiene la lógica de negocio mantenible a medida que crecen los módulos. El POS multiplataforma corre en escritorio y dispositivos táctiles desde una sola base de código React (Vite, Ant Design, Zustand, Capacitor, Electron). Monorepo pnpm y Turborepo con contratos Zod compartidos, CI/CD en GitHub Actions, y Docker y Traefik en un VPS. Usé desarrollo asistido por IA bajo supervisión directa para acelerar la entrega.',
          },
          {
            title: 'ERP para Manufactura Textil',
            year: '2025 · Freelance',
            live: 'En producción',
            alt: 'ERP para Manufactura Textil, vista previa de la interfaz',
            product: [
              'Un ERP para un fabricante textil que reúne todo el flujo de pedidos en un solo lugar, desde la primera foto de una prenda hasta el pedido terminado.',
              'En lugar de escribir cada detalle, fotografías la matriz de la prenda y el sistema la lee por ti, completando los datos para que los revises. Las fotos se guardan en la nube y los pedidos aparecen como una galería desplazable, como un álbum de fotos, para que cualquiera sea fácil de encontrar entre cientos.',
              'Se adapta al taller: define tus propios grupos de tallas, sigue cada pedido por sus etapas (moviendo varios a la vez en lotes) y consulta los reportes integrados para ver cómo va el negocio.',
            ],
            tech: 'Backend en NestJS, TypeScript, PostgreSQL y Prisma, con autenticación segura, control de acceso por roles y flujos en todo el dominio textil: productos, variantes, atributos de producción, estructuras de precio y estados de pedido. El frontend en React (Vite, Ant Design, TanStack Query, React Hook Form) agiliza la gestión de pedidos, el manejo de imágenes, la comunicación con el cliente y la generación de documentos, con construcción de pedidos por arrastrar y soltar (dnd-kit), subidas a Cloudinary y exportación a Word/Excel. Entregado desde la arquitectura e implementación hasta el despliegue y la adopción del cliente.',
          },
        ],
      },
      {
        label: 'Trabajo en Equipo',
        note: 'Co-desarrollado',
        items: [
          {
            title: 'TsunaGo · Emparejamiento de taxis de transporte asistido',
            year: '2024 · Bolivian Devs',
            live: 'En producción',
            alt: 'TsunaGo, vista previa de la interfaz',
            product: [
              'Una app que conecta a personas que necesitan transporte asistido (pacientes, adultos mayores y sus acompañantes) con conductores disponibles cerca. Pides un viaje, eliges el tipo de cuidado necesario, te emparejan con un conductor y pagas en la app.',
              'El emparejamiento se basa en las necesidades de cuidado, no solo en la ubicación: indicas lo que se requiere y la app te asigna un conductor que encaja. Puedes revisar los detalles del viaje y completar el pago en el mismo flujo.',
              'También permite reservar con anticipación, ver viajes anteriores, calificar conductores y administrar tu cuenta. Los conductores pueden registrarse, definir su horario y seguir sus ganancias.',
            ],
            tech: 'Backend en NestJS, TypeScript y PostgreSQL (Prisma) con autenticación JWT y acceso por roles para conductores, pasajeros y administradores. Procesamiento de pagos confiable con Stripe (manejo de webhooks, reintentos automáticos y resguardos de consistencia transaccional). Automatización en segundo plano para el ciclo de vida del viaje, recordatorios y notificaciones, más integraciones con AWS (S3, SES, SNS) y Google Maps. CI/CD en GitHub Actions con Docker y Traefik en AWS. Cliente en React Native y Expo con experiencias por rol y flujos de pago.',
          },
          {
            title: 'Makevi · Gestión de vendedores de Shopee',
            year: '2024 · Bolivian Devs',
            live: 'En producción',
            alt: 'Makevi, vista previa de la interfaz',
            product: [
              'Makevi es una plataforma todo en uno pensada para simplificar la gestión diaria de tiendas en Shopee. Centraliza la publicación de productos, el inventario, el procesamiento de pedidos y el análisis de ventas en un solo sistema, reduciendo el trabajo manual y ofreciendo un flujo más eficiente y organizado para operar en el marketplace.',
            ],
            tech: 'SaaS multi-tenant en NestJS, TypeScript, PostgreSQL y Prisma. Suscripciones de Stripe, sincronización con el marketplace de Shopee y AWS para facturación, e-commerce y comunicaciones con clientes. Flujos en segundo plano para sincronización de datos y automatización de facturación, con validación de entradas, logging estructurado, documentación de API, monitoreo de salud y pruebas automatizadas. Dockerfile multi-etapa publicado a AWS ECR/ECS con GitHub Actions. Funcionalidades de frontend en Next.js y React.',
          },
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
      { name: 'Inglés', level: 'Intermedio-alto' },
      { name: 'Español', level: 'Nativo' },
    ],
  },
  aiDev: {
    eyebrow: '03 / IA & Dev',
    title: 'La IA como multiplicador de productividad.',
    lead: 'Uso IA en todo el ciclo de vida del desarrollo de software para ganar productividad y reducir el trabajo repetitivo.',
    body: [
      'Me apoya en implementación, pruebas, documentación, depuración, análisis de código e investigación técnica.',
      'Al delegar las tareas rutinarias, puedo concentrarme en lo que de verdad importa: arquitectura, escalabilidad, requisitos de producto y la resolución de problemas de ingeniería complejos. La IA me hace ir más rápido, pero no reemplaza el criterio de ingeniería.',
    ],
    accountable:
      'Soy plenamente responsable de cada línea de código que llega a producción. Cada contribución asistida por IA la reviso, valido y adapto para que cumpla mis estándares de calidad, seguridad y mantenibilidad.',
    close:
      'Para mí, el verdadero valor de la IA no es la automatización. Es la libertad de poner más energía en los problemas que generan el mayor impacto.',
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
    note: 'Llega directo a mi bandeja · suelo responder en un día.',
    sending: 'Enviando tu mensaje…',
    success: 'Gracias, tu mensaje está en camino. Te responderé pronto.',
    errorGeneric:
      'Algo salió mal al enviar tu mensaje. Inténtalo de nuevo o escríbeme directamente.',
    errorNetwork:
      'No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.',
    errorVerification:
      'No pudimos confirmar que eres humano. Vuelve a hacer la verificación.',
    errorTooLong: 'Tu mensaje es un poco largo. Acórtalo y vuelve a enviarlo.',
    errorInvalid:
      'Algunos datos no se ven bien. Revisa los campos e inténtalo de nuevo.',
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
    text: 'Esta página está hecha con <b>Astro</b> y <b>TypeScript</b>, una capa i18n EN/ES propia y un <b>bundle de cliente sin dependencias</b>. Páginas estáticas, un endpoint serverless, open source.',
    source: 'Ver código',
  },
};

export type Lang = 'en' | 'es';

export const content: Record<Lang, Content> = { en, es };

export const defaultLang: Lang = 'en';

/** The locale used for server-rendered HTML (what the swap restores "en" to). */
export const dict: Content = content[defaultLang];
