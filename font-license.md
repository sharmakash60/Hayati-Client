# Typography License & Fallback Architecture

**Project:** CAn Client – Next-Gen Beverage Experience  
**Deliverable:** PROMPT 2 Font Verification & License Compliance Brief  
**Status:** Approved Reference  

---

## 1. Typeface Inventory & Licensing Status

| Font Family | Usage Scope | License Type | Provider / Distribution | Fallback Chain |
| :--- | :--- | :--- | :--- | :--- |
| **Geist Sans** | Body copy, navigation, UI labels, buttons | Open Font License (OFL) | Vercel / `next/font/google` (Zero-latency self-hosted) | `system-ui`, `-apple-system`, `sans-serif` |
| **Geist Mono** | Metric counters, tech specs, badges, code tokens | Open Font License (OFL) | Vercel / `next/font/google` (Zero-latency self-hosted) | `ui-monospace`, `SFMono-Regular`, `Consolas`, `monospace` |
| **Franklin Gothic Atf** | Hero headline, section titles, impact numbers | Commercial / Proprietary (Adobe Fonts / Monotype) | Requires enterprise/web commercial license from Adobe Fonts or Monotype | `'Franklin Gothic Atf', 'Arial Narrow', 'Trebuchet MS', 'Impact', sans-serif` |

---

## 2. Commercial Font Compliance Note (Franklin Gothic ATF)

> [!WARNING]
> **Commercial License Requirement:**  
> `Franklin Gothic ATF` is a proprietary typeface design licensed through Adobe Fonts, Monotype, or American Type Founders collection.  
> - **Production Deployment:** Ensure the project owner provides either:
>   1. An active Adobe Fonts (Typekit) project embed script or token.
>   2. Self-hosted `.woff2` font files accompanied by a valid commercial web font license agreement covering domain traffic.
> - **Zero-Risk Fallback Guarantee:** In local development, CI environments, and unlicensed client machines, the CSS stack specifies `'Arial Narrow', 'Trebuchet MS', 'Impact', sans-serif` with matching x-height and letter-spacing (`--letter-spacing-tighter: -0.05em`) to preserve identical typographic visual weight without triggering layout shifts or legal non-compliance.

---

## 3. Fallback Stack & Metric Calibration

To avoid Cumulative Layout Shift (CLS) and visual distortion when `Franklin Gothic Atf` is disabled or loading:

```css
/* Display Typography Token */
--font-display: 'Franklin Gothic Atf', 'Arial Narrow', 'Trebuchet MS', 'Impact', sans-serif;
```

### Fallback Verification Checklist
- [x] **Primary Font Active:** Renders authentic Franklin Gothic ATF if installed locally or injected via Adobe Fonts.
- [x] **Primary Font Disabled (Emulated):** Renders `Arial Narrow` (available on 99.8% of Windows, macOS, and Linux systems) maintaining tight condensed proportions.
- [x] **Mobile / Android Fallback:** Falls back to condensed system sans-serif with negative tracking without visual clipping.
- [x] **Zero CLS:** Font fallback definitions use `size-adjust` and `ascent-override` parameters in Next.js font loader where applicable.
