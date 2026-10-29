import {existsSync,readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
if(!existsSync('android'))execFileSync('npx',['cap','add','android'],{stdio:'inherit'});
const base='android/app/src/main';mkdirSync(base+'/res/drawable',{recursive:true});
writeFileSync(base+'/res/drawable/cinedesk_icon.xml',`<vector xmlns:android="http://schemas.android.com/apk/res/android" android:width="108dp" android:height="108dp" android:viewportWidth="108" android:viewportHeight="108"><path android:fillColor="#0B0F19" android:pathData="M0,0h108v108h-108z"/><path android:fillColor="#8B5CF6" android:pathData="M24,34h60v45h-60z"/><path android:fillColor="#F8FAFC" android:pathData="M44,44l24,12 -24,12zM24,24h15l-7,10h-8zM48,24h15l-7,10h-15zM72,24h12v10h-19z"/></vector>`);
let manifest=readFileSync(base+'/AndroidManifest.xml','utf8').replace('@mipmap/ic_launcher_round','@drawable/cinedesk_icon').replace('@mipmap/ic_launcher','@drawable/cinedesk_icon');writeFileSync(base+'/AndroidManifest.xml',manifest);
const styles=base+'/res/values/styles.xml';let theme=readFileSync(styles,'utf8').replace('@drawable/splash','@drawable/cinedesk_icon');writeFileSync(styles,theme);
execFileSync('npx',['cap','sync','android'],{stdio:'inherit'});
