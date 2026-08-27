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
    +--> Home (implemented)
    |
    +--> /display (future consumer)
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

AlAdhan is the implemented provider for calculated prayer times. The integration requests a Gregorian month using the mosque's verified fixed coordinates (`35.772517`, `-119.243572`) and `America/Los_Angeles`, normalizes only Fajr, Sunrise, Dhuhr, Asr, Maghrib, and Isha, and caches the normalized month in the browser for 24 hours. A stale cached month may be used when a refresh fails.

Prayer calculations do not use address geocoding. The mosque's name and street address remain display and directions metadata; changing their text does not change the calculation location. Only an actual physical relocation should change the configured coordinates.

The current configurable calculation setting is ISNA (AlAdhan method `2`). The current configurable Asr juristic-school setting is AlAdhan school `0`, its standard/Shafi calculation. Both settings are provisional development defaults and must be compared with and confirmed against the mosque's actual convention.

AlAdhan never owns mosque-controlled iqamah times, Jummah, Eid, Ramadan-specific schedules, or other special overrides. Home and `/display` are still intended to consume the same normalized prayer model as those mosque-controlled data sources are added later.

The mosque timezone is `America/Los_Angeles`.

## Content vs UI Translation

- Short interface labels belong in i18next.
- Substantive content, including history, program descriptions, announcements, and visitor guidance, should use localized content structures.
- English content may exist before reviewed Arabic and Spanish versions are available.
- Arabic must retain right-to-left layout support.

## Backend Principle

There is intentionally no backend yet. A future backend and administration implementation should be selected from actual maintenance requirements rather than chosen speculatively.

## Scope

These decisions do not select content storage, authentication, a database, or backend infrastructure. Those choices remain open until their requirements are defined.
