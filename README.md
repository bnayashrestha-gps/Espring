# eSpring quote website

Complete static website based on https://espring-water.netlify.app/ with the original page sections, installation selection, preferred-contact selection, and quote summary. Includes the flyer plus its above/below installation images displayed using CSS image windows (no altered product artwork).

## Publish on GitHub Pages

1. Extract this ZIP on your computer.
2. Upload the extracted files into the root of your GitHub repository. Upload the files, not the ZIP, and keep index.html at the root.
3. In repository Settings → Pages, choose Deploy from a branch, select main and /(root), then Save.
4. Once GitHub finishes publishing, use the website link shown in Pages.

No build command, packages, API key, server or Netlify Forms subscription is required. You can also open index.html locally to preview it. Fonts are loaded from Google Fonts with local fallbacks.

## Quote delivery

- Email: gpsunited@outlook.com.au, matching the supplied flyer. The reference page had inconsistent .com/.com.au addresses; this version uses .com.au consistently.
- WhatsApp: +61 424 407 607. The business number must have an active WhatsApp account; account availability has not been verified.
- Full name, email, phone and subject are required. Comment is optional, as on the reference site.
- Customers choose Email or WhatsApp to open a prepared message, then press Send in that app. No message is sent automatically and no form data is stored on the website.
- Email requires a configured mail app or mailto handler. WhatsApp requires the app or WhatsApp Web sign-in. A fallback link appears after validation.
- The preferred reply method (Email or Call) is separate from the app used to send the request.

To change the destinations, edit BUSINESS_EMAIL and WHATSAPP_NUMBER in script.js and the contact information in index.html. The embedded flyer must be updated separately if its printed details change.

## Content and files

index.html, styles.css, script.js and espring-flyer.jpeg are the required website files. .nojekyll disables Jekyll processing on GitHub Pages. Keep all relative paths intact for repository subfolder hosting.

Product claims and guarantee wording are retained from the supplied flyer/reference site; review accuracy and applicable guarantee conditions before public advertising. The original Netlify backend and tracking script are intentionally not included: Email/WhatsApp replaces that provider-specific submission flow for GitHub Pages compatibility.
