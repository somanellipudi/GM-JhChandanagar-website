# Jawed Habib Chandanagar — Website Deployment Guide

## Files Included
- `index.html` — Main website (hero carousel, services, offer, packages, appointment, reviews)
- `menu.html` — Full menu & pricing page (QR code links here)
- `images/` — Logo files and offer image (embedded as base64 in HTML, but also included separately)

## Hosting on GCP Cloud Storage (Static Website)

### Step 1: Create a bucket
```bash
# Bucket name must match your domain
gsutil mb -p YOUR_PROJECT_ID -l asia-south1 gs://jhchandanagar.growingmonk.com
```

### Step 2: Configure for static website hosting
```bash
gsutil web set -m index.html -e 404.html gs://jhchandanagar.growingmonk.com
```

### Step 3: Upload files
```bash
gsutil -m cp index.html gs://jhchandanagar.growingmonk.com/
gsutil -m cp menu.html gs://jhchandanagar.growingmonk.com/
gsutil -m cp -r images/ gs://jhchandanagar.growingmonk.com/images/
```

### Step 4: Make bucket public
```bash
gsutil iam ch allUsers:objectViewer gs://jhchandanagar.growingmonk.com
```

### Step 5: DNS Setup for jhchandanagar.growingmonk.com
In your DNS provider (where growingmonk.com is managed), add a CNAME record:
```
Type: CNAME
Name: jhchandanagar
Value: c.storage.googleapis.com.
TTL: 3600
```

### Step 6: SSL (Recommended)
GCP Cloud Storage doesn't natively support HTTPS with custom domains.
For HTTPS, use one of:

**Option A — Cloud CDN + Load Balancer (Recommended)**
1. Create a backend bucket pointing to your GCS bucket
2. Create a URL map and HTTPS proxy
3. Provision a managed SSL certificate for jhchandanagar.growingmonk.com
4. Create a forwarding rule

**Option B — Cloudflare (Easier)**
1. Point growingmonk.com nameservers to Cloudflare
2. Add CNAME record: jhchandanagar → c.storage.googleapis.com
3. Enable Cloudflare SSL (Flexible or Full)
4. Enable caching for performance

**Option C — Firebase Hosting (Simplest)**
```bash
npm install -g firebase-tools
firebase init hosting
# Select your project, set public dir to current folder
firebase deploy
# Then add custom domain in Firebase Console
```

## Alternative: Deploy via Firebase (Recommended for simplicity)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting
# Choose: existing project or create new
# Public directory: . (current directory)
# Single-page app: No
# Auto builds: No

# Deploy
firebase deploy --only hosting

# Add custom domain
# Go to Firebase Console → Hosting → Add custom domain
# Enter: jhchandanagar.growingmonk.com
# Add the DNS records it provides
```

Firebase gives you free SSL, CDN, and custom domain — easiest path.

## Post-Deployment Checklist
- [ ] Verify index.html loads at jhchandanagar.growingmonk.com
- [ ] Verify menu.html loads at jhchandanagar.growingmonk.com/menu.html
- [ ] Test WhatsApp links on mobile
- [ ] Test appointment form submission
- [ ] Print QR code from menu page for counter display
- [ ] Test on iPhone Safari and Android Chrome
- [ ] Submit sitemap to Google Search Console
- [ ] Verify JSON-LD structured data in Google Rich Results Test
- [ ] Update Google Business Profile with new website URL

## SEO Notes
- JSON-LD BeautySalon schema is embedded in index.html
- Meta tags optimized for local Chandanagar/Hyderabad searches
- Canonical URLs set to jhchandanagar.growingmonk.com
- Mobile-first responsive design (Google's ranking factor)
- Target keywords: "best salon Chandanagar", "hair spa Miyapur", "bridal makeup Hyderabad west"
