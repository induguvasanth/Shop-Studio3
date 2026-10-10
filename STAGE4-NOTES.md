# Stage 4 Document Studio

This release adds a separate Advanced Document Studio inside DOCUMENT SCANNER, without replacing existing scanner, PDF, image, cloud library, or other sections.

Features: batch import from device (images and PDFs), page ordering and deletion, page navigation, JPEG and multipage PDF export, OCR-generated PDF with invisible selectable text where OCR succeeds, automatic 4-corner perspective crop when OpenCV is loaded, annotation/signature as typed text, B&W, rotate, adjustable brightness/contrast/saturation, undo/redo (up to 12 snapshots), IndexedDB autosave and restore.

Limitations: OCR is English only and can be inaccurate. PDF import rasterizes pages; original PDF text/forms/vectors are not retained in the edited export. Typed signature is not a cryptographic digital signature. Offline IndexedDB is device-local, may be evicted, and not encrypted. Google Drive integration is the existing Stage 3 module and requires OAuth setup; automatic background sync is NOT implemented. Upload from the existing library manually after export. Service worker caching of third-party libraries is not guaranteed, so first use requires network. Camera capture and scanner hardware use the existing scanner features. Avoid large PDFs on low-memory phones; PDF imports are capped at 80 pages. No live hardware or OAuth validation has been performed.
