# Shop Studio Stage 3 — Google Drive Library

1. Deploy all site files to the same GitHub Pages origin.
2. In Google Cloud create a project, enable Google Drive API, configure OAuth consent, and create an OAuth **Web application** client. Add your exact HTTPS GitHub Pages origin under Authorized JavaScript origins. Add test users if the OAuth app is in Testing mode.
3. In Document Scanner > Google Drive setup enter the OAuth Client ID.
4. Click Connect Google and select your Google account. The app creates `Shop Studio Documents` in that account.
5. Use Add PDF/images to import files from your device, or create subfolders, rename, move, trash, download, and view files. Switch account prompts Google's account chooser.

Security: OAuth uses `drive.file` scope, not unrestricted Drive scope. The app only manages files/folders it creates or that Google authorizes it to open. It does not browse unrelated Drive documents. Google login requires internet and browser popups. Browser account selection may be affected by Google session behavior. Access tokens stay in memory; refresh requires reauthentication.

Limitations: This release adds cloud library management and gallery imports, not full automatic camera edge recognition, OCR searchable multi-page PDF creation, or a replacement for all PDF reader/editor features. The previous camera capture, Windows scanner bridge, and PDF modules remain. Hardware, OAuth, and performance must be tested on your devices.
