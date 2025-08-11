# Hulkastorus Product Design

Hulkastorus removes the overhead that traditional cloud-storage products impose on developers who only need a public link or a quick programmatic upload. Google Drive hides links behind IDs and OAuth; Amazon S3 forces users to reason about buckets, regions, and SDKs. These frictions slow experimentation, inflate scripts, and confuse teammates.

Hulkastorus supplies a single-purpose alternative. A minimal web UI, a two-endpoint REST API, and opinionated defaults let users drag-and-drop a file or issue one curl command and immediately receive a stable URL backed by Cloudflare R2. Optional per-directory rules cover the 10% of cases that need privacy or expiry without burdening the 90% that do not.

# Use Cases

## Share to Constrained Environments

**Persona**: Evelyn, data scientist, shares large databases with her team.
**Goal**: share a 3 GB database so her team can test it on their own cloud servers.
**Frustration**: S3 is permissions overkill and requires SDKs to download; Drive links aren't curlable on headless instances.

**Flow**:

1. Evelyn opens the Hulkastorus Dashboard, drags `massive-database.sqlite` into the drop Zone
2. A modal appears with a progress bar, permissions settings, and a (currently disabled) action bar.
3. The UI shows “Uploaded ✔︎” when finished and she clicks "View in Manager" from the action bar to view its location in the Hulkastorus File Manager.
4. She selects the "Copy as curl" button and pastes the command into a Slack message for her team.
5. Her teammate, Dr. Chen, runs the command his headless server to download the file without any credentials or API keys.

## Share from Constrained Environments

**Persona**: Maya, graduate student, iterates on diffusion models nightly.
**Goal**: share her latest checkpoint from her headless server
**Frustration**: S3 is permissions overkill and requires SDKs to upload; her local bandwidth is limited and she doesn't want to upload twice.

**Flow**:

1. Maya opens the Hulkastorus Dashboard, clicks "Upload".
2. A modal appears where she selects the "Remote File" option.
3. She copies and pastes the a curl command that appears in the upload modal onto her headless server.
4. She clicks "finished" to trigger verification.
5. The UI shows "Uploaded" and she clicks "View in Manager" from the action bar to view its location in the file manager.
6. She selects the "Copy as curl" button and pastes the command into a Slack message for her team.

## Share Expendable Files

**Persona**: John, photographer, regularly shares large temporary previews.
**Goal**: share a 4GB image archive with his clients.
**Frustration**: cloud storage space is expensive and he doesn't want the burden of deleting old files.

**Flow**:

1. John opens the Hulkastorus Dashboard, drags `images.zip` into the drop zone, and watches an inline progress bar.
2. He selects "Set expiry" from the action bar and sets it to 7 days.
3. The UI shows “Uploaded ✔︎” and he clicks "Copy URL" from the action bar to copy the public URL to his clipboard.
4. He sends the URL to his clients via email.
5. His clients download the file by opening the URL in their browser.
6. The file is automatically deleted after 7 days, freeing up space in his cloud storage quota.

# Surfaces

## Homepage

**Contents**
- Navbar (logo, "Docs", "Pricing", "Login", "Request Invite" CTA)
- Hero header (mascot, one-line value prop, "Request Invite" CTA, "Read the Docs" secondary CTA)
- Three feature highlight cards
- Code block with example API call
- Logo carousel (fictional logos - Hooli, Pied Piper, Enron, Theranos, etc.)
- Pricing comparison table "Free", "Pro", "Tres Commas" (all free in beta)
- Footer (Copyright, Privacy, Terms)

**Visual Design**
- Single-scroll dark mode canvas.
- Centered hero container, 40% vertical viewport height.
- Feature cards are equal-width with subtle elevation.
- Logo carousel is horizontal and features monochromatic, semi-transparent, fictional company logos.

**Product Behavior**
- Logged-in users auto-redirect to **Dashboard** unless coming from the dashboard (query param).
- "Request Invite" CTA is mailto invites@hulkastor.us
- Sticky top nav on scroll.


## Documentation

**Contents**
- Navbar (logo, "Docs", "Pricing", "Login", "Request Invite" CTA)
- Sidenav listing topics
- Technical documentation sections
    - Getting Started
    - API Reference
    - FAQ
- Copyable code snippets with default API key prefilled
- Footer (Copyright, Privacy, Terms)

**Visual Design**
- Two-pane layout, 260px fixed sidenav.
- Code blocks on washed-dark background; body text max-width 720 px.
- Sticky search bar with subtle shadow.

