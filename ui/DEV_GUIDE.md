# TechStacks React Development Guide

## 🚀 Quick Start

### Prerequisites
- Node.js v16+ (current: v24.10.0)
- .NET 8.0 SDK
- PostgreSQL database

### Development Workflow

**You need to run BOTH the backend and frontend simultaneously:**

#### Terminal 1 - Start the Backend
```bash
cd TechStacks
dotnet run
```

This starts the ASP.NET backend on `https://localhost:5001`

#### Terminal 2 - Start the Frontend
```bash
cd ui
npm run dev
```

This starts the Vite dev server on `http://localhost:5173`

### Access the Application

Open your browser to: **http://localhost:5173**

The Vite dev server will proxy all API requests to the backend:
- `/api/*` → `https://localhost:5001/api/*`
- `/auth/*` → `https://localhost:5001/auth/*`
- `/signin-oidc-github` → `https://localhost:5001/signin-oidc-github`

## 📁 Project Structure

```
ui/
├── src/
│   ├── components/      # Reusable components
│   │   └── common/      # Header, Footer
│   ├── layouts/         # MainLayout, AuthLayout
│   ├── pages/           # All page components
│   │   ├── auth/        # Login, Register, Callback
│   │   ├── technologies/
│   │   ├── stacks/
│   │   ├── organizations/
│   │   ├── posts/
│   │   └── users/
│   ├── services/
│   │   ├── api.js       # API client wrapper
│   │   └── dtos.js      # ServiceStack DTOs
│   ├── stores/
│   │   └── useAppStore.js  # Zustand state management
│   ├── utils/
│   │   └── helpers.js   # Utility functions
│   ├── App.jsx          # Main app with routing
│   └── main.jsx         # Entry point
├── package.json
├── vite.config.js       # Vite configuration
└── tailwind.config.js   # Tailwind CSS config
```

## 🔧 Available Scripts

### Frontend (ui/)
```bash
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Build for production (outputs to ../TechStacks/wwwroot)
npm run preview   # Preview production build
```

### Backend (TechStacks/)
```bash
dotnet run                      # Start backend (https://localhost:5001)
dotnet watch run                # Start with hot reload
dotnet run --AppTasks=migrate   # Run database migrations
```

## 🎨 Tech Stack

- **Vite** - Fast build tool and dev server
- **React 18** - UI framework
- **Tailwind CSS v4** - Styling
- **React Router v6** - Client-side routing
- **Zustand** - State management
- **React Query** - Server state management
- **ServiceStack Client** - API integration
- **Lucide React** - Icons

## 🔐 Authentication

The app uses GitHub OAuth for authentication:

1. Click "Sign in with GitHub" on the login page
2. Redirect to GitHub for authorization
3. GitHub redirects back to `/signin-oidc-github`
4. ASP.NET Identity processes the callback
5. React app loads session via `/api/my-session`

**Note**: GitHub OAuth credentials must be configured in the backend:
- Environment variables: `GH_CLIENT_ID`, `GH_CLIENT_SECRET`
- Or in `appsettings.json`: `oauth.github.ClientId/ClientSecret`

## 🐛 Troubleshooting

### Proxy Connection Errors

**Error**: `http proxy error: connect ECONNREFUSED`

**Solution**: Make sure the backend is running first!
```bash
cd TechStacks
dotnet run
```

Wait for the message: `Now listening on: https://localhost:5001`

Then start the frontend:
```bash
cd ui
npm run dev
```

### Port Already in Use

If port 5173 is busy:
```bash
cd ui
npm run dev -- --port 3000
```

### Backend Port Issues

If the backend can't start on 5001, update both:
1. `TechStacks/Properties/launchSettings.json`
2. `ui/vite.config.js` proxy target

## 📦 Production Build

To create a production build:

```bash
cd ui
npm run build
```

This outputs to `TechStacks/wwwroot/`:
- `index.html` - Main HTML file
- `assets/` - Bundled JS and CSS

Then run the backend:
```bash
cd TechStacks
dotnet run
```

Access at: `https://localhost:5001`

## 🚀 Deployment

For production deployment:

```bash
cd ui
npm run build

cd ../TechStacks
dotnet publish -c Release
```

The published output will be in `TechStacks/bin/Release/net8.0/publish/`

## 📝 Environment Variables

### Backend
- `GH_CLIENT_ID` - GitHub OAuth Client ID
- `GH_CLIENT_SECRET` - GitHub OAuth Client Secret
- `TECHSTACKS_DB` - PostgreSQL connection string

### Frontend
None required - all configuration is done in the backend.

## 🔗 Useful URLs

- **Dev Frontend**: http://localhost:5173
- **Dev Backend**: https://localhost:5001
- **API Swagger**: https://localhost:5001/swagger
- **API Metadata**: https://localhost:5001/metadata

## 💡 Tips

1. **Hot Module Replacement (HMR)**: Changes to React components update instantly without page refresh
2. **State persistence**: The Zustand store persists some data to localStorage
3. **API debugging**: Check browser DevTools Network tab for API calls
4. **React DevTools**: Install the React DevTools browser extension for state inspection
5. **Tailwind IntelliSense**: Install the Tailwind CSS IntelliSense VS Code extension

## 📚 Further Reading

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React Router Documentation](https://reactrouter.com/)
- [Zustand Documentation](https://docs.pmnd.rs/zustand/)
- [ServiceStack Documentation](https://docs.servicestack.net/)
