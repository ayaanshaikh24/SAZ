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

const imagesToSync = [
  'logo.jpg',
  'saz2.jpeg'
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

function copyImage(filename) {
  try {
    const src = path.join('images', filename);
    const dest = path.join('public/images', filename);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`[Asset Sync] Copied ${src} -> ${dest}`);
    }
  } catch (err) {
    console.error(`[Asset Sync] Failed to copy image ${filename}:`, err);
  }
}

try {
  // Ensure directories exist
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public');
  }
  if (!fs.existsSync('public/images')) {
    fs.mkdirSync('public/images');
  }

  // Initial sync
  filesToSync.forEach(copyFile);
  imagesToSync.forEach(copyImage);

  // Setup file watchers in development
  if (process.env.NODE_ENV !== 'production') {
    fs.watch('.', (eventType, filename) => {
      if (filename && filesToSync.includes(filename)) {
        copyFile(filename);
      }
    });

    if (fs.existsSync('images')) {
      fs.watch('images', (eventType, filename) => {
        if (filename && imagesToSync.includes(filename)) {
          copyImage(filename);
        }
      });
    }
    console.log('[Asset Sync] File watchers active for root assets.');
  }
} catch (err) {
  console.error('[Asset Sync] Initialization failed:', err);
}

// https://astro.build/config
export default defineConfig({});

