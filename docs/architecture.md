# Architecture

This document records architectural decisions already made. It intentionally avoids implementation choices that have not been decided.

## Application Surfaces

```text
Public website
/
├── /history
├── /programs
├── /donate
└── /about

/display
/admin
```

The public website, mosque display, and future administration area are separate surfaces within one mosque platform.

## Shared Data Principle

Home, `/display`, and future `/admin` functionality should eventually operate on shared mosque data rather than maintaining duplicate facts.

For example:

```text
Prayer data
    |
    +--> Home
    |
    +--> /display
    |
    +<-- future /admin updates
```

## Prayer Principle

Future prayer architecture must distinguish:

- Calculated prayer or adhan times
- Mosque-controlled iqamah times
- Sunrise
- Jummah
- Special schedules

No prayer provider has been selected or integrated. The mosque timezone is `America/Los_Angeles`.

## Content vs UI Translation

- Short interface labels belong in i18next.
- Substantive content, including history, program descriptions, announcements, and visitor guidance, should use localized content structures.
- English content may exist before reviewed Arabic and Spanish versions are available.
- Arabic must retain right-to-left layout support.

## Backend Principle

There is intentionally no backend yet. A future backend and administration implementation should be selected from actual maintenance requirements rather than chosen speculatively.

## Scope

These decisions do not select domain models, content storage, a prayer provider, authentication, a database, or backend infrastructure. Those choices remain open until their requirements are defined.
