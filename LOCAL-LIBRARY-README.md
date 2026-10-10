# Local document library upgrade

Open DOCUMENT SCANNER and find **My Documents · On this device** above Advanced Document Studio.

- Capture/import pages in the existing editor, then select **Save current pages**.
- Create folders, open saved documents back in the editor, search, rename, or delete.
- Import images or PDFs from your phone's gallery/file picker into the editor. Save after reviewing.
- All local documents are stored in IndexedDB in the browser profile on this device. This is **not** the Android Gallery or device Files folder, and is not synced automatically to Google Drive.
- Export critical documents to PDF/JPG regularly. Clearing site data can erase the library. Large batches can exceed browser quota.
- Auto crop uses the existing OpenCV engine; automatic detection may fail on low-contrast backgrounds. Camera capture still requires real-device testing.
- Other app sections and the existing Google Drive library are unchanged.
