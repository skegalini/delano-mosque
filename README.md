# Abu Bakr Al-Siddiq Mosque Website

Official website project for Abu Bakr Al-Siddiq Mosque in Delano, California.

Planned domain: `delanomosque.org`

## Project Goal

Build a useful, welcoming, and maintainable digital home for the mosque that serves both regular community members and people discovering the mosque for the first time.

The site should make essential information easy to find, preserve the mosque's local history, support community programs, and leave room for future administrative tools without requiring ordinary visitors to create accounts.

## Initial Site Structure

### Home

- Mosque identity and introduction
- Today's prayer times and Jummah information
- Quick links to History, Programs, Donate, and About / Visit
- Upcoming programs and events
- Important announcements
- Location and directions

### History

- History of the mosque
- Yemeni community history in Delano and the surrounding San Joaquin Valley
- Oral histories, photographs, archival material, and community stories as they are collected

### Programs

- Quran education and Arabic classes
- Youth and family programs
- Recurring classes, community programs, and events

### Donate

- Mosque donation information
- QR-code and online donation options once the official payment process is confirmed
- Clear explanation of what donations support

### About

- Mosque overview, mission, and community role
- Leadership/contact information where appropriate
- Address and directions
- Mosque hours/access information
- Contact information
- Guidance for first-time visitors

## Planned Application Areas

Keep this as one mosque platform rather than several disconnected applications:

- `/`: Home
- `/history`: History
- `/programs`: Programs
- `/donate`: Donate
- `/about`: About, visit, and contact information

This public structure is intentionally small and discoverable. Home owns the normal public prayer-times and Jummah experience rather than sending visitors to a separate prayer-times page.

Separate application surfaces remain part of the same platform:

- `/display`: mosque prayer/display screen intended for use inside the building
- `/admin`: future private administration area for authorized mosque staff

Ordinary visitors should not need accounts. Authentication should be limited to administrative functionality unless a later requirement clearly calls for otherwise.

## Relationship to Kind Word Foundation

The mosque website should remain an independent public identity for Abu Bakr Al-Siddiq Mosque.

Kind Word Foundation may be linked or acknowledged where it operates related educational or community programs, but the mosque's prayer information, history, visitor information, and identity should not be buried inside the foundation website.

Do not make stronger claims about the organizational/legal relationship until that is confirmed.

## Technical Direction

Initial direction:

- React
- TypeScript
- Vite
- Mobile-first responsive design
- Accessible semantic UI
- Architecture that can later support an admin area, persistent data, and the mosque display without requiring a rewrite

Backend, authentication, payments, hosting, and production infrastructure are intentionally undecided until the public-site and data requirements are clearer.

## Language Support

Design from the beginning for:

- English
- Arabic
- Spanish

Arabic must support proper RTL layout. Translations should eventually be reviewed by people rather than relying entirely on automatic translation.

## Visual Direction

Avoid generic mosque-template styling.

Current visual direction:

- Deep green inspired by the mosque exterior
- Warm off-white / neutral backgrounds
- Select red accents inspired by the mosque carpet
- Subtle references to Yemeni heritage and Delano / San Joaquin Valley history
- Strong photography of the actual mosque and community where appropriate
- Perhaps Yemeni-style UI (will be fleshed out more later)

Overall tone: calm, dignified, welcoming, historically grounded, and easy to navigate.

## Current Status

This repository is currently in the groundwork/planning stage. Phase 0 establishes the frontend development foundation; website content and finished design are not yet implemented.

The next areas to define are:

- Information architecture
- Content/data model
- Design system
- Prayer-time strategy
- Initial application architecture

## Development

Node.js 24 and pnpm are required.

```bash
pnpm install
pnpm dev
```

Available validation commands:

```bash
pnpm build
pnpm lint
pnpm typecheck
pnpm test
```
