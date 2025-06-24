# JuiceCraft - AWS Amplify Deployment Guide

## Quick Start
Your JuiceCraft application is now ready for AWS Amplify deployment with the following configuration:

### Files Created:
- `amplify.yml` - Build configuration for Amplify
- `_redirects` - SPA routing configuration  
- `client/public/_redirects` - Frontend routing rules
- `.env.example` - Environment variable template
- `client/.env.example` - Frontend environment variables

## Deployment Steps:

### 1. Frontend Deployment (AWS Amplify)
1. Push your code to GitHub
2. Connect repository to AWS Amplify Console
3. Amplify will automatically detect the `amplify.yml` configuration
4. Set environment variables in Amplify Console:
   - `VITE_API_URL` = your backend API URL

### 2. Backend Deployment Options:

**Option A: Vercel (Recommended)**
- Install Vercel CLI: `npm i -g vercel`
- Deploy: `vercel --prod`
- Configure environment variables in Vercel dashboard

**Option B: Heroku**
- Create Heroku app: `heroku create juicecraft-api`
- Deploy: `git push heroku main`
- Set environment variables with `heroku config:set`

**Option C: AWS Lambda**
- Use Serverless Framework or AWS SAM
- Deploy Express app as Lambda functions

### 3. Database Setup:
- Use Neon.tech (recommended) or AWS RDS PostgreSQL
- Run migrations: `npm run db:push`
- Update `DATABASE_URL` in backend deployment

### 4. Environment Variables:
**Backend:**
- `DATABASE_URL` - PostgreSQL connection string
- `EMAIL_USER` - Gmail address for notifications
- `EMAIL_PASS` - Gmail app password
- `NOTIFICATION_EMAIL` - Order notification recipient

**Frontend (Amplify):**
- `VITE_API_URL` - Backend API base URL

## Production Checklist:
- [ ] Code pushed to GitHub
- [ ] Frontend deployed to Amplify
- [ ] Backend deployed to chosen platform
- [ ] Database configured and migrated
- [ ] Environment variables set in both deployments
- [ ] API URLs updated in redirect configuration
- [ ] Test order flow end-to-end

## Architecture:
- **Frontend**: React SPA on AWS Amplify
- **Backend**: Node.js Express API (separate deployment)
- **Database**: PostgreSQL (Neon/RDS)
- **Features**: Session-based cart, email notifications, responsive design

Your application is now production-ready with proper build optimization, environment configuration, and deployment instructions.