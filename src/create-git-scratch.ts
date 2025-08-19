import { mkdir, writeFile, existsSync } from 'node:fs';
import { promisify } from 'node:util';
import { join } from 'node:path';
import { exec } from 'node:child_process';
import { resolveConfig, CreateGitScratchOptions } from './config.js';
import { generateProjectName } from './name-generator.js';

const mkdirAsync = promisify(mkdir);
const writeFileAsync = promisify(writeFile);
const execAsync = promisify(exec);

export async function createGitScratch(options: CreateGitScratchOptions): Promise<string> {
  const config = resolveConfig(options);
  
  await ensureBaseDirectory(config.baseDirectory);
  
  const projectName = generateUniqueProjectName(config.baseDirectory);
  const projectPath = join(config.baseDirectory, projectName);
  
  await createProjectDirectory(projectPath);
  await initializeGitRepository(projectPath);
  await createInitialFiles(projectPath);
  
  return projectPath;
}

async function ensureBaseDirectory(baseDirectory: string): Promise<void> {
  try {
    await mkdirAsync(baseDirectory, { recursive: true });
  } catch (error) {
    throw new Error(`Failed to create base directory: ${baseDirectory}`);
  }
}

function generateUniqueProjectName(baseDirectory: string): string {
  let projectName: string;
  let attempts = 0;
  const maxAttempts = 100;
  
  do {
    projectName = generateProjectName();
    attempts++;
    
    if (attempts > maxAttempts) {
      throw new Error('Failed to generate unique project name after multiple attempts');
    }
  } while (existsSync(join(baseDirectory, projectName)));
  
  return projectName;
}

async function createProjectDirectory(projectPath: string): Promise<void> {
  try {
    await mkdirAsync(projectPath, { recursive: true });
  } catch (error) {
    throw new Error(`Failed to create project directory: ${projectPath}`);
  }
}

async function initializeGitRepository(projectPath: string): Promise<void> {
  try {
    await execAsync('git init', { cwd: projectPath });
  } catch (error) {
    throw new Error(`Failed to initialize git repository in: ${projectPath}`);
  }
}

async function createInitialFiles(projectPath: string): Promise<void> {
  const gitignorePath = join(projectPath, '.gitignore');
  const readmePath = join(projectPath, 'README.md');
  
  try {
    await Promise.all([
      writeFileAsync(gitignorePath, '', 'utf-8'),
      writeFileAsync(readmePath, '', 'utf-8'),
    ]);
  } catch (error) {
    throw new Error(`Failed to create initial files in: ${projectPath}`);
  }
}