#!/usr/bin/env node

import { createNotesAPI } from '../src/notes.js';

const [,, ...queryParts] = process.argv;

if (queryParts.length === 0) {
  console.error('Usage: npm run search <query>');
  console.error('Example: npm run search "meeting notes"');
  process.exit(1);
}

const query = queryParts.join(' ');

const notes = createNotesAPI();

async function main() {
  console.log(`🔍 Searching for: "${query}"\n`);

  const results = await notes.search(query);

  if (!results || results.length === 0) {
    console.log('No notes found matching your query.');
    return;
  }

  console.log(`Found ${results.length} note(s):\n`);

  for (const note of results) {
    console.log(`📝 ${note.name || 'Untitled'}`);
    if (note.uuid) {
      console.log(`   UUID: ${note.uuid}`);
    }
    if (note.tags?.length > 0) {
      console.log(`   Tags: ${note.tags.map(t => t.text || t).join(', ')}`);
    }
    console.log('');
  }
}

main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
