# 🚀 Quick Start - Deploy Todo App (5 Steps)

**Time**: ~45-60 minutes | **Cost**: Free tier only | **Difficulty**: Beginner

---

## Before You Start

✅ Git repository is ready and committed  
✅ All deployment configs are prepared  
✅ PostgreSQL migration code is ready  
✅ Documentation is complete  

---

## 🎯 5-Step Deployment

### 1️⃣ Create GitHub Repository (3 min)

```bash
# Go to: https://github.com/new
# Repository name: todo-app-production
# Type: Public
# Click "Create repository"

# Then run:
cd /home/node/.openclaw/team-workspace
git remote add origin https://github.com/YOUR_USERNAME/todo-app-production.git
git branch -M main
git push -u origin main
```

**✅ Checkpoint**: Repository is live on GitHub

---

### 2️⃣ Migrate to PostgreSQL (10 min)

```bash
cd /home/node/.openclaw/team-workspace/backend

# Install PostgreSQL driver
npm install pg
npm install --save-dev @types/pg
npm uninstall sqlite3

# Update backend to use PostgreSQL
# Edit src/index.ts - line 5:
# Change: import { initDatabase, createUpdateTrigger } from './database/init';
# To:     import { initDatabase, createUpdateTrigger } from './database/init-postgres';

# Commit changes
cd ..
git add -A
git commit -m "chore: Migrate to PostgreSQL for production"
git push origin main
```

**✅ Checkpoint**: Backend ready for PostgreSQL

---

### 3️⃣ Deploy Backend to Railway (15 min)

1. **Sign up**: https://railway.app (use GitHub login)
2. **New Project** → Deploy from GitHub repo
3. **Select**: `todo-app-production`
4. **Configure**:
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. **Add Database**:
   - Click "New" → Database → PostgreSQL
   - Wait for provisioning (1-2 min)
6. **Environment Variables**:
   - `NODE_ENV` = `production`
   - `PORT` = `3000`
   - `CORS_ORIGIN` = (add after step 4)
7. **Deploy** (automatic)

**💾 Save this URL**: `https://[your-project].up.railway.app`

**✅ Checkpoint**: Backend is live with PostgreSQL

---

### 4️⃣ Deploy Frontend to Vercel (10 min)

1. **Sign up**: https://vercel.com (use GitHub login)
2. **Import Project**: https://vercel.com/new
3. **Select**: `todo-app-production` from GitHub
4. **Configure**:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **Deploy** (don't add env vars yet)
6. **Wait for deployment** (~2 min)

**💾 Save this URL**: `https://[your-project].vercel.app`

**✅ Checkpoint**: Frontend is live

---

### 5️⃣ Connect Frontend ↔ Backend (5 min)

**A. Update Railway CORS**:
1. Railway Dashboard → Your Service → Variables
2. Edit `CORS_ORIGIN`:
   - Value: `https://[your-vercel-url].vercel.app` (no trailing slash!)
3. Redeploy (automatic)

**B. Add Vercel Environment Variable**:
1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add new:
   - Name: `VITE_API_BASE_URL`
   - Value: `https://[your-railway-url].up.railway.app/api`
   - Apply to: Production
3. Redeploy:
   - Go to Deployments tab
   - Click ••• → Redeploy

**✅ Checkpoint**: Frontend and backend connected

---

## 🧪 Test Your Deployment

```bash
# Test backend
curl https://[your-railway-url].up.railway.app/health
curl https://[your-railway-url].up.railway.app/api/todos

# Test frontend
# Open: https://[your-vercel-url].vercel.app
# Try creating a todo
```

---

## 📝 Update README

```bash
cd /home/node/.openclaw/team-workspace

# Edit README.md - Update the "Live Demo" section:
# - Frontend: https://your-app.vercel.app
# - Backend API: https://your-backend.up.railway.app
# - Repository: https://github.com/username/todo-app-production

git add README.md
git commit -m "docs: Add live deployment URLs"
git push origin main
```

---

## 🎉 You're Done!

✅ GitHub repo: Live  
✅ Backend: Deployed on Railway with PostgreSQL  
✅ Frontend: Deployed on Vercel  
✅ API connected: Frontend ↔ Backend  
✅ Database: PostgreSQL configured  

---

## 📊 Your Deployment URLs

Fill in after deployment:

```
GitHub:   https://github.com/[username]/todo-app-production
Frontend: https://[project].vercel.app
Backend:  https://[project].up.railway.app
API Docs: https://[project].up.railway.app/
```

---

## 🆘 Troubleshooting

### "CORS Error" in browser console
→ Check `CORS_ORIGIN` in Railway matches Vercel URL exactly

### "Network Error" when creating todo
→ Check `VITE_API_BASE_URL` in Vercel env vars

### Backend won't start
→ Check Railway logs for errors  
→ Verify PostgreSQL is provisioned

### Database connection error
→ Railway should auto-inject `DATABASE_URL`  
→ Check Variables tab in Railway

---

## 💡 Pro Tips

- **Railway**: Free $5/month credit (plenty for hobby projects)
- **Vercel**: Free 100GB bandwidth/month
- **Logs**: Check Railway & Vercel dashboards for debugging
- **Custom Domain**: Add in Vercel/Railway settings (optional)

---

## 📚 Full Documentation

For detailed explanations:
- **DEPLOYMENT.md** - Complete deployment guide
- **POSTGRES_MIGRATION.md** - Database migration details
- **DEVOPS_SUMMARY.md** - DevOps overview and blockers

---

**Happy deploying! 🚀**

Need help? Check the docs above or Railway/Vercel support.
