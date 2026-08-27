# Project Reference

This document records confirmed project facts and current product decisions for the Abu Bakr Al-Siddiq Mosque website.

## Mosque Identity

- Official English name: **Abu Bakr Al-Siddiq Mosque**
- Arabic name: **مسجد أبي بكر الصديق**
- Address: **1130 Kensington St, Delano, CA 93215**
- Planned domain: **delanomosque.org**

The alternate Google romanization is not the canonical mosque name.

## Prayer Calculation Location

- Latitude: **35.772517**
- Longitude: **-119.243572**
- Timezone: **America/Los_Angeles**

These verified coordinates identify the mosque's physical calculation location. They are independent of the mosque's display name and street-address formatting; only an actual physical relocation should change them.

## Visitor Facilities

Confirmed:

- There is a separate entrance for women.
- Wudu facilities are available.

The following details are not yet confirmed and should not be published as facts:

- Exact directions to the women's entrance
- Specific wudu-room locations
- Parking guidance
- Accessibility details
- Mosque opening or access hours

These details are not currently required and can be added when confirmed.

## Contact Information

The phone number currently visible on Google is not approved website contact information. Public contact details require confirmation before publication.

## Public Information Architecture

Current public routes:

```text
/
/history
/programs
/donate
/about
```

Special application surfaces:

```text
/display
/admin
```

Current decisions:

- Prayer times appear directly on Home.
- Jummah information appears directly on Home.
- There is currently no separate `/prayer-times` route.
- About absorbs general visit and contact information.
- Programs contains classes, education, recurring programs, and events.
- History remains a dedicated page because the mosque and community history is expected to be substantive.
- Donate remains a dedicated route because donating is a distinct user task.

## Homepage Priorities

The intended information hierarchy is approximately:

1. Mosque identity / hero
2. Today's prayer times
3. Jummah information
4. Practical visitor information
   - Women's entrance available
   - Wudu available
   - Location / directions
5. Prominent paths to History, Programs, Donate, and About
6. Upcoming programs and events
7. Important announcement when applicable
8. Location / directions

This hierarchy is not a finished visual specification.

## Kind Word Foundation

- Kind Word Foundation is relevant to the imam's broader educational and community work.
- The Delano mosque website should retain an independent mosque identity.
- Related programs may eventually link to or acknowledge Kind Word Foundation where appropriate.
- Do not make legal or organizational claims about the relationship until confirmed.
