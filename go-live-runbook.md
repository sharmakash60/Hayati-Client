# Hayati World — Production Go-Live Cutover Runbook
## Prompt 28 Deliverable · Zero-Downtime E-Commerce Cutover

> **Target Domain:** `hayatiworld.com`  
> **Architecture:** Hybrid (Next.js 15 App Router + Shopify Checkout Permalinks)  
> **Hosting Platform:** Vercel / Cloudflare Edge  
> **Commerce Engine:** Shopify Online Store (Backend & Hosted Checkout)

---

## 1. Pre-Cutover Verification Checklist (T - 24 Hours)

- [ ] **Catalog Parity:** All 17 active SKUs and prices (₹169, ₹189, ₹219) verified against Shopify Admin product records.
- [ ] **Edge Redirects Configured:** `next.config.mjs` contains 301 redirects for all legacy `/collections/*`, `/pages/*`, and `/policies/*` routes.
- [ ] **SEO & Structured Data:** `sitemap.xml` and `robots.txt` pointing to `https://hayatiworld.com`.
- [ ] **SSL / Custom Domain Readiness:** Vercel/Cloudflare project pre-configured with `hayatiworld.com` and `www.hayatiworld.com`.
- [ ] **Low-Traffic Window Selected:** Scheduled cutover during minimum traffic window (Recommended: 02:00 – 04:00 IST Tuesday/Wednesday).
- [ ] **Shopify App / API Channels Active:** Verify Buy Button / Cart Permalink channel is enabled in Shopify Admin.

---

## 2. Step-by-Step DNS Cutover Sequence (T - 0)

| Step | Action | Execution Details | Verification |
|---|---|---|---|
| **2.1** | **Lower TTL** | Reduce DNS TTL on Cloudflare/Route53/GoDaddy to `300 seconds` (5 mins) 4 hours prior. | `dig hayatiworld.com +trace` |
| **2.2** | **Update A / CNAME Records** | Point apex `@` A record to Vercel (`76.76.21.21`) and `www` CNAME to `cname.vercel-dns.com`. | Check DNS propagation via Whatsmydns |
| **2.3** | **Preserve Shopify Admin** | Keep `admin.shopify.com/store/hayatiworld` unchanged. Only front-facing DNS changes. | Access Shopify Admin backend |
| **2.4** | **Edge SSL Activation** | Auto-provision Let's Encrypt / Vercel Edge SSL cert for `hayatiworld.com`. | `curl -Iv https://hayatiworld.com` |
| **2.5** | **Edge 301 Test** | Curl 5 legacy paths to verify real HTTP 301 responses (see sample below). | Confirm `301 Moved Permanently` |

### Sample Edge 301 Curl Verification:
```bash
# Test mismatched collection handle redirect:
curl -I https://hayatiworld.com/collections/hopp-prebiotic-soda-copy
# Expected: HTTP/2 301 -> location: /#variants

# Test legacy Shopify policy URL redirect:
curl -I https://hayatiworld.com/policies/refund-policy
# Expected: HTTP/2 301 -> location: /refund-policy

# Test legacy nested product URL redirect:
curl -I https://hayatiworld.com/collections/alder/products/alder-apple
# Expected: HTTP/2 301 -> location: /products/alder-apple
```

---

## 3. Post-Cutover Functional Commerce QA (T + 15 Minutes)

Execute the live smoke test script:
1. **Homepage Load:** Verify preloader, hero animation, and smooth scroll.
2. **Collection Switcher:** Filter by Alder, HOPP, Signature, Fruit Splash.
3. **PDP Navigation:** Visit `/products/alder-apple`, test variant switcher (Prompt 10 GSAP swap animation).
4. **Cart Flow:** Click "Add to Cart" → Cart drawer slides in with item image, price, quantity selector.
5. **Checkout Handoff:** Click "Checkout via Shopify" → Confirm redirect lands on `https://hayatiworld.com/cart/{variant_id}:{qty}` with real items pre-populated in Shopify Checkout.
6. **Live Test Order:** Complete a ₹1 test transaction using a live gateway sandbox or discount coupon. Verify order appears in Shopify Orders dashboard.

---

## 4. Emergency Rollback Procedure

If a critical issue occurs (e.g. checkout permalink failure, broken rendering):

1. **Revert DNS A / CNAME:**
   - Change `@` A record back to Shopify IP: `23.227.38.65`
   - Change `www` CNAME back to `shops.myshopify.com`
2. **TTL Propagation:** Fast rollback due to pre-reduced 300s TTL.
3. **Customer Cart Preservation:** Because cart permalinks and Shopify cart cookies remain authoritative on Shopify's domain, zero active checkouts or in-flight orders are lost.
4. **Incident Post-Mortem:** Log failure reason in `staging-signoff.md` before re-attempting.

---

## 5. Post-Launch Actions (T + 24 Hours)

- Submit new `https://hayatiworld.com/sitemap.xml` to Google Search Console and Bing Webmaster Tools.
- Monitor 404 crawl errors in Search Console daily for the first 14 days.
- Restore DNS TTL to standard `86400 seconds` (24 hours).
