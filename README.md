# Say Yes Learning Schools (SYLS) Website

A responsive React and Tailwind CSS website for Say Yes Learning Schools, built to present the school's mission, programs, team, gallery, and updated contact channels.

## Overview

The website includes:

- A multi-page single-page-app style experience for `Home`, `About`, `Programs`, `Team`, `Gallery`, and `Contact`
- A fixed top navigation and synchronized footer navigation
- Updated school branding using a green color system
- A contact section connected to WhatsApp
- Board member and school content managed from the project source files

## Current Contact Details

- Email: `lizzie.dube@yahoo.com`
- Phone / WhatsApp: `+265885871388`
- Location: `Malawi`
- Business Hours: `Monday - Friday, 7:30 AM - 4:00 PM`

## Current Branding

- Primary Color: `Deep Green (#006400)`
- Secondary Color: `Bright Green (#22c55e)`
- Accent Color: `Forest Green (#166534)`
- Text Style: `White & Green variations`

## Features

- Responsive layout for desktop and mobile
- Hero slider on the home page
- Mission, values, programs, and board member sections
- Working top and footer navigation between pages
- Footer hides the current page link
- Contact form clears inputs and redirects directly to WhatsApp on submit
- WhatsApp icon button opens the same direct WhatsApp link

## Pages

1. `Home` - Hero, mission, stats, and core values
2. `About` - School background and supporting information
3. `Programs` - Academic and co-curricular offerings
4. `Team` - Board members with photos
5. `Gallery` - School gallery categories
6. `Contact` - Contact form, email, WhatsApp, location, and office hours

## Project Structure

```text
src/
  App.jsx
  index.css
  main.jsx

public/
  favicon.ico
  images/
    board-members/

MASTER_DATA.txt
README.md
```

## Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript

## Development

Install dependencies:

```bash
npm install
```

Run the local development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Note: the current Vite production build requires the optional `terser` dependency if minification is configured to use it.

## Content Source

Canonical project content and branding details are maintained in `MASTER_DATA.txt`.

## License

Copyright 2026 Say Yes Learning Schools. All rights reserved.