**Product Behavior**
- Sidenav highlights section in viewport.
- Copy-link icon adjacent to H2+ anchors copies URL with hash anchor.
- External links open new tab.


## Login

**Contents**
- Login card
    - Email input
    - Password input
    - Login button
    - Forgot password toggle
    - Register link
- Footer (Copyright, Privacy, Terms)

**Visual Design**
- Card centered on a dark background with hexagonal logo and overlays, max-width 360px.
- Minimal shadow, rounds 8px.
- Inputs centered full-width with margin.

**Product Behavior**
- Redirects to dashboard if already logged in on load.
- Forgot password toggle hides the password input and changes copy to reset language.
- Failure triggers shake animation and toast error message.
- Successful login sets JWT and routes to denied surface (default **Dashboard**).

## Register

**Contents**
- Register card
    - Name input
    - Email input
    - Password input
    - Confirm password input
    - Invite code input
    - Register button
    - Login link
- Footer (Copyright, Privacy, Terms)

**Visual Design**
- Card centered on a dark background with hexagonal logo and overlays, max-width 360px.
- Minimal shadow, rounds 8px.
- Inputs centered full-width with margin.

**Product Behavior**
- Redirects to dashboard if already logged in on load.
- Failure triggers shake animation and toast error message.
- Successful registration sets JWT and redirects to Dashboard.
- New account automatically creates the default directory and API key.

## Verification Email

**Contents**
- Message with a link to verify the email address.

**Visual Design**
- None, plain text.

**Product Behavior**
- Redirects to dashboard if already logged in.
- Redirects to login if not logged in.
- Displays a toast message on success.

## Reset Password

**Contents**
- Reset password card
    - Password input
    - Confirm password input
    - Reset password button
- Footer (Copyright, Privacy, Terms)

**Visual Design**
- Card centered on a dark background with hexagonal logo and overlays, max-width 360px.
- Minimal shadow, rounds 8px.
- Inputs centered full-width with margin.

**Product Behavior**
- Loading of the page with invalid reset token redirects to login.
- Failure to reset triggers shake animation and toast error message.
- Successful reset redirects to login.

## Reset Password Email

**Contents**
- Message with a link to reset your password.

**Visual Design**
- None, plain text.

**Product Behavior**
- Displays a toast message on success.

## Application Shell

**Contents**
- Sidenav (logo, Dashboard, File Manager, Settings)
- Main content (flex)
- Footer (Copyright, Privacy, Terms)

**Visual Design**
- Sidenav is fixed width and always visible.
- Main content is flex and takes up the rest of the viewport.
- Footer is after the main content in scroll window.

**Product Behavior**
- Sidenav highlights active section in viewport.
- Clicking a sidenav item updates the main content to the corresponding surface.
- If email is not verified, a fixed warning banner is displayed in the main content to verify with a resend link.

## Dashboard

**Contents**
- Application shell
- Main content
    - Welcome message
    - Drag-and-drop zone with "Browse" button
    - Recent uploads list
    - Large number stat cards for total files and total space used
    - Quota pie broken down by type
    - Largest files table
- Upload modal
    - expiration time
    - permissions (public, private)
    - location (directory)
    - progress bar
    - action bar (copy URL, copy as curl, open in manager, set expiry, delete)
    - cancel button
    - close button

**Visual Design**
- Drag and drop zone is 100% width of the main content.
- Grid of 2-3 responsive cards per row for other content.

**Product Behavior**

- If email is not verified, drag-and-drop zone is disabled and shows a warning.
- If email is not verified, upload attempts trigger an error toast message (before modal).
- Dragging a file or selecting "Browse" triggers upload modal.
- In upload modal, clicking "Cancel" triggers a confirmation message.
- In upload modal, clicking "Close" triggers a confirmation message.
- All files displayed in recent or largest are links to the File Manager.


## File Manager

**Contents**
- Application shell
- Main content
    - Breadcrumbs
    - Upload button
    - New folder button
    - Search box
    - Table of files
        - Name
        - Size
        - Uploaded
        - Expires
        - Permissions
        - Kebab menu (copy URL, copy as curl, set expiry, rename, delete)
    - Side drawer
        - Longform metadata
        - Activity log
        - Kebab menu (copy URL, copy as curl, set expiry, rename, delete)
    - Directory settings modal
        - Name
        - Permissions
        - Expiry
        - Delete button
- Upload modal
    - _see upload modal from dashboard_
- Text Input Modal
    - Text input
    - Action bar (save, cancel)

