import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import TOML from 'toml';

const DEFAULT_BASE_DIRECTORY = join(homedir(), 'scratch');

export interface Config {
  baseDirectory?: string;
}

export interface CreateGitScratchOptions {
  baseDirectory?: string;
  idea?: string;
}

function expandHomeDirectory(path: string): string {
  if (path.startsWith('~')) {
    return join(homedir(), path.slice(1));
  }
  return path;
}

export function loadConfig(): Config {
  const configPath = join(homedir(), '.config', 'clenima', 'clenima.toml');
  
  try {
    const configContent = readFileSync(configPath, 'utf-8');
    const config = TOML.parse(configContent);
    
    const baseDirectory = config['create-git-scratch']?.['base_directory'];
    
    return {
      baseDirectory: baseDirectory ? expandHomeDirectory(baseDirectory) : undefined,
    };
  } catch (error) {
    return {};
  }
}

export function resolveConfig(options: CreateGitScratchOptions): Required<Pick<CreateGitScratchOptions, 'baseDirectory'>> & Pick<CreateGitScratchOptions, 'idea'> {
  const fileConfig = loadConfig();
  
  const baseDirectory = options.baseDirectory || 
                       fileConfig.baseDirectory || 
                       DEFAULT_BASE_DIRECTORY;
  
  return {
    baseDirectory,
    idea: options.idea,
  };
}