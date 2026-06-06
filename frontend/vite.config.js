import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['@noble/hashes'],
    alias: [
      {
        find: /^@noble\/hashes$/,
        replacement: path.resolve(__dirname, 'node_modules/@noble/hashes/esm/index.js'),
      },
      {
        find: '@noble/hashes/utils',
        replacement: path.resolve(__dirname, 'src/lib/noble-hashes-utils-compat.js'),
      },
      {
        find: '@noble/hashes/utils.js',
        replacement: path.resolve(__dirname, 'src/lib/noble-hashes-utils-compat.js'),
      },
      {
        find: '@noble/hashes/crypto.js',
        replacement: path.resolve(__dirname, 'node_modules/@noble/hashes/esm/crypto.js'),
      },
      {
        find: '@noble/hashes/hmac.js',
        replacement: path.resolve(__dirname, 'node_modules/@noble/hashes/esm/hmac.js'),
      },
      {
        find: '@noble/hashes/sha2.js',
        replacement: path.resolve(__dirname, 'node_modules/@noble/hashes/esm/sha2.js'),
      },
      {
        find: '@noble/hashes/ripemd160.js',
        replacement: path.resolve(__dirname, 'node_modules/@noble/hashes/esm/ripemd160.js'),
      },
      {
        find: '@noble/hashes/legacy',
        replacement: path.resolve(__dirname, 'node_modules/@noble/hashes/esm/ripemd160.js'),
      },
      {
        find: /^@noble\/hashes\/(.*)\.js$/,
        replacement: path.resolve(__dirname, 'node_modules/@noble/hashes/esm/$1.js'),
      },
      {
        find: /^@noble\/hashes\/(.*)$/,
        replacement: path.resolve(__dirname, 'node_modules/@noble/hashes/esm/$1.js'),
      },
    ],
  },
})
