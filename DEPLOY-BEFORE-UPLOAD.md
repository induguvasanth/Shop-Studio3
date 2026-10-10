# Shop Studio 2 — Pre-deployment update

OAuth Web Client ID is preconfigured in camera-drive-studio.js (public client identifier only; no secret).

Fixes: Google Drive folder lookup uses pageSize; file listing uses supported name sort; cloud save requires connecting the document library so scans cannot accidentally be uploaded to Drive root; service-worker cache updated.

Deploy the CONTENTS of Shop-Studio2-main to the GitHub Pages publishing root (not an extra nested folder). Preserve all existing site files and directory structure.

Google Cloud: authorize https://induguvasanth.github.io as JavaScript origin, enable Drive API, configure OAuth audience/test users, grant drive.file.

Test on the deployed site: Google sign-in, create workspace, upload, switch accounts, scan and PDF export, Windows bridge locally. These integrations were not hardware/browser tested here.
