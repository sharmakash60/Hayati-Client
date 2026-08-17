# Production Deployment & Operations Runbook (PROMPT 18)

**Application**: Hayati Next-Gen Functional Hydration Platform  
**Target Tier**: Edge Serverless / Next.js 15 App Router  

---

## 1. Environment Configuration

Copy `.env.example` to your production hosting environment secrets manager:

```bash
# Core Domain Configuration
NEXT_PUBLIC_SITE_URL="https://hayati-beverages.com"
NODE_ENV="production"

# Email Service Provider (ESP) Secrets
# (If omitted, system automatically falls back to secure internal logging)
RESEND_API_KEY=""
RESEND_AUDIENCE_ID=""

# Optional Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=""
```

> [!IMPORTANT]
> Never commit live API keys or production secrets to Git. Secret keys are injected at deploy time via your hosting environment settings (e.g., Vercel Project Settings > Environment Variables).

---

## 2. Deployment Instructions

### Vercel (Recommended)
1. Push your repository to GitHub / GitLab / Bitbucket.
2. In the Vercel Dashboard, select **Add New Project** $\rightarrow$ Import Repository.
3. Framework Preset: **Next.js** (auto-detected).
4. Root Directory: `./`
5. Build Command: `npm run build`
6. Output Directory: `.next` (auto-configured).
7. Configure production environment variables in project settings.
8. Click **Deploy**.

---

## 3. Instant Rollback Procedure

If any runtime regression occurs in production:
1. Navigate to **Vercel Dashboard $\rightarrow$ Deployments**.
2. Locate the previous known-good deployment commit hash or tag.
3. Click the three dots menu ($\cdots$) $\rightarrow$ **Instant Rollback (Promote to Production)**.
4. Traffic is rerouted to the previous immutable build artifact within $< 5$ seconds with zero downtime.
