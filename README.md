# Abu Bakr Al-Siddiq Mosque Website

Official website project for Abu Bakr Al-Siddiq Mosque in Delano, California.

Planned domain: `DelanoMosque.org`

## Project Goal

Build a useful, welcoming, and maintainable digital home for the mosque that serves both regular community members and people discovering the mosque for the first time.

The site should make essential information easy to find, preserve the mosque's local history, support community programs, and leave room for future administrative tools without requiring ordinary visitors to create accounts.

## Initial Site Structure

### Home

- Mosque introduction
- Today's prayer times
- Important announcements
- Upcoming events and programs
- Quick links to prayer times, directions, donations, and community information

### Prayer Times

- Daily salah times
- Iqamah times
- Jummah information
- Clear date and location context

### About

- Mosque mission and community role
- Leadership/contact information where appropriate
- Basic information for new visitors

### History

- History of the mosque
- Yemeni community history in Delano and the surrounding San Joaquin Valley
- Oral histories, photographs, archival material, and community stories as they are collected

### Community

- Classes and educational programs
- Youth and family programs
- Community events
- Announcements

### Donate

- Mosque donation information
- QR-code and online donation options once the official payment process is confirmed
- Clear explanation of what donations support

### Visit / Contact

- Address and directions
- Mosque hours/access information
- Contact information
- Guidance for first-time visitors

## Planned Application Areas

Keep this as one mosque platform rather than several disconnected applications:

- `/` and normal public routes: public mosque website
- `/display`: mosque display/prayer-time screen intended for use inside the building
- `/admin`: private administration area for authorized mosque staff

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

This repository is currently in the groundwork/planning stage.

The next areas to define are:

- Information architecture
- Content/data model
- Design system
- Prayer-time strategy
- Initial application architecture
