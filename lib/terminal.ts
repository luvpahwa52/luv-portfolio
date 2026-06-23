import { profile, projects, skills } from './data';

export type CmdOutput = { type: 'text' | 'list' | 'link' | 'error' | 'ascii'; lines: string[] };

export const commands: Record<string, (args: string[]) => CmdOutput> = {
  help: () => ({
    type: 'list',
    lines: [
      'available commands:',
      '  about        — who am i',
      '  projects     — list projects',
      '  skills       — tech stack',
      '  contact      — get in touch',
      '  whoami       — short bio',
      '  socials      — github / linkedin',
      '  clear        — clear terminal',
      '  ls           — list site sections',
      '  cd <section> — jump to a section',
      '  sudo hire-me — ???',
    ],
  }),
  about: () => ({
    type: 'text',
    lines: [profile.bio, '', `currently in ${profile.location} — ${profile.role}.`],
  }),
  whoami: () => ({ type: 'text', lines: [`${profile.name} — ${profile.role}`] }),
  projects: () => ({
    type: 'list',
    lines: projects.map((p, i) => `  [${i + 1}] ${p.title} — ${p.desc}`),
  }),
  skills: () => ({
    type: 'list',
    lines: Object.entries(skills).map(([cat, items]) => `  ${cat.toLowerCase()}: ${items.join(', ')}`),
  }),
  contact: () => ({
    type: 'list',
    lines: [`  email:    ${profile.email}`, `  github:   ${profile.socials.github}`, `  linkedin: ${profile.socials.linkedin}`],
  }),
  socials: () => ({
    type: 'list',
    lines: [`  github   → ${profile.socials.github}`, `  linkedin → ${profile.socials.linkedin}`],
  }),
  ls: () => ({
    type: 'list',
    lines: ['  about/   work/   skills/   blog/   contact/'],
  }),
  cd: (args) => {
    const target = args[0]?.replace(/\/$/, '');
    const valid: Record<string, string> = {
      about: '#about', work: '#work', projects: '#work',
      skills: '#skills', contact: '#contact', blog: '/blog', '~': '/', '..': '/',
    };
    if (target && valid[target]) {
      if (typeof window !== 'undefined') {
        if (valid[target].startsWith('/')) window.location.href = valid[target];
        else document.querySelector(valid[target])?.scrollIntoView({ behavior: 'smooth' });
      }
      return { type: 'text', lines: [`→ navigating to ${target}/`] };
    }
    return { type: 'error', lines: [`cd: no such directory: ${target ?? ''}`] };
  },
  clear: () => ({ type: 'text', lines: ['__CLEAR__'] }),
  'sudo hire-me': () => ({
    type: 'ascii',
    lines: [
      '   ╔═══════════════════════════════════╗',
      '   ║  permission granted ✓             ║',
      `   ║  email me: ${profile.email.padEnd(23)}║`,
      '   ║  let\'s build something great.     ║',
      '   ╚═══════════════════════════════════╝',
    ],
  }),
  'cat /etc/passwd': () => ({ type: 'error', lines: ['nice try 🙃'] }),
  rm: () => ({ type: 'error', lines: ['rm: operation not permitted (this is a portfolio, not your homework)'] }),
  exit: () => ({ type: 'text', lines: ['you can check out any time you like, but you can never leave.'] }),
  date: () => ({ type: 'text', lines: [new Date().toString()] }),
  echo: (args) => ({ type: 'text', lines: [args.join(' ')] }),
};

export function runCommand(input: string): CmdOutput {
  const trimmed = input.trim();
  if (!trimmed) return { type: 'text', lines: [] };

  // Handle multi-word commands like "sudo hire-me"
  const full = trimmed.toLowerCase();
  if (commands[full]) return commands[full]([]);

  const [cmd, ...args] = trimmed.split(/\s+/);
  const fn = commands[cmd.toLowerCase()];
  if (fn) return fn(args);
  return { type: 'error', lines: [`command not found: ${cmd}. type 'help' for available commands.`] };
}