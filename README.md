# Calendar Redirect

Cloudflare Worker that randomly redirects visitors to one of several agent calendar links. Use a single URL in customer emails instead of picking an agent manually.

## Setup

### 1. Configure calendar links

Edit `src/config.js` and replace the placeholder URLs with your agents' booking links.

### 2. Connect GitHub via Cloudflare Workers Builds

Deploys are handled by the [Cloudflare Workers & Pages GitHub app](https://github.com/apps/cloudflare-workers-and-pages), not GitHub Actions.

1. In the [Cloudflare dashboard](https://dash.cloudflare.com), go to **Workers & Pages** → **Create application**
2. Select **Import a repository**
3. Connect your GitHub account and authorize access to the **gut-org-invest** org
4. Select **gut-org-invest/calendar-redirect**
5. Use these build settings:

| Setting | Value |
|---------|-------|
| Production branch | `main` |
| Build command | *(leave empty)* |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |

6. Click **Save and Deploy**

**Important:** The Worker name in Cloudflare must match `calendar-redirect` in `wrangler.jsonc`, or the build will fail.

### 3. Custom domain + TLS (infra-terraform)

`meet.bcause.com` is bound via a Worker **Custom Domain** in [`infra-terraform`](https://github.com/gut-org-invest/infra-terraform) (`cloudflare_worker_domain.meet_calendar_redirect`). Terraform provisions DNS and an edge TLS certificate — do not add routes for this hostname in `wrangler.jsonc`.

After the first worker deploy, apply infra-terraform to bind the custom domain and provision TLS.

### 4. Automatic deploys

Every push to `main` triggers a build and deploy. Other branches create preview versions (not promoted to production).

## Custom domain

Production hostname: **`meet.bcause.com`** (Worker Custom Domain + TLS in infra-terraform).

## Local development

```bash
npm install
npm run dev
```

## Endpoints

| Path | Behavior |
|------|----------|
| `/` | 302 redirect to a random calendar link |
| `/health` | Returns `ok` (for uptime checks) |
