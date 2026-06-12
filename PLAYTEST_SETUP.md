# Playtest System Setup

Complete guide to setting up the playtest sign-up form and feedback collection.

## 1. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "Playtest Signups"
3. Create **two sheets** (rename/delete the default):

   **Sheet 1: "Responses"**
   - Headers: `Timestamp | Email | Name | Experience | Discord`

   **Sheet 2: "Feedback"**
   - Headers: `Timestamp | Email | Type | Title | Description | Severity | Steps | Status`

## 2. Set Up Google Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (name it "Playtest Signups")
3. Enable the **Google Sheets API**:
   - Search for "Google Sheets API" in the search bar
   - Click "Enable"
4. Create a Service Account:
   - Go to **Credentials** (left sidebar)
   - Click **Create Credentials** → **Service Account**
   - Fill in the name (e.g., "playtest-form")
   - Click **Create and Continue**
   - Skip optional steps, click **Done**
5. Generate a JSON key:
   - Click the service account you just created
   - Go to the **Keys** tab
   - Click **Add Key** → **Create new key**
   - Choose **JSON** format
   - Download the file and open it

## 3. Share the Sheet with Service Account

1. Copy the `client_email` from the JSON key file
2. Go back to your Google Sheet
3. Click **Share** (top right)
4. Paste the service account email
5. Grant **Editor** access
6. Click **Share**

## 4. Add Environment Variables to Vercel (DETAILED)

### Step 1: Navigate to Vercel Project Settings

1. Go to [vercel.com](https://vercel.com) and log in
2. Click on your project (the Game project you're deploying)
3. Look for the **Settings** tab at the top (between "Deployments" and "Analytics")
4. Click **Settings**

### Step 2: Open Environment Variables Section

1. Once in Settings, look at the left sidebar menu
2. Find and click **Environment Variables** (it's near the bottom, below "Domains")
3. You'll see a page with a form that says "Add a new environment variable"

### Step 3: Add `GOOGLE_SHEET_ID`

From the Google Sheet JSON key file:

1. **Variable Name**: Type exactly: `GOOGLE_SHEET_ID`
2. **Value**: 
   - Open your Google Sheet
   - Look at the URL bar: `https://docs.google.com/spreadsheets/d/XXXXX/edit`
   - Copy everything between `/d/` and `/edit` (the XXXXX part)
   - Paste that into the Value field
3. **Select environments**: Choose "Production" (or all if you want to test in preview)
4. Click **Save**

### Step 4: Add `GOOGLE_SERVICE_ACCOUNT_EMAIL`

From the JSON key file:

1. **Variable Name**: Type exactly: `GOOGLE_SERVICE_ACCOUNT_EMAIL`
2. **Value**: 
   - Open the downloaded JSON key file with a text editor
   - Find the field `"client_email": "something@..."` 
   - Copy the entire email value (the whole thing in quotes)
   - **Do NOT include the quotes** in Vercel
3. Example value: `playtest-form@my-project.iam.gserviceaccount.com`
4. Click **Save**

### Step 5: Add `GOOGLE_PRIVATE_KEY`

From the JSON key file:

1. **Variable Name**: Type exactly: `GOOGLE_PRIVATE_KEY`
2. **Value**: 
   - Open the JSON key file
   - Find `"private_key": "-----BEGIN..."`
   - Copy the **entire value** including the quotes and the `\n` literal characters
   - When pasting into Vercel, it should look like:
     ```
     -----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG...(continues)\n-----END PRIVATE KEY-----\n
     ```
   - The `\n` should be **literal backslash-n**, NOT actual newlines
3. **IMPORTANT**: Make sure the entire key is copied including start and end markers
4. Click **Save**

### Step 6: Verify All Three Variables Are Set

Your Vercel Environment Variables section should now show:
- ✓ `GOOGLE_SHEET_ID` = `1a2b3c4d5e6f7g8h9i0j...`
- ✓ `GOOGLE_SERVICE_ACCOUNT_EMAIL` = `playtest-form@my-project.iam.gserviceaccount.com`
- ✓ `GOOGLE_PRIVATE_KEY` = `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADA...`

## 5. Deploy Your Changes

After adding all three environment variables:

1. Go back to your code
2. Make sure you've pushed your changes (the `playtest-signup/` folder and `api/` files)
3. Vercel will automatically detect the new environment variables
4. Go to the **Deployments** tab in Vercel
5. You should see a new deployment in progress (or completed)
6. Once it says "Ready" with a green checkmark, your form is live

### To Force a New Deployment:

1. In Vercel dashboard, click the three dots (...) next to the latest deployment
2. Select **Redeploy**
3. Click **Redeploy** again in the confirmation dialog
4. Wait for it to finish

## 6. Verify Both Sheets Exist

Before testing, make sure your Google Sheet has:
- ✓ Sheet named "Responses" with headers: Timestamp, Email, Name, Experience, Discord
- ✓ Sheet named "Feedback" with headers: Timestamp, Email, Type, Title, Description, Severity, Steps, Status

## 7. Test the Forms

### Test Sign-Up Form:

1. Go to your Vercel deployment URL + `/playtest-signup`
   - Example: `my-game.vercel.app/playtest-signup`
2. Fill out and submit the form
3. **Within 5 seconds**, check your Google Sheet's "Responses" sheet
4. Your submission should appear as a new row

### Test Feedback Form:

1. Go to your Vercel deployment URL + `/playtest-signup/feedback`
   - Example: `my-game.vercel.app/playtest-signup/feedback`
2. Fill out and submit a test feedback
3. **Within 5 seconds**, check your Google Sheet's "Feedback" sheet
4. Your feedback should appear as a new row

### If It Doesn't Work:

1. **Check Vercel Logs**:
   - In Vercel dashboard, click **Deployments**
   - Click the latest deployment
   - Click **Runtime Logs** (or **Logs** tab)
   - Look for error messages
   - Common error: `Failed to write to Google Sheets` means auth failed

2. **Check Environment Variables**:
   - Go back to Settings → Environment Variables
   - Verify all three variables are present
   - Re-copy the `GOOGLE_PRIVATE_KEY` (it's easy to miss a character)

3. **Check Service Account Permissions**:
   - Open your Google Sheet
   - Click **Share**
   - Verify the service account email is listed with "Editor" access

4. **Check Sheet Names**:
   - Make sure sheets are named exactly "Responses" and "Feedback"
   - Capitalization matters

## 8. Production URLs

Once deployed, share these links with testers:

- **Sign-Up**: `https://your-domain.com/playtest-signup`
- **Feedback**: `https://your-domain.com/playtest-signup/feedback`

Or if using Vercel's default domain:
- **Sign-Up**: `https://your-project.vercel.app/playtest-signup`
- **Feedback**: `https://your-project.vercel.app/playtest-signup/feedback`

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Failed to write to Google Sheets" | Check service account email has Editor access to sheet |
| Data not appearing in sheet | Verify sheet names are exactly "Responses" and "Feedback" |
| JWT signature error | Re-copy `GOOGLE_PRIVATE_KEY` including all `\n` characters |
| 401 error | Double-check `GOOGLE_SERVICE_ACCOUNT_EMAIL` is correct |
| "Cannot find sheet" | Make sure both sheet tabs exist in the Google Sheet |
| Form submits but nothing happens | Check Vercel Runtime Logs for error messages |
