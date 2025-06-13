# Goldilocks List - React Application

This is a React-based web application for property listings and hotel matching, transferred from a Bolt project to Cursor.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm (comes with Node.js)

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
├── src/
│   ├── components/     # Reusable React components
│   ├── contexts/       # React context providers
│   ├── data/          # Static data and constants
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions and configurations
│   ├── pages/         # Page components
│   ├── types/         # TypeScript type definitions
│   ├── App.tsx        # Main application component
│   ├── main.tsx       # Application entry point
│   └── index.css      # Global styles
├── public/            # Static assets
├── supabase/          # Database migrations and configuration
├── dist/              # Build output (generated)
└── package.json       # Project dependencies and scripts
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🎨 Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase** - Backend as a Service
- **Lucide React** - Icon library

## 📱 Features

- Property listings and search
- User authentication
- Favorites management
- City-based browsing
- Blog and FAQ sections
- Hotel matching functionality
- Partner registration

## 🔧 Development

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add the route to `src/App.tsx`
3. Update navigation if needed

### Styling
- Uses Tailwind CSS for styling
- Global styles in `src/index.css`
- Component-specific styles can be added inline or in separate CSS files

### Database
- Supabase is used for the backend
- Database migrations are in `supabase/migrations/`
- Configure your Supabase credentials in the environment variables

## 🚀 Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. The built files will be in the `dist/` directory
3. Deploy the contents of `dist/` to your hosting provider

## 📝 Notes

- This project was transferred from a Bolt project to Cursor
- All dependencies have been preserved and are compatible
- The development server runs on `http://localhost:5173` by default
- Make sure to configure your Supabase environment variables for full functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is private and proprietary. 