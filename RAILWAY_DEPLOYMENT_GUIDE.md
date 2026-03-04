# 🚂 Railway Deployment Guide - Todo App Backend

## Overview
This guide walks you through deploying the Node.js/Express Todo App backend to Railway with PostgreSQL database.

**GitHub Repository:** https://github.com/marcusvj21/todo-app  
**Frontend URL:** https://todo-app-frontend-marcus-projects-249ca51a.vercel.app

---

## Prerequisites
- Railway account (sign up at https://railway.app)
- GitHub account connected to Railway
- The backend code has been migrated to PostgreSQL ✅

---

## Step 1: Create New Railway Project

1. Go to https://railway.app and log in
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway to access your GitHub account if not already done
5. Select the repository: **`marcusvj21/todo-app`**
6. Railway will detect the backend automatically

---

## Step 2: Configure Root Directory

Since your repo has both `frontend/` and `backend/` folders:

1. After selecting the repo, Railway will create a service
2. Click on the service settings (gear icon)
3. Under **"Build"** section, set:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

---

## Step 3: Add PostgreSQL Database

1. In your Railway project dashboard, click **"New"** → **"Database"** → **"Add PostgreSQL"**
2. Railway will automatically provision a PostgreSQL database
3. The database will be created in the same project
4. Railway automatically generates connection credentials

---

## Step 4: Configure Environment Variables

1. Click on your backend service
2. Go to the **"Variables"** tab
3. Add the following environment variables:

### Required Variables:

```bash
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://todo-app-frontend-marcus-projects-249ca51a.vercel.app
```

### Database Connection:

Railway automatically creates a `DATABASE_URL` variable when you add PostgreSQL to the project. 

**Verify it exists:**
- Look for `DATABASE_URL` in the Variables tab
- It should look like: `postgresql://postgres:password@host:5432/railway`

**If it doesn't exist automatically:**
1. Click on the PostgreSQL service
2. Go to the **"Connect"** tab
3. Copy the **"Postgres Connection URL"**
4. Go back to your backend service → Variables
5. Add manually:
   ```
   DATABASE_URL=postgresql://postgres:xxxxx@containers-us-west-xxx.railway.app:5432/railway
   ```

---

## Step 5: Deploy

1. Railway will automatically deploy after detecting changes
2. If not, click **"Deploy"** button in your service
3. Watch the deployment logs in the **"Deployments"** tab
4. Deployment typically takes 2-5 minutes

### Build Process:
```
→ Installing dependencies (npm install)
→ Building TypeScript (npm run build)
→ Starting server (npm start)
→ Server running on port 3000
```

---

## Step 6: Get Your Backend URL

1. After successful deployment, go to your backend service
2. Click on the **"Settings"** tab
3. Scroll to **"Domains"** section
4. Railway auto-generates a domain like:
   ```
   https://your-app-name.up.railway.app
   ```
5. **Copy this URL** - you'll need it for the frontend

---

## Step 7: Verify Deployment

Test your backend endpoints:

### Health Check:
```bash
curl https://your-app-name.up.railway.app/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-03-04T13:00:00.000Z",
  "uptime": 123.456
}
```

### Root Endpoint:
```bash
curl https://your-app-name.up.railway.app/
```

Expected response:
```json
{
  "message": "Todo API Server",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "todos": "/api/todos"
  }
}
```

### Test Todos API:
```bash
# Create a todo
curl -X POST https://your-app-name.up.railway.app/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Todo", "description": "Testing Railway deployment"}'

# Get all todos
curl https://your-app-name.up.railway.app/api/todos
```

---

## Step 8: Update Frontend Configuration

Your frontend is already deployed to Vercel, but it needs the new backend URL.

1. Go to your frontend project on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Update or add:
   ```
   VITE_API_URL=https://your-app-name.up.railway.app
   ```
4. Redeploy the frontend for changes to take effect

**Alternative (if API URL is hardcoded):**
Update `frontend/src/config.ts` or wherever the API URL is defined:
```typescript
export const API_URL = 'https://your-app-name.up.railway.app';
```
Then commit and push to trigger Vercel redeployment.

---

## Complete API Endpoints

Your backend now provides these endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/` | API info |
| GET | `/api/todos` | Get all todos |
| GET | `/api/todos?completed=true` | Filter by completion |
| GET | `/api/todos/:id` | Get specific todo |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/:id` | Update todo |
| PATCH | `/api/todos/:id/toggle` | Toggle completion |
| DELETE | `/api/todos/:id` | Delete todo |

---

## Troubleshooting

### Common Issues:

**1. Build Fails - TypeScript Errors**
- Check deployment logs in Railway
- Ensure all TypeScript dependencies are in `package.json`
- Verify `tsconfig.json` is present

**2. Database Connection Fails**
- Verify `DATABASE_URL` environment variable exists
- Check PostgreSQL service is running in Railway
- Ensure `pg` package is installed (check `package.json`)

**3. CORS Errors from Frontend**
- Verify `CORS_ORIGIN` matches your Vercel URL exactly
- Check the Railway logs for CORS-related errors
- Frontend URL should be: `https://todo-app-frontend-marcus-projects-249ca51a.vercel.app`

**4. App Crashes After Deploy**
- Check Railway logs for error messages
- Ensure `PORT` is set to `3000` (or use `process.env.PORT`)
- Verify database initialization runs successfully

**5. Database Tables Not Created**
- The app automatically creates tables on first run
- Check logs for "Todos table created successfully"
- If needed, access Railway PostgreSQL console and run migrations manually

### View Logs:
1. Go to your backend service in Railway
2. Click on **"Deployments"** tab
3. Select the latest deployment
4. Click **"View Logs"** to see real-time output

### Database Console Access:
1. Click on PostgreSQL service
2. Go to **"Data"** tab
3. You can run SQL queries directly:
   ```sql
   SELECT * FROM todos;
   ```

---

## Cost & Limits

**Railway Free Tier:**
- $5 free credit per month
- ~500 hours of runtime
- Perfect for development and small apps

**Tips to optimize usage:**
- Railway auto-sleeps services after inactivity (saves credits)
- Monitor usage in Railway dashboard
- Upgrade to Hobby plan ($5/month) for production use

---

## Monitoring & Maintenance

### View Metrics:
1. Click on your backend service
2. Go to **"Metrics"** tab
3. Monitor:
   - CPU usage
   - Memory usage
   - Network traffic
   - Request count

### Database Backups:
Railway Pro/Team plans include automated backups. For free tier:
- Use Railway's PostgreSQL plugin to export data
- Consider periodic manual backups via pg_dump

---

## Environment Variables Reference

### Complete list of variables needed:

```bash
# App Configuration
NODE_ENV=production
PORT=3000

# Database (auto-generated by Railway)
DATABASE_URL=postgresql://postgres:password@host:5432/railway

# CORS Configuration
CORS_ORIGIN=https://todo-app-frontend-marcus-projects-249ca51a.vercel.app
```

---

## Next Steps

✅ Backend deployed to Railway  
✅ PostgreSQL database provisioned  
✅ Environment variables configured  
✅ CORS enabled for frontend  

**TODO:**
1. Update frontend with new backend URL
2. Test full application flow
3. Monitor Railway deployment logs
4. Set up custom domain (optional)

---

## Custom Domain (Optional)

To use a custom domain:

1. In Railway service settings, go to **"Domains"**
2. Click **"Add Custom Domain"**
3. Enter your domain (e.g., `api.yourdomain.com`)
4. Add the CNAME record to your DNS provider:
   ```
   CNAME api.yourdomain.com → your-app.up.railway.app
   ```
5. Wait for DNS propagation (5-30 minutes)
6. Update `CORS_ORIGIN` if needed

---

## Support Resources

- **Railway Docs:** https://docs.railway.app
- **Railway Discord:** https://discord.gg/railway
- **Railway Status:** https://status.railway.app
- **PostgreSQL Docs:** https://www.postgresql.org/docs/

---

## Summary

Your Todo App backend is now configured for Railway deployment with:
- ✅ PostgreSQL database integration
- ✅ Full REST API with CRUD operations
- ✅ CORS configured for Vercel frontend
- ✅ Environment variables ready
- ✅ TypeScript build pipeline
- ✅ Health check endpoints

**The code is ready - just follow the Railway setup steps above!**

---

**Questions?** Check the Railway logs or refer to the troubleshooting section above.

**Good luck with your deployment! 🚀**
