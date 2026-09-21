# eSpring quote website

Complete static website based on https://espring-water.netlify.app/ with the original page sections, installation selection, preferred-contact selection, and quote summary. Includes the flyer plus its above/below installation images displayed using CSS image windows (no altered product artwork).

## Publish on GitHub Pages

1. Extract this ZIP on your computer.
2. Upload the extracted files into the root of your GitHub repository. Upload the files, not the ZIP, and keep index.html at the root.
3. In repository Settings → Pages, choose Deploy from a branch, select main and /(root), then Save.
4. Once GitHub finishes publishing, use the website link shown in Pages.

No build command, packages, API key, server or Netlify Forms subscription is required. You can open index.html locally to preview the design, but email submission requires the published HTTP/HTTPS website. Fonts are loaded from Google Fonts with local fallbacks.

## IMPORTANT: activate email delivery once

Email submission uses FormSubmit (https://formsubmit.co/). No customer email app is needed.

1. Upload the files to GitHub Pages and open your live website.
2. Send a test enquiry using your own contact details and the Email button.
3. Check gpsunited@outlook.com.au, including Junk/Spam, for a FormSubmit confirmation email and click its activation link.
4. Return to the live website, submit a second test and confirm that the full enquiry arrives in your inbox. Do not assume the initial activation test was delivered.
5. Complete this setup before sharing the site with customers. A changed domain or email destination may require activation again.

Only the mailbox owner can complete the activation. This ZIP does not mean your mailbox is already activated. Live delivery has not been verified. The form handles successful, failed, activation-required and timed-out requests; a thank-you message appears only after the service reports success. Service acceptance cannot guarantee inbox delivery, so verify receipt during setup.

## Quote delivery

- Email: gpsunited@outlook.com.au, matching the supplied flyer. The reference page had inconsistent .com/.com.au addresses; this version uses .com.au consistently.
- WhatsApp: +61 424 407 607. The business number must have an active WhatsApp account; account availability has not been verified.
- Full name, email, phone and subject are required. Comment is optional, as on the reference site.
- Email submits directly through FormSubmit and shows: “Thank you for submitting your enquiry. We’ll contact you shortly.” Customers remain on the website.
- WhatsApp continues to open a prepared message; customers must press Send in WhatsApp. A fallback link appears after validation. WhatsApp requires the app or WhatsApp Web sign-in.
- FormSubmit receives the customer's details to process email delivery. The website has no enquiry database. FormSubmit documents a 30-day submissions archive: https://formsubmit.co/documentation.
- Duplicate clicks are blocked while email is sending. Failed requests retain the entered details. A timeout cannot rule out service receipt; retrying may produce a duplicate.
- This AJAX form uses a hidden honeypot with CAPTCHA disabled to keep the flow on the page; it does not provide robust bot protection. Provider spam filtering or limits can affect delivery.
- The preferred reply method (Email or Call) is separate from the app used to send the request.

To change the destinations, edit BUSINESS_EMAIL and WHATSAPP_NUMBER in script.js and the contact information in index.html. The embedded flyer must be updated separately if its printed details change.

## Content and files

index.html, styles.css, script.js and espring-flyer.jpeg are the required website files. .nojekyll disables Jekyll processing on GitHub Pages. Keep all relative paths intact for repository subfolder hosting.

Product claims and guarantee wording are retained from the supplied flyer/reference site; review accuracy and applicable guarantee conditions before public advertising. The original Netlify backend and tracking script are intentionally not included: Email/WhatsApp replaces that provider-specific submission flow for GitHub Pages compatibility.
