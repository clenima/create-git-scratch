#!/usr/bin/env node

import { parseArgs } from 'node:util';
import { createGitScratch } from './create-git-scratch.js';

async function main() {
  const { values, positionals } = parseArgs({
    args: process.argv.slice(2),
    options: {
      'base-directory': {
        type: 'string',
        short: 'b',
      },
      help: {
        type: 'boolean',
        short: 'h',
      },
    },
    allowPositionals: true,
  });

  if (values.help) {
    console.log(`
Usage: bunx @clenima/create-git-scratch [OPTIONS] [IDEA]

Creates a temporary git repository with random name for quick prototyping.

Options:
  -b, --base-directory <path>  Base directory for creating projects
  -h, --help                   Show this help message

Examples:
  bunx @clenima/create-git-scratch
  bunx @clenima/create-git-scratch --base-directory ~/scratch
  bunx @clenima/create-git-scratch "my experiment idea"
`);
    process.exit(0);
  }

  const idea = positionals[0];
  const baseDirectory = values['base-directory'];

  try {
    const projectPath = await createGitScratch({
      baseDirectory,
      idea,
    });

    console.log(`✨ Created new git scratch project: ${projectPath}`);
    console.log(`📁 To navigate there, run: cd "${projectPath}"`);
  } catch (error) {
    console.error('Error creating git scratch project:', error);
    process.exit(1);
  }
}

if (import.meta.main) {
  main();
}