# Android APK

Open Actions → Build Android APK → Run workflow → choose CineDesk → Run workflow. After it succeeds, open the run, scroll to Artifacts, and download CineDesk-Android-APK. Extract the ZIP and install CineDesk-debug.apk on an Android device, allowing installation from your browser/files app when prompted.

GitHub builds everything; no local Android SDK or Android Studio is required. The workflow generates the native Android project from the exact locked Capacitor version, applies original CineDesk vector branding, copies dist into the app and invokes the generated Gradle wrapper. No server.url is configured: web assets are bundled. Source updates matching workflow paths on CineDesk automatically rebuild. Website deployment is unchanged.

Optional backend: set repository variable VITE_SUPABASE_URL and repository secret VITE_SUPABASE_ANON_KEY to the project's public frontend key. Never use a service-role key. Supabase native authentication redirects must be tested separately; the app preserves existing email auth code but has no new deep-link integration. Current production planning remains browser-local demonstration data, now isolated in the Android WebView. Browser print/pop-up call sheets and exports are preserved web implementations and are not verified native printing/sharing features.

Debug builds are for private testing. GitHub generates a debug signing key on each clean runner; updating an existing installation may require uninstalling it, which clears local demo data. A persistent release signing key should be configured separately for durable upgrades. No Play Store publishing is configured. Artifacts expire after 30 days; run the workflow again for a fresh download.
