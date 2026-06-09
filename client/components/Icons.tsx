type IconName = 'shield' | 'terminal' | 'note' | 'trend' | 'github' | 'linkedin' | 'x' | 'mail' | 'menu' | 'close' | 'arrow';

type IconProps = {
  name: IconName;
  className?: string;
};

const base = 'h-5 w-5 shrink-0';

export function Icon({ name, className }: IconProps) {
  const sizeClass = className ?? base;

  if (name === 'shield') {
    return (
      <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2l7 3v6c0 5-3.3 9.4-7 11-3.7-1.6-7-6-7-11V5l7-3z" />
        <path d="M12 7v10" />
        <path d="M8.5 11.5h7" />
      </svg>
    );
  }

  if (name === 'terminal') {
    return (
      <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <path d="M7 9l3 3-3 3" />
        <path d="M12 15h5" />
      </svg>
    );
  }

  if (name === 'note') {
    return (
      <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M8 8h8" />
        <path d="M8 12h8" />
        <path d="M8 16h5" />
      </svg>
    );
  }

  if (name === 'trend') {
    return (
      <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="M7 15l3-4 3 2 5-7" />
        <path d="M15 6h3v3" />
      </svg>
    );
  }

  if (name === 'github') {
    return (
      <svg viewBox="0 0 24 24" className={sizeClass} fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.9.6-3.5-1.2-3.5-1.2-.4-1-.9-1.2-.9-1.2-.8-.6.1-.6.1-.6.9.1 1.4.9 1.4.9.8 1.4 2.2 1 2.8.8.1-.6.3-1 .6-1.3-2.3-.3-4.7-1.1-4.7-4.7 0-1 .4-1.9 1-2.5-.1-.3-.4-1.2.1-2.4 0 0 .8-.2 2.6 1a9 9 0 0 1 4.8 0c1.8-1.2 2.6-1 2.6-1 .5 1.2.2 2.1.1 2.4.6.6 1 1.5 1 2.5 0 3.6-2.4 4.4-4.7 4.7.3.3.7.9.7 1.8v2.7c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />
      </svg>
    );
  }

  if (name === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" className={sizeClass} fill="currentColor" aria-hidden="true">
        <path d="M4 9h4v11H4z" />
        <path d="M6 4.5A2.1 2.1 0 1 1 6 8.7a2.1 2.1 0 0 1 0-4.2z" />
        <path d="M10.5 9H14v1.7h.1c.5-1 1.8-2 3.7-2 3.9 0 4.6 2.6 4.6 6V20h-4v-4.4c0-1.1 0-2.5-1.5-2.5s-1.7 1.2-1.7 2.4V20h-4z" />
      </svg>
    );
  }

  if (name === 'x') {
    return (
      <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4l16 16" />
        <path d="M20 4L4 20" />
      </svg>
    );
  }

  if (name === 'mail') {
    return (
      <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M4 6l8 7 8-7" />
      </svg>
    );
  }

  if (name === 'menu') {
    return (
      <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </svg>
    );
  }

  if (name === 'close') {
    return (
      <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4l16 16" />
        <path d="M20 4L4 20" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={sizeClass} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}
