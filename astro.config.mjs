import { defineConfig } from 'astro/config';
import fs from 'fs';
import path from 'path';

const filesToSync = [
  'index.html',
  'about.html',
  'products.html',
  'contact.html',
  'design.html',
  'product-detail.html',
  'style.css',
  'script.js'
];

function copyFile(filename) {
  try {
    const src = filename;
    const dest = path.join('public', filename);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`[Asset Sync] Copied ${src} -> ${dest}`);
    }
  } catch (err) {
    console.error(`[Asset Sync] Failed to copy ${filename}:`, err);
  }
}

function copyFolderSync(from, to) {
  try {
    if (!fs.existsSync(to)) {
      fs.mkdirSync(to, { recursive: true });
    }
    fs.readdirSync(from).forEach(element => {
      const srcPath = path.join(from, element);
      const destPath = path.join(to, element);
      if (fs.lstatSync(srcPath).isDirectory()) {
        copyFolderSync(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    });
  } catch (err) {
    console.error(`[Asset Sync] Failed to copy folder from ${from} to ${to}:`, err);
  }
}

try {
  // Ensure directories exist
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public');
  }
  
  // Initial sync of pages and styles
  filesToSync.forEach(copyFile);
  
  // Sync entire images directory recursively
  if (fs.existsSync('images')) {
    copyFolderSync('images', 'public/images');
  }

  // Setup file watchers in development
  if (process.env.NODE_ENV !== 'production') {
    fs.watch('.', (eventType, filename) => {
      if (filename && filesToSync.includes(filename)) {
        copyFile(filename);
      }
    });

    if (fs.existsSync('images')) {
      fs.watch('images', { recursive: true }, (eventType, filename) => {
        copyFolderSync('images', 'public/images');
      });
    }
    console.log('[Asset Sync] File watchers active for root assets.');
  }
} catch (err) {
  console.error('[Asset Sync] Initialization failed:', err);
}

// https://astro.build/config
export default defineConfig({});

