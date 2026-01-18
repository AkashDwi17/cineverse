# 🎬 Cineverse Documentation Site

A Jekyll-based documentation website for the **Cineverse Movie Booking System** built with the Minimal Mistakes theme.

**Live Site**: [https://akashdwi17.github.io/cineverse](https://akashdwi17.github.io/cineverse)

---

## 📁 Project Structure

```
cineverse/
├── _config.yml          # Site configuration
├── _data/
│   └── navigation.yml   # Sidebar navigation menu
├── _docs/               # Documentation pages
│   ├── backend/         # Backend documentation
│   ├── database/        # Database documentation
│   ├── frontend/        # Frontend documentation
│   ├── introduction.md  # Getting started
│   ├── installation.md  # Installation guide
│   ├── quick-start.md   # Quick start guide
│   └── ...
├── _pages/              # Static pages
│   └── about.md         # About page
├── _includes/           # Reusable HTML components
├── assets/              # Images, CSS, JS
│   └── images/          # Image files
├── index.md             # Homepage
├── Gemfile              # Ruby dependencies
└── README.md            # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Ruby** (version 2.7 or higher)
- **Bundler** (`gem install bundler`)
- **Git**

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/AkashDwi17/cineverse.git
   cd cineverse
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Run the local server**
   ```bash
   bundle exec jekyll serve
   ```

4. **View the site** at `http://localhost:4000/cineverse/`

---

## 📝 How to Update the Site

### Adding New Documentation Pages

1. **Create a new Markdown file** in `_docs/` folder:
   ```markdown
   ---
   title: "Your Page Title"
   permalink: /docs/your-page-slug/
   ---

   Your content here...
   ```

2. **Add to navigation** - Edit `_data/navigation.yml`:
   ```yaml
   docs:
     - title: "Section Name"
       children:
         - title: "Your Page Title"
           url: /docs/your-page-slug/
   ```

### Adding Backend/Frontend/Database Docs

Create files in the appropriate subfolder:
- Backend docs → `_docs/backend/your-file.md`
- Frontend docs → `_docs/frontend/your-file.md`
- Database docs → `_docs/database/your-file.md`

**Example**: Creating a new backend doc:

```markdown
---
title: "Payment Service"
permalink: /docs/backend/payment-service/
---

## Overview
Documentation about the payment service...
```

### Updating the About Page

Edit `_pages/about.md` to update:
- Team members
- Project description
- Technology stack

### Adding Images

1. Place images in `assets/images/`
2. Reference in markdown:
   ```markdown
   ![Description](/cineverse/assets/images/your-image.png)
   ```

### Updating Navigation Menu

Edit `_data/navigation.yml` to add/modify menu items:

```yaml
docs:
  - title: "Getting Started"
    children:
      - title: "Introduction"
        url: /docs/introduction/
      - title: "Installation"
        url: /docs/installation/
  
  - title: "Your New Section"
    children:
      - title: "New Page"
        url: /docs/your-new-page/
```

---

## 📄 Page Frontmatter Reference

Every documentation page needs YAML frontmatter at the top:

```yaml
---
title: "Page Title"           # Required: Display title
permalink: /docs/page-slug/   # Required: URL path
toc: true                     # Optional: Show table of contents
toc_sticky: true              # Optional: Sticky TOC on scroll
---
```

---

## 🎨 Formatting Tips

### Code Blocks
````markdown
```java
public class Example {
    // Your code here
}
```
````

### Callouts/Notices
```markdown
**Note:** This is a note.
{: .notice--info}

**Warning:** This is a warning.
{: .notice--warning}

**Danger:** This is a danger notice.
{: .notice--danger}
```

### Tables
```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
```

---

## 🔄 Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

### Manual Build
```bash
bundle exec jekyll build
```

The built site will be in the `_site/` folder.

---

## 👥 Team

| Name | PRN | GitHub |
|------|-----|--------|
| Akash Dwivedi | 250850120018 | [@AkashDwi17](https://github.com/AkashDwi17) |
| Mayuri Narale | 250850120101 | [@mayurinarale](https://github.com/mayurinarale) |
| Pranavi | 250850120124 | [@Pranavi5494](https://github.com/Pranavi5494) |
| Pruthvi Bhat | 250850120129 | [@PruthviGBhat](https://github.com/PruthviGBhat) |
| Raghavendra | 250850120130 | [@raghvendru](https://github.com/raghvendru) |

---

## 📚 Useful Links

- [Minimal Mistakes Theme Docs](https://mmistakes.github.io/minimal-mistakes/)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Markdown Guide](https://www.markdownguide.org/)

---

## 🆘 Troubleshooting

### Bundle install fails
```bash
gem update --system
bundle update
```

### Site not updating
- Clear browser cache
- Delete `_site/` folder and rebuild
- Check for YAML syntax errors in frontmatter

### Navigation not showing
- Ensure `permalink` matches the URL in `navigation.yml`
- Check for typos in file paths