**Visual Design**
- Thin header contains breadcrumbs, search, upload button, new folder button, and preferences.
- Breadcrumbs truncate middle dirs.
- Most of the screen occupied by a flex table.
- Public files are highlighted in the table with a globe badge.
- Expiring files are highlighted in the table with an hourglass badge.

**Product Behavior**
- URL bar updates along with the breadcrumbs / directory.
- Drag files into grid triggers a drag-and-drop upload.
- New Directory and Rename buttons trigger a text input modal.
- Search box shifts table to add a column for "Directory" and filters to all rows in all storage where the directory or filename matches the search.

## Settings

**Contents**
- Application shell
- Main content
    - Profile section
        - Display name
        - Email (disabled)
    - Password section
        - Current password
        - New password
        - Confirm password
    - API Keys section
        - Table of API keys
        - Generate button
        - Delete button
    - Danger Zone section
        - Delete Account button


**Visual Design**
- Vertically stacked sections with text interrupting the border.
- Danger zone elements in red with warning icon.

**Product Behavior**
- Panel selection updates URL hash.
- Failure triggers shake animation and toast error message.
- Delete Account requires typed confirmation.

# Flows

## First-Time Upload from **Dashboard**

1. User lands on **Dashboard** (via Application Shell autoload or redirect).
2. Drags a file onto the drag-and-drop zone → upload modal opens with directory = “/”, *public* default, progress bar live.
3. Upload succeeds → toast “URL copied”, file appears at top of **Recent Uploads** list, quota/stat cards refresh.

## Upload to a Chosen Directory in **File Manager**

1. From **Dashboard** or sidenav, user opens **File Manager**; breadcrumbs show current path.
2. Navigates via table/breadcrumbs to target directory.
3. Drags file into table grid → upload modal pre-filled with that directory’s defaults.
4. User optionally edits expiry or permissions → **Save**.
5. Grid refreshes; new row inherits directory styling (e.g., globe badge if public).

## Programmatic Upload with an API Key

1. In **Settings** main content, user selects **Generate** → enters label, checks **write**, **Generate**.
2. Service returns key; clipboard auto-copied.
3. User executes a POST some sort of `/files` endpoint with the file metadata.
4. The service returns a 201 Created response with a JSON body containing the upload URL.
5. User executes a PUT to the upload URL with the file contents.
6. The service returns a 200 OK response.
7. User executes a PUT some sort of `/files/<file_id>/status` endpoint with the status `uploaded`.
8. The service returns a 200 OK response.


## Programmatic Download with an API Key

1. User executes a GET some sort of `/files/<file_id>/download` endpoint.
2. Service issues a 302 redirect to the R2 object.

## Share & Download via Public Link

1. In **File Manager**, user selects a public file → kebab menu → **Copy URL** (clipboard toast).
2. Guest opens link; service validates permission then 302-redirects to R2 object.

## Search from File Manager

1. User enters substring in search input on the **File Manager**.
2. Table rows shift to add a column for "Directory" and filter to only show rows where the directory of filename matches the search.
3. Clicking a result's "Directory" column opens **File Manager** focused on the selected item (row auto-scrolled + highlighted).

## Delete File(s)

1. In **File Manager**, user multi-selects rows → action bar **Delete**.
2. Confirmation modal (“Irreversible – type DELETE”).
3. On confirm, rows vanish; **Dashboard** quota cards and pie chart update in real time.

## Edit Profile Details

1. Navigate to **Settings** → **Profile** section.
2. Inline-edit **Display Name** or (if allowed) **Email**; **Save**.
3. Success toast; sidenav avatar text refreshes. Email change triggers re-verification banner.

## Change Password

1. In **Settings** → **Password** section, user enters current + new + confirm → **Save**.
2. On success, toast “Password successfully updated”

## Forgotten Password Recovery

1. On **Login** card, user taps **Forgot password?** → email entry replaces password input.
2. Service emails time-boxed reset link.
3. User opens link → **Reset Password** surface (stand-alone card) enters new password, **Reset**.
4. Success toast + redirects to **Login**.

## Routine Login

1. Returning visitor hits **Login**.
2. Redirects to last-rejected auth surface or **Dashboard** if never rejected.

## Delete an API Key

1. **Settings › API Keys** table → kebab menu **Delete**.
2. Modal with confirm button.
3. On confirm, row disappears immediately, key invalidated backend-side.

# Future Work

* Multipart uploads for large files
* One-time password-protected URLs
* Detailed activity logs with IP, user-agent, timestamp
* Payment plans with Stripe integration
* Server-side virus scanning + MIME validation
* Inline previews (images, text, notebooks)
* Versioning and soft-delete retention
* Org accounts with role-based access + SAML/OIDC
