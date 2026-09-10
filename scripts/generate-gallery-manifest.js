import { readdir, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
const root = path.resolve('public/images'); const config = path.resolve('src/data/services.js');
const source = await (await import('node:fs/promises')).readFile(config,'utf8');
const ids = [...source.matchAll(/id:'([^']+)'/g)].map(m=>m[1]); const valid=/\.(jpe?g|png|webp|avif)$/i;
const date = n => (n.match(/^(\d{4}-\d{2}-\d{2})/)||[])[1] || '0000-00-00';
const manifest={generatedAt:new Date().toISOString(),services:{},hero:[],testimonials:[]};
for (const id of ids) { const dir=path.join(root,id); let names=[];
 if (!existsSync(dir)) console.warn(`[gallery] Missing folder: images/${id}`); else names=(await readdir(dir)).filter(n=>!n.startsWith('.')&&valid.test(n));
 names.sort((a,b)=>date(b).localeCompare(date(a))||b.localeCompare(a));
 manifest.services[id]=names.map(filename=>({path:`/images/${id}/${encodeURIComponent(filename)}`,filename,date:date(filename)}));
}
const heroDir=path.join(root,'hero'); if(existsSync(heroDir)) manifest.hero=(await readdir(heroDir)).filter(n=>!n.startsWith('.')&&valid.test(n)).sort((a,b)=>date(b).localeCompare(date(a))||b.localeCompare(a)).map(filename=>`/images/hero/${encodeURIComponent(filename)}`);
const testimonialDir=path.join(root,'testimonials'); if(existsSync(testimonialDir)) manifest.testimonials=(await readdir(testimonialDir)).filter(n=>!n.startsWith('.')&&valid.test(n)).sort((a,b)=>date(b).localeCompare(date(a))||b.localeCompare(a)).map(filename=>({path:`/images/testimonials/${encodeURIComponent(filename)}`,filename,date:date(filename)}));
await writeFile('src/data/gallery-manifest.json',JSON.stringify(manifest,null,2)+'\n');
console.log(`[gallery] Generated manifest: ${Object.values(manifest.services).flat().length} gallery images.`);
