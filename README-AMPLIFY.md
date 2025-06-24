# AWS Amplify Deployment Guide for JuiceCraft

## Prerequisites
1. AWS account with Amplify access
2. GitHub repository containing this code
3. Separate backend API deployment (Vercel, Heroku, or AWS Lambda)

## Deployment Steps

### 1. Frontend Deployment (Amplify Hosting)
1. Connect your GitHub repository to AWS Amplify
2. Use the provided `amplify.yml` build configuration
3. Set build command: `npm run build`
4. Set publish directory: `dist/public`

### 2. Backend API Deployment
Since Amplify hosting is for static sites, deploy your backend separately:

**Option A: Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy backend
vercel --prod
```

**Option B: Heroku**
```bash
# Install Heroku CLI and login
heroku create your-juicecraft-api
git push heroku main
```

**Option C: AWS Lambda + API Gateway**
Use AWS SAM or Serverless Framework to deploy the Express app as Lambda functions.

### 3. Environment Variables
Set these environment variables in Amplify Console:
- `VITE_API_URL`: Your backend API URL
- `NODE_ENV`: production

### 4. Database Setup
- Use AWS RDS PostgreSQL or Neon.tech for the database
- Run migrations: `npm run db:push`
- Update `DATABASE_URL` in your backend deployment

### 5. Update API URLs
1. Update `_redirects` file with your actual backend URL
2. Replace placeholder URLs in the redirect configuration

## Architecture Overview
- **Frontend**: React SPA hosted on AWS Amplify
- **Backend**: Node.js Express API (deployed separately)
- **Database**: PostgreSQL (AWS RDS or Neon.tech)
- **File Storage**: Static assets served from Amplify

## Important Notes
- This is a full-stack application that requires both frontend and backend deployments
- The backend handles API requests, database operations, and email notifications
- The frontend is a static React application that communicates with the backend API
- Session-based cart storage requires the backend to be running

## Post-Deployment Checklist
- [ ] Frontend loads correctly on Amplify URL
- [ ] API endpoints are accessible from frontend
- [ ] Database connections work
- [ ] Cart functionality operates properly
- [ ] Order placement and email notifications function
- [ ] All environment variables are configured