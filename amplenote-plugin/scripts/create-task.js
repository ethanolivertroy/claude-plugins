#!/usr/bin/env node

import { createNotesAPI } from '../src/notes.js';

const [,, noteUuid, ...taskParts] = process.argv;

if (!noteUuid || taskParts.length === 0) {
  console.error('Usage: npm run create-task <note-uuid> <task-content>');
  console.error('Example: npm run create-task abc123 "Review pull requests"');
  process.exit(1);
}

const taskContent = taskParts.join(' ');

const notes = createNotesAPI();

async function main() {
  console.log(`📋 Adding task to note: ${noteUuid}`);
  console.log(`   Task: "${taskContent}"`);

  const result = await notes.addTask(noteUuid, {
    content: taskContent
  });

  console.log('✅ Task created successfully!');
  if (result?.uuid) {
    console.log(`   Task UUID: ${result.uuid}`);
  }
}

main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
