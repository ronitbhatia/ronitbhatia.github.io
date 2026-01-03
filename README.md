# Ronit Bhatia - Portfolio Website

Personal portfolio website showcasing projects, experience, education, and skills.

## Features

- **Interactive Timeline**: Comprehensive career journey with clickable milestones
- **Search Engine Interface**: Google-like search functionality to discover content
- **Dark Mode**: Smooth dark/light theme toggle
- **Custom Cursor**: Lightweight, smooth custom cursor (desktop only)
- **Mobile Responsive**: Hamburger menu for mobile navigation
- **Smooth Animations**: Scroll-triggered animations and transitions
- **Clean URLs**: About page always uses root URL (`/`)

## Technologies

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid)
- Vanilla JavaScript
- No frameworks or dependencies

---

## 📅 Interactive Timeline Feature

### Overview
A comprehensive, interactive timeline component in the About section that displays all career milestones in chronological order. Each timeline item is clickable and navigates to the corresponding detailed page.

### Key Features

#### 🎨 Visual Design
- **Alternating Layout**: Timeline items alternate between left and right for visual interest
- **Gradient Center Line**: Colorful gradient connecting all milestones
- **Custom Icons**: Unique SVG icons for work, education, and initiatives
- **Year Badges**: Gradient-styled date badges
- **Hover Indicators**: Arrow (→) appears on hover to indicate clickability

#### 🎭 Interactions
- **Click to Navigate**: Click any item to go to the detailed page
- **Direct Section Links**: Items link to specific sections using anchor IDs
- **Hover Effects**: Card lifts, border glows, arrow indicator appears
- **Active Feedback**: Press animation provides tactile click feedback
- **Smooth Animations**: Staggered fade-in as items enter viewport

#### 📱 Responsive Design
- **Desktop**: Beautiful alternating left/right layout with center line
- **Mobile**: Vertical left-aligned timeline optimized for mobile
- **Touch-Friendly**: Large tap targets and optimized interactions

### Timeline Content (13 Milestones)

**2025**
1. ML Engineer @ QAlienAI (Oct 2025 – Present)
2. AI Hackathon – Conference Buddy (Aug 2025)
3. Graduated from Cornell University (May 2025)
4. Outreach Leader @ Cornell PM Club (Dec 2024 – May 2025)
5. Software Engineer @ Gallox (Nov 2024 – Jan 2025)

**2024**
6. Associate Consultant @ Cornell Consulting (Nov 2024 – May 2025)
7. Talent 2.0 Hackathon Finalist (Nov 2024)
8. Research Assistant @ Cornell CALS (Aug 2024 – Dec 2024)
9. Started @ Cornell University (Aug 2024)
10. Graduated from UC Davis (June 2024)
11. Software Developer @ ColentAI (Jan 2024 – Mar 2024)

**2021 & 2020**
12. Data Analyst @ Cardinality-AI (June 2021 – Sept 2021)
13. Started @ UC Davis (Sept 2020)

### Navigation Links

- **Experience Items** → `/experience#section-id`
- **Education Items** → `/education`
- **Initiative Items** → `/initiative-impact`

### Adding Timeline Items

To add a new timeline item, use this template:

```html
<div class="timeline-item" data-year="YYYY" data-link="/page#section" data-type="experience|education|initiative">
    <div class="timeline-marker">
        <div class="timeline-icon">
            <!-- SVG icon here -->
        </div>
    </div>
    <div class="timeline-content">
        <div class="timeline-year">Date Range</div>
        <h4 class="timeline-heading">Title @ Company</h4>
        <p class="timeline-description">
            Brief description...
        </p>
        <div class="timeline-tags">
            <span class="timeline-tag">Tag</span>
        </div>
    </div>
</div>
```

### Technical Implementation

**HTML**:
- Data attributes store link and type info
- Located in `index.html` About section

**CSS**:
- Hover states, animations, responsive layout
- Located in `style.css` (lines ~1143-1420)

**JavaScript**:
- Click handler navigates to URLs
- Intersection Observer for animations
- Located in `index.html` inline script

### Icon Library

- 💼 Work Experience: Briefcase icon
- 🎓 Education: Graduation cap icon
- 🔬 Research: Layers/flask icon
- 💻 Development: Code brackets
- 🏆 Achievement: Star/trophy
- 👥 Leadership: People/group

---

## Deployment

This site is deployed on GitHub Pages at: https://ronitbhatia.github.io/

## Local Development

For local testing, use a web server:

```bash
# Python 3
python3 -m http.server 8000

# Node.js (if installed)
npx http-server -p 8000
```

Then open: `http://localhost:8000`

## Structure

- `index.html` - Homepage with search interface, about section, and timeline
- `projects.html` - Featured projects
- `experience.html` - Professional experience
- `education.html` - Educational background
- `skills.html` - Technical skills
- `initiative-impact.html` - Initiatives and impact
- `style.css` - All styles and themes
- `search.js` - Search functionality

## License

© 2025 Ronit Bhatia. All rights reserved.
