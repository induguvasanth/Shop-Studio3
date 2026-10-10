# Shop Studio 2 — Clean Project

## Website
Deploy the files in this directory to GitHub Pages. Keep all versioned `app-v*.js` files: `index.html` loads them directly.

## Windows 10 document scanner
Supported scanner-capable devices: Canon G3010, Brother DCP-L2541DW, Brother DCP-L2520D. Epson L8050 is a printer only.

1. Install each scanner's Windows driver and verify scanning in Windows or NAPS2.
2. In `windows-scanner-bridge`, run `INSTALL-BRIDGE.cmd` as administrator (once).
3. Verify `http://127.0.0.1:17899/health` and `http://127.0.0.1:17899/scanners`.
4. Use the DOCUMENT SCANNER section. If needed, run `OPEN-LOCAL-SCANNER.bat` to launch the local app.

The bridge is local to your PC and must be running for scanning.

## Cleanup
Removed obsolete Python bridge/server alternatives, duplicate bridge backup, redundant launcher and historical setup notes. Retained active frontend modules, service worker, and bridge install/start/uninstall scripts. Hardware functionality must be verified on Windows 10.

## Camera and Google Drive extension

- Click **Camera** in Document Scanner to open a live camera preview (HTTPS or localhost, with browser camera permission). Capture a page, then apply existing crop, perspective, rotation and filters. Repeat for more pages. The camera modal uses a single live stream and stops tracks when closed.
- **Download** exports the currently displayed scanner canvas as PDF or JPG. **Save to Google Drive** uploads that current canvas (not the entire multi-page queue) to the Google account you authorize. The existing **Export PDF** action remains the multi-page workflow.
- Google Drive setup: create a Google Cloud project; enable Google Drive API; configure OAuth consent screen; create an OAuth 2.0 **Web application** client; add the exact hosted origin, e.g. `https://induguvasanth.github.io`, to **Authorized JavaScript origins**. Add permitted test users while the app is in Testing. Paste the Web Client ID into the Drive setup field. This uses the `drive.file` permission; it can upload files created by this app, not browse your whole Drive. Google login requires internet. Do not put a client secret in the website.
- The client ID is stored in this browser's localStorage. No OAuth access token is persisted. Existing Windows scanner bridge continues to be required for USB scanner hardware.
- Camera capture is not automatic edge-detection AI; perspective crop and filters are available through the existing scanner editor. OCR tools are also present elsewhere in the project. This update is not a full replacement for every dedicated PDF reader or mobile scanner feature.
