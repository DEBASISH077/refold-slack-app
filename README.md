Refold Slack App

📦 Detailed Setup Instructions

1\. Clone the Repository

git clone https://github.com/DEBASISH077/refold-slack-app.git

cd refold-slack-app

2\. Backend Configuration

1\. Enter the backend folder:

cd backend

2\. Copy and edit your environment variables:

cp .env.example .env

3\. Populate `.env` with:

PORT=3000

DATABASE\_PATH=./data.sqlite

SLACK\_CLIENT\_ID=<your-slack-client-id>

SLACK\_CLIENT\_SECRET=<your-slack-client-secret>

SLACK\_SIGNING\_SECRET=<your-slack-signing-secret>

SLACK\_REDIRECT\_URI=http://localhost:3000/auth/slack/callback

4\. Install and start:

npm install

npm run dev

5\. Verify: Visit http://localhost:3000/health and expect:

{ "status": "ok" }

3\. Frontend Configuration

1\. In a new terminal, go to the frontend:

cd frontend

2\. Create `.env`:

PORT=3001

REACT\_APP\_API\_URL=http://localhost:3000

3\. Install and start:

npm install

npm start

4\. Verify: Browse to http://localhost:3001 and navigate between the Health and Users pages.

🏗 Architectural Overview

OAuth \& Token Management:

Users initiate Slack authentication via a /auth/slack redirect. On callback (/auth/slack/callback), we exchange the code for access and refresh tokens, which we store in SQLite. All subsequent Slack API calls pull from this store, ensuring secure, centralized token handling.

Scheduled Task Handling:

Background jobs live in src/cron.ts and kick off when the server starts.

• A daily cleanup task prunes invalid or empty-named users.

• An hourly job logs user counts and refreshes Slack tokens as needed.

Both jobs use node-cron with robust try/catch wrappers to prevent silent failures.

🧠 Challenges \& Learnings

Cross-Origin API Errors:

Running the frontend on port 3001 and the backend on 3000 triggered CORS blocks.

Solution: Added cors() middleware in Express or configured CRA’s proxy.

TypeScript Casing Mismatch:

Windows file system treated app.ts vs App.ts imports inconsistently, causing TS1149 errors.

Solution: Enabled forceConsistentCasingInFileNames in tsconfig.json and unified all filenames.

Uncaught Cron Task Failures:

Early cron implementations could crash on runtime errors, halting the scheduler.

Solution: Wrapped each scheduled callback in try/catch, defaulted missing DB rows, and surfaced errors via console.error.



