# All Star Productions — website

Bilingual (English / Arabic, right-to-left) marketing site with a quote form, a
card payment page (Moyasar) and the legal pages. Next.js 16, Tailwind 4, shadcn/ui.

## Run it

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Before going live

1. **Business details** — replace every `[bracketed]` value in `lib/site.ts`
   (legal name, CR, VAT number, address, phone, WhatsApp, emails).
2. **Legal pages** — `content/legal.ts` holds draft templates written around Saudi
   law. Have a lawyer review them; the refund stages and retention periods must
   match how the business really operates.
3. **Copy** — `content/en.ts` and `content/ar.ts`. Check the service lists describe
   what you actually offer, and have a native speaker review the Arabic,
   including the Arabic trade name in `lib/site.ts`.
4. **Environment variables** — copy `.env.example` to `.env.local` (or set them on
   the host):
   - `FORMS_WEBHOOK_URL` — where quote and data requests are sent. Without it,
     production forms show an error asking visitors to contact you directly.
   - `MOYASAR_SECRET_KEY` — enables the Pay invoice page. Start with the
     `sk_test_…` key. Without it the page says online payment is not enabled.
   - `SITE_URL` — the public address, used for payment return links.
5. **Photos** — the site uses original line illustrations only. Add real project
   photos you own (with alt text) when you have them.

## How payment works

`/pay` takes a quote or invoice reference and an amount, the server creates a
Moyasar invoice and redirects the customer to Moyasar's hosted page. Card details
never touch this site. On return, `/pay/result` asks Moyasar for the invoice
status server-side, so the result cannot be faked from the URL. There is no
webhook yet: reconcile payments in the Moyasar dashboard.

## Compliance checklist

| # | Item | Where |
|---|------|-------|
| 1–4 | Privacy, terms, refund, cookie policies | `/privacy`, `/terms`, `/refund-policy`, `/cookies` (drafts) |
| 5 | Cookie consent banner | `components/site/cookie-consent.tsx`; reopen from the footer |
| 6 | Form consents | Unticked required consent on the quote form; separate optional marketing opt-in |
| 7 | No unnecessary data | Only name, email, service and message are required |
| 8 | Third-party SDKs | None loaded in the browser. Fonts are self-hosted. Moyasar is called server-side only |
| 9 | No dark patterns | Accept and reject buttons are identical; nothing pre-ticked |
| 10 | No hidden fees | Pricing section, terms and pay page state that nothing is added to the quote |
| 11 | No fake reviews | The site has no testimonials. Add only real, attributable ones |
| 12 | No unsupported claims | No client logos, statistics or awards. Add only what you can evidence |
| 13 | Alt text | Illustrations carry localized labels; decorative graphics are hidden from screen readers |
| 14 | Colour contrast | Body and muted text meet WCAG AA on both the dark and the light sections |
| 15 | Keyboard navigation | Skip link, visible focus rings, arrow-key tabs, focus moved to the form error summary |
| 16 | Business details | Footer and contact page, from `lib/site.ts` (placeholders until filled) |
| 17 | Children's data | Site is not directed at under-18s; stated in the privacy policy |
| 18 | Unsubscribe link | The site sends no email. Any marketing email you send must carry one; `/data-request` also offers "stop marketing emails" |
| 19 | Fonts and images | SIL Open Font License typefaces; illustrations drawn for this site |
| 20 | Data deletion request | `/data-request` |
