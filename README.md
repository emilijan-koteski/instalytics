# Instalytics

A React-based Instagram analytics tool that helps you discover who doesn't follow you back.

## Features

- **Upload & Analyze**: Drag & drop your Instagram data export (ZIP file)
- **Non-Followers Detection**: See exactly who you follow but doesn't follow you back
- **Clean Interface**: Google-like upload page with cyberpunk-themed results
- **Profile Links**: Direct links to Instagram profiles for easy access
- **Statistics**: View follower counts, following counts, and follow ratios

## How to Use

1. **Get your Instagram data**: Go to Instagram → Settings → Privacy and Security → Data Download
2. **Request download** in JSON format (takes a few hours)
3. **Upload the ZIP file** to Instalytics
4. **View results** showing non-followers with profile links

## Development

```bash
npm install
npm run dev
```

## Tech Stack

- React 19 + TypeScript
- Vite
- Material-UI v7
- SCSS
- JSZip for data processing
