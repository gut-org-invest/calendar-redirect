# Calendar Redirect

Cloudflare Worker that randomly redirects visitors to one of several agent calendar links. Use a single URL in customer emails instead of picking an agent manually.

## Setup

### 1. Configure calendar links

Edit `src/config.js` and replace the placeholder URLs with your agents' booking links.

### 2. Cloudflare API token

Create a token in the [Cloudflare dashboard](https://dash.cloudflare.com/profile/api-tokens) with:

- **Permissions:** Account → Workers Scripts → Edit
- **Account resources:** your account

### 3. GitHub secrets

In the repo settings, add:

| Secret | Value |
|--------|-------|
| `CLOUDFLARE_API_TOKEN` | API token from step 2 |
| `CLOUDFLARE_ACCOUNT_ID` | Found on the Cloudflare dashboard overview page (right sidebar) |

### 4. Deploy

Push to `main` — GitHub Actions deploys automatically.

You can also trigger a deploy manually from the **Actions** tab.

## Custom domain

After the first deploy:

1. Cloudflare dashboard → **Workers & Pages** → **calendar-redirect**
2. **Settings** → **Domains & Routes** → add a custom domain (e.g. `schedule.yourcompany.com`)

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
