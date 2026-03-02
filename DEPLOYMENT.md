# Todo App - Deployment Guide

## 🚀 Quick Deployment Overview

This guide covers deploying the Todo App to production with:
- **Frontend**: Vercel (React + Vite)
- **Backend**: Railway/Render (Express + PostgreSQL)
- **Database**: PostgreSQL (replacing SQLite for production)

---

## 📋 Prerequisites

1. **GitHub Account** - for code hosting
2. **Vercel Account** - for frontend deployment (free tier available)
3. **Railway/Render Account** - for backend deployment (free tier available)
4. **GitHub CLI** (optional) - `gh` command for easier repo creation

---

## 🗂️ Step 1: GitHub Repository Setup

### Option A: Using GitHub CLI (if available)

```bash
# Login to GitHub
gh auth login

# Create repository
gh repo create todo-app-production --public --source=. --remote=origin --push

# Verify
gh repo view
```

### Option B: Manual Setup

1. Go to https://github.com/new
2. Create a new repository named `todo-app-production`
3. **Don't** initialize with README (we already have code)
4. Copy the repository URL
5. Add remote and push:

```bash
cd /home/node/.openclaw/team-workspace
git remote add origin https://github.com/YOUR_USERNAME/todo-app-production.git
git branch -M main
git push -u origin main
```

---

## 💾 Step 2: Database Migration (SQLite → PostgreSQL)

**Important**: SQLite doesn't work in serverless/stateless environments. We need PostgreSQL.

### Option A: Vercel Postgres (Recommended for Vercel backend)

1. Go to https://vercel.com/dashboard
2. Create new project or select existing
3. Go to Storage → Create Database → Postgres
4. Copy the connection string

### Option B: Supabase (Free tier, easy setup)

1. Go to https://supabase.com
2. Create new project
3. Get connection string from Settings → Database
4. Format: `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

### Option C: Neon (Serverless Postgres)

1. Go to https://neon.tech
2. Create new project
3. Copy connection string
4. Format: `postgresql://[user]:[password]@[endpoint]/[dbname]`

### Update Backend Dependencies

```bash
cd backend
npm install pg
npm install --save-dev @types/pg
npm uninstall sqlite3 @types/sqlite3
```

---

## 🎨 Step 3: Deploy Frontend to Vercel

### Option A: Vercel CLI

```bash
# Install Vercel CLI globally or use npx
npm install -g vercel
# or
npx vercel

# Login
vercel login

# Deploy frontend
cd /home/node/.openclaw/team-workspace/frontend
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: todo-app-frontend
# - Directory: ./
# - Want to override settings? No

# Deploy to production
vercel --prod
```

### Option B: Vercel Dashboard (Easier)

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variable:
   - `VITE_API_BASE_URL` = `https://your-backend-url.com/api` (add after backend deployment)
5. Click **Deploy**

**Note**: You'll need to update `VITE_API_BASE_URL` after deploying the backend.

---

## 🔧 Step 4: Deploy Backend

### Option A: Railway (Recommended)

1. Go to https://railway.app
2. Click **New Project** → **Deploy from GitHub repo**
3. Select your `todo-app-production` repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
5. Add PostgreSQL plugin:
   - Click **New** → **Database** → **Add PostgreSQL**
   - Railway will auto-inject `DATABASE_URL`
6. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `PORT` = `3000`
   - `CORS_ORIGIN` = `https://your-frontend-url.vercel.app`
7. Deploy!

**Backend URL**: `https://[your-project].up.railway.app`

### Option B: Render

1. Go to https://render.com
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `todo-app-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - `DATABASE_URL` = `[your postgres connection string]`
   - `NODE_ENV` = `production`
   - `CORS_ORIGIN` = `https://your-frontend-url.vercel.app`
6. Create PostgreSQL database (from dashboard) and link it

**Backend URL**: `https://todo-app-backend.onrender.com`

---

## 🔄 Step 5: Update Frontend Environment Variable

After backend is deployed:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Update `VITE_API_BASE_URL`:
   - **Value**: `https://[your-backend-url]/api`
3. Redeploy frontend:
   ```bash
   vercel --prod
   ```

---

## ✅ Step 6: Verify Deployment

### Test Backend
```bash
# Health check
curl https://your-backend-url.com/health

# Test API
curl https://your-backend-url.com/api/todos
```

### Test Frontend
1. Open your Vercel URL in browser
2. Try creating a todo
3. Verify CORS is working
4. Check browser console for errors

---

## 🔐 Security Checklist

- ✅ Environment variables set (not hardcoded)
- ✅ CORS configured for your frontend domain
- ✅ `.env` files in `.gitignore`
- ✅ Database credentials secured
- ✅ No sensitive data in repository

---

## 📊 Monitoring & Logs

### Vercel (Frontend)
- Dashboard → Your Project → Deployments → Logs

### Railway (Backend)
- Dashboard → Your Service → Logs tab

### Render (Backend)
- Dashboard → Your Service → Logs

---

## 🐛 Troubleshooting

### CORS Errors
- Ensure `CORS_ORIGIN` in backend matches your Vercel URL exactly
- Include `https://` in the URL
- No trailing slash

### Database Connection Issues
- Verify `DATABASE_URL` format
- Check firewall rules (Supabase/Neon)
- Test connection string locally first

### Build Failures
- Check Node version compatibility
- Verify all dependencies are in `package.json`
- Review build logs for specific errors

---

## 🔄 Continuous Deployment

Both Vercel and Railway/Render support automatic deployments:
- Push to `main` branch → Auto-deploy production
- Push to other branches → Preview deployments (Vercel)

---

## 📱 Custom Domain (Optional)

### Vercel (Frontend)
1. Settings → Domains
2. Add your custom domain
3. Configure DNS records as shown

### Railway (Backend)
1. Settings → Networking → Custom Domain
2. Add domain and configure DNS

---

## 🎯 Success Criteria

- ✅ GitHub repository is live
- ✅ Frontend deployed to Vercel
- ✅ Backend deployed to Railway/Render
- ✅ Database is PostgreSQL (not SQLite)
- ✅ CORS configured correctly
- ✅ API calls working end-to-end
- ✅ README updated with URLs

---

## 📝 Update Main README

After successful deployment, add this to your main README.md:

```markdown
## 🌐 Live Demo

- **Frontend**: https://your-app.vercel.app
- **Backend API**: https://your-backend.railway.app
- **Repository**: https://github.com/username/todo-app-production

## API Endpoints

- `GET /health` - Health check
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo
```

---

## 🆘 Need Help?

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs
- PostgreSQL Migration: See `POSTGRES_MIGRATION.md`

---

**Good luck with your deployment! 🚀**
