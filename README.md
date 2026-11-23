# Malik Store

A plain HTML, CSS and JavaScript reconstruction of the supplied Malik Store recording and source snippets.

## Open and edit
Extract the complete archive and open `index.html`. No dependencies or build step are required. `style.css` is the complete shared stylesheet, and `script.js` contains the interactions. All photographs and the logo are bundled in `assets/images/`, so page styling and imagery do not depend on live image URLs.

Upload the contents of this directory to the repository root: HTML files, style.css, script.js and the assets directory together. Use a fresh local extraction folder to avoid mixing in older versions. Uploading to an existing repository will not automatically remove its older files.

## Pages
- `index.html`: home, sticky teal navigation, light/dark switch, full-width Shop Now, contact form and footer.
- `lec1.html`: home compatibility filename used in the recording.
- `About.html`: the three-product/cart screen shown at this filename in the recording, followed by the About section from the supplied HTML.
- `Shop.html`: standalone three-product/cart screen.
- `Products.html`: four original product cards, prices, search and inquiry dialog.
- `gallery.html`: the five images visible in the recording, hover captions and image preview.
- `Contact.html`: contact cards and working local demo form with Auto Fill Demo.
- `Privacy & Pollicy.html`: the forest/contact-form screen visible at this filename in the recording, followed by privacy information describing this demo accurately.

The additional About and policy content is retained below the recorded screens to preserve content from the supplied HTML. The source recording had inconsistent page titles/routes; these are documented rather than silently losing the shown pages.

## Behaviors
Theme preference and demo cart persist in localStorage when the browser permits it. Product search is case-insensitive. The cart supports adding, removing and clearing quantities. Gallery images open in a keyboard-dismissable dialog. Forms validate required fields and email format, then show an honest local demo confirmation. The floating green button opens contact options. Back-to-top supports reduced-motion preferences.

## Limits
No email backend, real orders, payment processing or actual chat/WhatsApp service is connected. Contact details and statistics are reproduced from supplied material, not independently verified business claims. Some product photos visibly do not match their product names in the original video; they are preserved for visual fidelity. Logo and product/contact card photos are recovered video crops and therefore limited in resolution. The layout is reconstructed, not a recovery of the deleted original source. Exact pixel equality is not verified.

## Validation
JavaScript syntax and DOM-based interaction checks passed across all eight HTML files. Checks cover CSS application, theme, cart add/remove/clear, search/no-results, gallery dialog, inquiry link, form demo confirmation, auto-fill and contact panel. Dialog APIs were simulated in the DOM test environment; full browser visual/interaction verification was blocked by the available execution/browser environment.
All local HTML/CSS asset paths and image decodes are checked before packing. The finished ZIP is checked for Dockerfile absence.
