#!/usr/bin/env node

import { createNotesAPI } from '../src/notes.js';

const [,, title, ...contentParts] = process.argv;

if (!title) {
  console.error('Usage: npm run create-note <title> [content]');
  console.error('Example: npm run create-note "Meeting Notes" "Discussed quarterly goals"');
  process.exit(1);
}

const content = contentParts.join(' ') || '';

const notes = createNotesAPI();

async function main() {
  console.log(`📝 Creating note: "${title}"`);

  const noteData = {
    name: title
  };

  if (content) {
    noteData.content = content;
  }

  const result = await notes.create(noteData);

  console.log('✅ Note created successfully!');
  if (result?.uuid) {
    console.log(`   UUID: ${result.uuid}`);
  }
  if (result?.url) {
    console.log(`   URL: ${result.url}`);
  }
}

main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
