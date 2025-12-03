
# NHS BMI Calculator

A modern, responsive BMI (Body Mass Index) calculator built with React, TypeScript, and Express. This application provides an intuitive interface for calculating BMI with support for both metric and imperial units.

## Features

- 🎯 **Accurate BMI Calculation** - Calculate BMI using metric (kg/cm) or imperial (lbs/inches) units
- 📊 **Visual Results** - Interactive gauge visualization showing BMI categories
- 💾 **PDF Export** - Save your BMI results as a PDF document
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI** - Clean interface inspired by NHS design principles
- ⚡ **Fast Performance** - Built with Vite for optimal loading times

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

### Backend
- **Express** - Web server
- **Node.js** - Runtime environment

## Getting Started

### Prerequisites
- Node.js 20 or higher

### Installation

1. Clone the repository or open in Replit

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://0.0.0.0:5000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type check with TypeScript

## Project Structure

```
├── client/              # Frontend application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── lib/         # Utility functions
│   │   └── hooks/       # Custom React hooks
│   └── public/          # Static assets
├── server/              # Backend server
└── shared/              # Shared types and schemas
```

## BMI Categories

- **Underweight**: BMI < 18.5
- **Healthy Weight**: BMI 18.5 - 24.9
- **Overweight**: BMI 25.0 - 29.9
- **Obese**: BMI ≥ 30.0

## Pages

- **Home** - BMI calculator interface
- **About** - Information about BMI and health
- **Disclaimer** - Medical disclaimer
- **Privacy** - Privacy policy
- **Contact** - Contact information

## Deployment

This project is configured for deployment on Replit:

```bash
npm run build
npm run start
```

The build process:
1. Compiles the client with Vite
2. Bundles the server with esbuild
3. Optimizes for production

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT

## Acknowledgments

- Design inspired by NHS BMI Calculator
- UI components from shadcn/ui
- Icons from Lucide
