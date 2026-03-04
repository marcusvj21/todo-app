# 🚀 Railway Deployment - Quick Start

## TL;DR

Your backend is **READY** to deploy to Railway. Just follow these 5 steps:

---

## Step-by-Step (5 Minutes)

### 1. Create Railway Project
```
1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select: marcusvj21/todo-app
4. Set root directory: backend
```

### 2. Add PostgreSQL
```
1. In project, click "New" → "Database" → "Add PostgreSQL"
2. Done! DATABASE_URL is auto-created
```

### 3. Set Environment Variables
```
Go to backend service → Variables → Add:

NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://todo-app-frontend-marcus-projects-249ca51a.vercel.app
```

### 4. Deploy
```
Railway auto-deploys. Wait 2-5 minutes.
Watch logs in "Deployments" tab.
```

### 5. Get Backend URL
```
Go to Settings → Domains
Copy the Railway URL (e.g., https://todo-app-production.up.railway.app)
Update your Vercel frontend with this URL
```

---

## Test Your Deployment

```bash
# Health check
curl https://your-backend-url.up.railway.app/health

# Create a todo
curl -X POST https://your-backend-url.up.railway.app/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"First Railway Todo","description":"Testing deployment"}'

# Get all todos
curl https://your-backend-url.up.railway.app/api/todos
```

---

## What's Already Done ✅

- ✅ Code migrated to PostgreSQL
- ✅ All dependencies installed (pg)
- ✅ SQLite removed
- ✅ API routes implemented
- ✅ CORS configured for Vercel
- ✅ Pushed to GitHub

---

## Troubleshooting

**Build fails?**
- Check Railway logs in Deployments tab
- Verify root directory is set to `backend`

**Database connection error?**
- Verify PostgreSQL service is added
- Check `DATABASE_URL` exists in variables

**CORS error from frontend?**
- Verify `CORS_ORIGIN` matches your Vercel URL exactly

**Need more help?**
- See full guide: `RAILWAY_DEPLOYMENT_GUIDE.md`

---

## After Deployment

1. Copy your Railway backend URL
2. Update Vercel frontend environment variable:
   ```
   VITE_API_URL=https://your-backend-url.up.railway.app
   ```
3. Redeploy frontend on Vercel
4. Test the full application!

---

**That's it! Your backend will be live in 5 minutes. 🎉**
