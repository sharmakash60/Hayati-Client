# Asset Manifest, Categorization & Pipeline Report (PROMPT 20)

**Project**: Hayati Functional Hydration Experience (`hayatiworld.com`)  
**Source Directory**: `K:\CAn client\HAYATI_IMAGES`  
**Public Pipeline Path**: `/media/products/`  
**Manifest Reference**: [`asset-manifest.json`](file:///k:/CAn%20client/asset-manifest.json)  
**Status**: ✅ 20/20 Images Categorized & Ingested into Pipeline

---

## 1. Asset Categorization Matrix

| Collection Line | Total Files | Format | Target UI Usage | Isolation Status |
|---|---|---|---|---|
| **Alder Series** (Apple, Lime, Pineapple, Raspberry, Peach) | 5 | Clean Cutout (`.webp`) | Variant Scroller, PDP, Quick-Add Drawer | ✅ Ready (Clean transparent cutouts) |
| **HOPP Series** (Ginger Lime, Lemon Mint, Strawberry, Wild Berry) | 4 | Clean Cutout (`.webp`) | Variant Scroller, PDP, Quick-Add Drawer | ✅ Ready (Clean transparent cutouts) |
| **Signature Botanicals** (Blue Lagoon, Green Mint, Hazelnut, Passion Fruit, Strawberry) | 5 | Clean Cutout (`.webp`) | Variant Scroller, PDP, Quick-Add Drawer | ✅ Ready (Clean transparent cutouts) |
| **Master Brand Flagship** (`HAYATI.webp`) | 1 | Clean Hero Can Cutout (`.webp`) | Hero kinetic visual, Brand showcase | ✅ Ready (High-res 240KB master visual) |
| **Fruit Splash Promo Line** (Grape Ape, Passion Plus, Water Lemon, Fruit Cocktail, Pomegranate) | 5 | Composite Promo Graphic (`.webp`) | Social Proof Grid, Lifestyle Banner | ⚠️ Needs background removal if used in transparent cards |

---

## 2. Background Isolation Task List (Fruit Splash Series)

The 5 Fruit Splash assets contain baked-in colored backgrounds and social post promotional copy:
1. `Grape_Ape.webp` (Purple background + splash effects)
2. `Passion_Plus.webp` (Orange background + fruit slice elements)
3. `Water_Lemon.webp` (Teal/Yellow background + water splash)
4. `fruit_cocktail.webp` (Red/Yellow gradient background)
5. `pomegranate.webp` (Crimson background + pomegranate seeds)

### Production Strategy:
- **Phase 1 (Immediate)**: Use these 5 promo graphics in a dedicated "Featured Drops / Lifestyle Social Proof Grid" where rich textured backgrounds shine.
- **Phase 2 (Isolation Task)**: Perform clean alpha-mask cutout on the cans for unified transparent card rendering in the variant scroller and individual PDP views.

---

## 3. Extracted Verbatim Badge & Claim Copy

Extracted directly from the real brand graphics for 100% authentic UI integration:
- `"20% fruit juice"`
- `"No Caffeine"`
- `"Enriched with Vitamin C"`
- `"Crisp Sparkling Taste"`
- `"Zero Sugar"`
- `"Probiotic Drink"`
- `"450mg Ionic Electrolytes"`
- `"100% Aluminum Closed-Loop"`

---

## 4. Formally Logged Asset Gaps

| Identified Gap | Impact | Mitigation Strategy / Client Deliverable |
|---|---|---|
| **Classic Soda Line** | 0 product images supplied | Render as a "Coming Soon / VIP Batch Reservation" collection tile in the catalog selector. |
| **Hero Looping MP4/WebM** | No video supplied (static images only) | Utilize `HAYATI.webp` with our choreographed GSAP floating parallax and ambient `--gradient-brand-1` glow; video loop can be dropped in when rendered. |
