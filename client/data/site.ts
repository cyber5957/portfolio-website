export const siteContent = {
  brand: 'VINAYAK',
  role: 'Cybersecurity Student | Blue Team & Forensics',
  badge: 'BLUE TEAM & FORENSICS SPECIALIST',
  headline: ['Detect. Investigate.', 'Protect.'],
  description:
    'BCA in Cyber Security & Forensics. Hands-on learner practicing Blue Team operations, forensics, and incident response through labs and CTF challenges.',
  ctas: {
    projects: '#projects',
    resume: '#resume',
    resumePdf: '/resume.pdf'
  },
  githubUsername: 'cyber5957',
  currentMission: {
    title: 'SOC-ready cyber defense readiness build',
    status: 'Active',
    overview:
      'Driving a live practice environment to find gaps, document investigations, and maintain operational readiness for early security roles.',
    focusAreas: ['Threat Detection', 'Log Analysis', 'Incident Response', 'Reporting']
  },
  skillMatrix: [
    {
      title: 'Blue Team Operations',
      strength: 95,
      items: ['Endpoint Monitoring', 'SIEM Triage', 'Threat Hunting', 'Threat Intelligence']
    },
    {
      title: 'Forensics & Analysis',
      strength: 90,
      items: ['Disk Forensics', 'Memory Analysis', 'Log Correlation', 'Artifact Recovery']
    },
    {
      title: 'Security Tooling',
      strength: 88,
      items: ['Wireshark', 'Nmap', 'Sysinternals', 'Suricata']
    }
  ],
  journalEntries: [
    {
      title: 'Observed Malicious RDP Patterns',
      tag: 'Threat Intel',
      description:
        'Identified abnormal RDP connection patterns during a lab investigation and mapped the suspicious activity to potential credential misuse.'
    },
    {
      title: 'Threat Hunting Mindset',
      tag: 'Tactical',
      description:
        'Focused on proactive detection by tracking process creation, authentication anomalies, and lateral movement signals across log timelines.'
    },
    {
      title: 'Operational Reporting',
      tag: 'Documentation',
      description:
        'Compiled incident findings into structured reports that surface root cause, remediation guidance, and defensive recommendations.'
    }
  ],
  achievements: [
    {
      title: 'Certificate Collection',
      description: 'Built a growing portfolio of eight certificates spanning cybersecurity fundamentals, competitions, and academic recognition.',
      detail: '8 certificates'
    },
    {
      title: 'Blue Team Labs',
      description: 'Delivered detailed host and network investigations in public repository reports.',
      detail: 'Active lab portfolio'
    },
    {
      title: 'CTF Participation',
      description: 'Engaged in university and online capture-the-flag events to sharpen problem solving and security intuition.',
      detail: 'Ongoing challenges'
    }
  ],
  caseFiles: [
    {
      caseId: 'CF-01',
      title: 'Windows Host Forensics Drill',
      objective: 'Analyze suspicious Windows logs to identify persistence mechanisms and malicious execution.',
      status: 'Validated',
      findings:
        'Captured event chains that revealed abnormal process creation and unauthorized service execution. Consolidated evidence for timeline reconstruction.',
      methodology:
        'Correlate security event logs, inspect process execution artifacts, and verify findings against lab threat scenarios.',
      lessons: 'A strong baseline and disciplined logging strategy make investigation faster and more accurate.',
      tools: ['Event Viewer', 'Sysinternals', 'PowerShell', 'Log Analysis']
    },
    {
      caseId: 'CF-02',
      title: 'Authentication Log Threat Hunt',
      objective: 'Review login events for anomalies and validate suspected brute-force activity in a simulated environment.',
      status: 'Completed',
      findings:
        'Confirmed repeated failed logons from a single host, followed by successful credential use. Identified the attacker pivot point within the session.',
      methodology:
        'Filter authentication logs, examine account activity, and cross-reference host telemetry with user behavior.',
      lessons: 'Pattern recognition and timely filtering are key to uncovering malicious activity in authentication logs.',
      tools: ['Windows Security Logs', 'Log Parser', 'Timeline Analysis']
    }
  ],
  nav: [] as { label: string; href: string }[],
  metrics: [
    { label: 'TryHackMe Rooms', value: '30+', detail: 'Pre-Security & Labs' },
    { label: 'CTF Challenges', value: '1', detail: 'BBDU & Online CTFs' },
    { label: 'Lab Exercises', value: '10+', detail: 'Blue Team & Forensics' },
    { label: 'Certificates', value: '8', detail: 'Learning & Recognition' }
  ],
  investigations: [
    {
      title: 'Windows-Event-Viewer',
      description: 'Windows Event Viewer lab focused on reviewing logs, spotting activity patterns, and understanding host telemetry.',
      tools: ['Windows Event Viewer', 'Log Analysis', 'Host Investigation'],
      date: 'Day 01',
      status: 'Completed',
      reportHref: 'https://github.com/cyber5957/SOC-Labs/tree/main/Day-01-Windows-Event-Viewer',
      githubHref: 'https://github.com/cyber5957/SOC-Labs/tree/main/Day-01-Windows-Event-Viewer'
    },
    {
      title: 'Windows-Authentication-Logs',
      description: 'Authentication log lab covering successful and failed logons, user activity, and account-based investigation.',
      tools: ['Authentication Logs', 'Windows Security', 'Analysis'],
      date: 'Day 02',
      status: 'Completed',
      reportHref: 'https://github.com/cyber5957/SOC-Labs/tree/main/Day-02-Windows-Authentication-Logs',
      githubHref: 'https://github.com/cyber5957/SOC-Labs/tree/main/Day-02-Windows-Authentication-Logs'
    },
    {
      title: 'Process-Creation-Analysis',
      description: 'Process creation analysis lab focused on identifying execution chains, suspicious parent-child relationships, and host artifacts.',
      tools: ['Process Analysis', 'Windows Logs', 'Threat Hunting'],
      date: 'Day 03',
      status: 'In Progress',
      reportHref: 'https://github.com/cyber5957/SOC-Labs/tree/main/Day-03-Process-Creation-Analysis',
      githubHref: 'https://github.com/cyber5957/SOC-Labs/tree/main/Day-03-Process-Creation-Analysis'
    }
  ],
  journey: [
    {
      title: 'Started BCA in Cyber Security & Digital Forensics',
      year: '2024',
      summary: 'Started my degree and began building core security awareness.'
    },
    {
      title: 'Built foundations in networking, Linux, and cybersecurity fundamentals',
      year: '2025',
      summary: 'Strengthened technical basics through structured study and practice.'
    },
    {
      title: 'Completed OverTheWire Bandit challenges and began hands-on security practice',
      year: '2025',
      summary: 'Moved from theory into active hands-on problem solving.'
    },
    {
      title: 'Earned certificates in cybersecurity fundamentals, networking, SQL, and TryHackMe learning paths',
      year: '2026',
      summary: 'Expanded practical exposure through guided security learning and skill validation.'
    },
    {
      title: 'Participated in hackathons, technical projects, and collaborative development experiences',
      year: '2026',
      summary: 'Gained experience working with teams and building under time pressure.'
    },
    {
      title: 'Created and documented cybersecurity labs, reports, and portfolio projects through GitHub and LinkedIn',
      year: '2026',
      summary: 'Started publishing work publicly to track progress and stay accountable.'
    },
    {
      title: 'Focused on Blue Team operations, threat detection, log analysis, and SOC Analyst skill development',
      year: 'Present',
      summary: 'Continuing to sharpen SOC-oriented defensive and analytical skills.'
    }
  ],
  skills: [
    {
      title: 'Blue Team & Forensics',
      items: ['Network Analysis', 'Packet Capture', 'Digital Forensics', 'Log Analysis']
    },
    {
      title: 'Programming & Scripting',
      items: ['Python', 'Bash', 'SQL (Basic)']
    },
    {
      title: 'Tools & Platforms',
      items: ['Wireshark', 'Linux', 'Nmap', 'SIEM (Learning)']
    }
  ],
  professionalSnapshot: [
    {
      title: 'Current Focus',
      text: 'Blue Team operations, threat detection, log analysis, and incident response.'
    },
    {
      title: 'Hands-on Proof',
      text: 'TryHackMe labs, CTF practice, and documented SOC lab investigations.'
    },
    {
      title: 'Goal Role',
      text: 'Security Operations, Threat Detection, and Defensive Security roles.'
    }
  ],
  toolkit: ['Wireshark', 'Nmap', 'Linux', 'TryHackMe', 'Log Analysis', 'Incident Response'],
  learningHeatmap: [
    { month: 'January', bars: [5, 6, 7, 6, 5, 6, 7, 8, 7] },
    { month: 'February', bars: [6, 7, 8, 8, 7, 6, 7, 8, 8] },
    { month: 'March', bars: [7, 8, 9, 8, 9, 8, 9, 9, 10] }
  ],
  certifications: [
    {
      title: 'Pre Security Learning Path',
      provider: 'TryHackMe',
      issuer: 'TryHackMe',
      date: '15 Mar 2026',
      status: 'Completed',
      summary: 'Completed the foundational learning path that strengthened core cybersecurity awareness and SOC readiness.',
      skills: ['Security Fundamentals', 'Threat Awareness', 'SOC Basics', 'Practical Labs'],
      learningPath: 'SOC Fundamentals',
      href: '/certificates/pre-security.png',
      image: '/certificates/pre-security.png',
      category: 'Learning Path'
    },
    {
      title: 'Introduction to Cybersecurity',
      provider: 'Cisco Networking Academy',
      issuer: 'Cisco Networking Academy',
      date: '17 Aug 2025',
      status: 'Completed',
      summary: 'Covered the core concepts of cybersecurity, common threats, and the role of defensive practice.',
      skills: ['Cybersecurity Basics', 'Threat Types', 'Defensive Mindset'],
      learningPath: 'Cybersecurity Foundations',
      href: '/certificates/intro-to-cyber-security.jpg',
      image: '/certificates/intro-to-cyber-security.jpg',
      category: 'Course'
    },
    {
      title: 'Networking Basics',
      provider: 'Cisco Networking Academy',
      issuer: 'Cisco Networking Academy',
      date: '27 Aug 2025',
      status: 'Completed',
      summary: 'Validated understanding of the network stack, basic routing concepts, and essential networking terminology.',
      skills: ['Networking Fundamentals', 'Protocols', 'IP Concepts'],
      learningPath: 'Cybersecurity Foundations',
      href: '/certificates/network-basics-certification.jpg',
      image: '/certificates/network-basics-certification.jpg',
      category: 'Course'
    },
    {
      title: 'SQL (Basic)',
      provider: 'HackerRank',
      issuer: 'HackerRank',
      date: '08 Apr 2025',
      status: 'Completed',
      summary: 'Passed the SQL Basic assessment and demonstrated query fundamentals, filtering, and data retrieval.',
      skills: ['SQL Basics', 'Filtering', 'Query Logic', 'Data Handling'],
      learningPath: 'Technical Foundations',
      href: '/certificates/sql-basic.png',
      image: '/certificates/sql-basic.png',
      category: 'Assessment'
    },
    {
      title: 'Code Rush: The Algorithm Chase',
      provider: 'BBD University',
      issuer: 'School of Computer Applications, BBD University',
      date: '13 Aug 2025',
      status: 'Completed',
      summary: 'Participated in the algorithmic challenge event and strengthened speed, logic, and problem-solving under pressure.',
      skills: ['Algorithms', 'Problem Solving', 'Competitive Thinking'],
      learningPath: 'Problem Solving Drills',
      href: '/certificates/code-rush.png',
      image: '/certificates/code-rush.png',
      category: 'Competition'
    },
    {
      title: 'Escalate X V2',
      provider: 'Cyberonites Club, GLA University',
      issuer: 'GLA University',
      date: '2025',
      status: 'Completed',
      summary: 'Completed the cybersecurity competition participation certificate and expanded exposure to challenge-based learning.',
      skills: ['Cybersecurity Challenge', 'Teamwork', 'Rapid Analysis'],
      learningPath: 'Challenge Practice',
      href: '/certificates/ctf-participation.png',
      image: '/certificates/ctf-participation.png',
      category: 'Competition'
    },
    {
      title: 'KALPATHON 2.0 Coding Hackathon',
      provider: 'Innosphere SOE Student Forum',
      issuer: 'BBD University',
      date: '09 Apr 2026',
      status: 'Completed',
      summary: 'Participated in the multi-track coding hackathon and practiced rapid solution building and collaboration.',
      skills: ['Hackathon Workflow', 'Collaboration', 'Rapid Prototyping'],
      learningPath: 'Hackathon Sprint Skills',
      href: '/certificates/kalpanathon.png',
      image: '/certificates/kalpanathon.png',
      category: 'Hackathon'
    },
    {
      title: 'Team Lakshya Appreciation',
      provider: 'Team Lakshya',
      issuer: 'School of Computer Applications, BBD University',
      date: '2025-2026',
      status: 'Completed',
      summary: 'Recognized for consistent contribution, dedication, and support as an outstanding member of Team Lakshya.',
      skills: ['Leadership', 'Consistency', 'Team Contribution'],
      learningPath: 'Leadership and Teamwork',
      href: '/certificates/team-lakshya-appreciation.png',
      image: '/certificates/team-lakshya-appreciation.png',
      category: 'Recognition'
    }
  ],
  reports: [
    {
      title: 'Windows-Event-Viewer',
      category: 'Featured Investigation',
      summary: 'Windows Event Viewer lab focused on reviewing logs, spotting activity patterns, and understanding host telemetry.',
      skills: ['Windows Event Viewer', 'Log Analysis', 'Host Investigation'],
      href: 'https://github.com/cyber5957/SOC-Labs/tree/main/Day-01-Windows-Event-Viewer'
    },
    {
      title: 'Windows-Authentication-Logs',
      category: 'Featured Investigation',
      summary: 'Authentication log lab covering successful and failed logons, user activity, and account-based investigation.',
      skills: ['Authentication Logs', 'Windows Security', 'Analysis'],
      href: 'https://github.com/cyber5957/SOC-Labs/tree/main/Day-02-Windows-Authentication-Logs'
    },
    {
      title: 'Process-Creation-Analysis',
      category: 'Featured Investigation',
      summary: 'Process creation analysis lab focused on identifying execution chains, suspicious parent-child relationships, and host artifacts.',
      skills: ['Process Analysis', 'Windows Logs', 'Threat Hunting'],
      href: 'https://github.com/cyber5957/SOC-Labs/tree/main/Day-03-Process-Creation-Analysis'
    }
  ],
  journeyTitle: 'Cybersecurity Journey',
  journeySubtitle: 'Learning in Public | Building Practical Skills | Preparing for Security Operations',
  about:
    'I am a Cybersecurity student pursuing a BCA in Cyber Security & Digital Forensics at Babu Banarasi Das University, with a growing focus on Security Operations Center (SOC) practices, Blue Team operations, and digital investigations.\n\nMy learning approach is centered on hands-on experience. Through TryHackMe labs, CTF challenges, cybersecurity simulations, and independent research, I continuously build practical skills in log analysis, network monitoring, threat detection, and incident response. I also document my findings through technical reports, GitHub projects, and professional posts to demonstrate my learning journey and commitment to the field.\n\nAs I continue to expand my technical knowledge and practical experience, I am actively preparing for opportunities in Security Operations, Threat Detection, and Defensive Security, with the long-term goal of becoming a skilled SOC Analyst.',
  socials: [
    { label: 'GitHub', href: 'https://github.com/cyber5957', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vinayak-chauhan-a438b9375', icon: 'linkedin' },
    { label: 'Email', href: 'mailto:coderspoint1587@gmail.com', icon: 'mail' }
  ],
  footerLinks: [
    { label: 'Projects', href: '#projects' }
  ],
  contact: {
    email: 'coderspoint1587@gmail.com',
    phone: '+91-XXXXXXXXXX',
    location: 'Lucknow, India'
  }
} as const;

export type CaseFile = (typeof siteContent)['caseFiles'][number];
