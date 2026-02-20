import {
  ClubOverview,
  ContactInfo,
  FitnessProgram,
  FoundationImpact,
  HistoryMilestone,
  PlayerSponsorProgram,
  ProjectStat,
  PurposeItem,
  SponsorshipTier,
  ValueItem
} from '../types';

export const CONTACT_INFO: ContactInfo = {
  name: 'Arthur',
  role: 'Eagles Rugby Club',
  phone: '+256 773 207 919',
  phoneHref: 'tel:+256773207919'
};

export const HOME_CONTENT = {
  highlights: [
    'Founded in 2019, Eagles Rugby Club was built to develop athletes, leaders, and responsible community members.',
    'We combine structured training, mentorship, and competition to create long-term player growth and social impact.'
  ],
  whySupport: [
    {
      title: 'Youth Development',
      description: 'Your support helps young athletes access quality coaching, match exposure, and mentorship.'
    },
    {
      title: 'Community Impact',
      description: 'Eagles programs contribute to safer, healthier, and more organized opportunities for children and families.'
    },
    {
      title: 'Player Growth',
      description: 'Sponsorship enables equipment, transport, and welfare support that turns potential into performance.'
    }
  ] as PurposeItem[]
};

export const ABOUT_CONTENT: {
  overview: ClubOverview;
  purpose: PurposeItem[];
  vision: string;
  mission: string;
  coreValues: ValueItem[];
  homeGround: string;
  growthCommitments: string[];
} = {
  overview: {
    title: 'Who We Are',
    summary: 'A structured, values-driven rugby institution for athlete and leadership development.',
    paragraphs: [
      'Eagles Rugby Club was founded in 2019 with a clear purpose: to build a disciplined rugby institution that develops athletes, leaders, and responsible members of the community.',
      'From inception, the club has focused on competitive performance, personal growth, and long-term development through organized training, mentorship, and competition.',
      'Eagles Rugby Club provides young athletes with access to rugby opportunities in a safe and supportive environment.'
    ]
  },
  purpose: [
    { title: 'Develop Rugby Talent', description: 'Structured coaching, clear performance standards, and regular competition.' },
    { title: 'Build Life Skills', description: 'Discipline, teamwork, leadership, resilience, and accountability.' },
    { title: 'Provide Mentorship', description: 'Positive guidance for youth within and beyond the rugby environment.' },
    { title: 'Create Development Pathways', description: 'Clear routes for players to progress to higher levels of rugby.' },
    { title: 'Strengthen Community Engagement', description: 'Use sport as a practical platform for social impact and inclusion.' }
  ],
  vision: 'To be recognized as the epitome of excellence in professional rugby through consistent performance, inclusive talent development, innovation, and a lasting legacy in the game.',
  mission: 'To establish Eagles Rugby Club as a leading force in rugby by providing elite resources, structured training, and strong support systems that foster teamwork, discipline, sportsmanship, and personal growth.',
  coreValues: [
    { name: 'Discipline', description: 'We maintain high standards in preparation, conduct, and performance.' },
    { name: 'Respect', description: 'We honor teammates, opponents, officials, coaches, and rugby traditions.' },
    { name: 'Integrity', description: 'We compete fairly and represent the club with honesty and pride.' },
    { name: 'Commitment', description: 'We stay dedicated to improvement, teamwork, and excellence.' },
    { name: 'Teamwork', description: 'We value collective effort above individual talent.' },
    { name: 'Community', description: 'We serve as a positive force for youth and local development.' }
  ],
  homeGround: 'Eagles Rugby Club is proudly based at Kitante Primary School, our official training and match venue, where skills are refined and team culture is built.',
  growthCommitments: [
    'Strategic planning and strong leadership',
    'Youth development programs',
    'Community partnerships',
    'Responsible financial management',
    'Continuous performance improvement'
  ]
};

export const HISTORY_CONTENT: {
  intro: string;
  milestones: HistoryMilestone[];
  closing: string;
} = {
  intro: 'Founded in 2019 by Arthur Kampani at Kitante Primary School, Eagles Rugby Club began as a focused youth rugby initiative and has grown into a structured institution combining competitive rugby, leadership development, and practical community impact.',
  milestones: [
    {
      year: '2019',
      title: 'Foundation at Kitante',
      description: 'Eagles Rugby Club was established at Kitante Primary School with a clear mission: build disciplined athletes, develop character, and create opportunities for young people through sport.'
    },
    {
      year: '2020',
      title: 'Program Structuring',
      description: 'The club introduced more organized training schedules, role clarity, and player mentorship routines to strengthen consistency and long-term development.'
    },
    {
      year: '2021-2022',
      title: 'Competitive Consolidation',
      description: 'Eagles improved its match preparedness and player depth, helping the team build competitive identity and a stronger culture of accountability.'
    },
    {
      year: '2023',
      title: 'Leadership and Community Expansion',
      description: 'Club leadership structures matured while community-facing programs expanded to support youth participation, education continuity, and safer development pathways.'
    },
    {
      year: '2024-Present',
      title: 'Institutional Growth and Partnerships',
      description: 'Eagles continues to raise performance standards, grow sponsorship partnerships, and invest in infrastructure, player welfare, and long-term community outcomes.'
    }
  ],
  closing: 'Today, Eagles Rugby Club stands as a values-driven organization committed to discipline, teamwork, leadership, and sustainable social impact through rugby. The journey continues with a focus on performance, professionalism, and empowering the next generation.'
};

export const FITNESS_CONTENT: FitnessProgram = {
  intro: 'Eagles Fitness Club provides professionally guided sessions designed to build strength, endurance, discipline, and overall wellbeing.',
  schedule: 'Training runs every Tuesday and Thursday, 5:00 PM to 7:00 PM.',
  pricing: [
    'UGX 20,000 per session',
    'Registered members receive a 20% discount'
  ],
  benefits: [
    'Improves cardiovascular and muscular health',
    'Builds endurance and physical resilience',
    'Reduces stress and supports mental focus',
    'Promotes consistent healthy routines'
  ],
  feeUse: [
    'Equipment maintenance and upgrades',
    'Facility management and standards',
    'Safety compliance and supervision',
    'Qualified coaching services'
  ]
};

export const PROJECTS_CONTENT: {
  summary: string[];
  stats: ProjectStat[];
  whyItMatters: string[];
  supportOptions: string[];
} = {
  summary: [
    'Eagles Rugby Club is raising support to construct permanent spectator stands at our home ground.',
    'The facility serves approximately 4,000 children, and the project targets safe seating for at least 2,000 learners during school and sporting events.'
  ],
  stats: [
    { label: 'Children Served', value: '4,000', description: 'Current school and activity population using the facility.' },
    { label: 'Seating Target', value: '2,000', description: 'Children to be safely seated through phased stand construction.' },
    { label: 'Capacity per Stand', value: '200', description: 'Students accommodated by each completed stand.' },
    { label: 'Cost per Stand', value: 'USD 3,800', description: 'Estimated construction cost for one durable stand.' }
  ],
  whyItMatters: [
    'Improves child safety and comfort',
    'Strengthens match-day and school event organization',
    'Supports supervision during break and lunch periods',
    'Creates long-term infrastructure for youth development'
  ],
  supportOptions: [
    'Sponsor the full construction of one stand',
    'Contribute toward one or more stands',
    'Partner through in-kind or institutional support'
  ]
};

export const FOUNDATION_CONTENT: {
  mission: string;
  impacts: FoundationImpact[];
  partnership: string;
} = {
  mission: 'The Eagles Rugby Foundation supports children from struggling families by contributing school fees so they can remain in school and continue growing academically and in sport.',
  impacts: [
    { title: 'Keep Children in School', description: 'Direct support toward fees for vulnerable learners.' },
    { title: 'Support Families', description: 'Eases financial pressure for households facing hardship.' },
    { title: 'Promote Equal Opportunity', description: 'Helps ensure education and growth are not limited by income.' },
    { title: 'Build Future Leaders', description: 'Combines sport, education, and character development.' },
    { title: 'Strengthen Community Stability', description: 'Invests in social resilience through practical support.' }
  ],
  partnership: 'We welcome companies, individuals, and development partners to collaborate through sponsorship, donations, and shared community programs.'
};

export const SPONSOR_US_CONTENT: {
  businessCase: PurposeItem[];
  sponsorshipNeeds: PurposeItem[];
  tiers: SponsorshipTier[];
  utilization: string[];
} = {
  businessCase: [
    { title: 'Brand Visibility', description: 'Exposure through jerseys, pitchside branding, club media, and event mentions.' },
    { title: 'Community Trust', description: 'Visible investment in youth development and social impact.' },
    { title: 'Audience Alignment', description: 'Access to engaged rugby supporters locally and regionally.' },
    { title: 'Networking Value', description: 'Connection with sponsors, club stakeholders, and community leaders.' }
  ],
  sponsorshipNeeds: [
    { title: 'Player Development', description: 'Coaching, training systems, equipment, and sports science support.' },
    { title: 'Facilities and Operations', description: 'Ground upgrades, utilities, and core administrative operations.' },
    { title: 'Community Outreach', description: 'Youth clinics, inclusion programs, and charity-linked activities.' },
    { title: 'Player Welfare', description: 'Scholarships, medical support, and wellbeing initiatives.' },
    { title: 'Growth and Legacy', description: 'Innovation, fan engagement, and long-term infrastructure projects.' }
  ],
  tiers: [
    {
      name: 'Platinum',
      price: 'USD 32,000',
      keyInclusions: [
        'Front-of-jersey naming rights',
        'Premium pitchside and press room visibility',
        'Brand ambassador access to players',
        'Four pitch-side advertising spaces (3m x 4m each)'
      ],
      benefits: [
        'Exclusive naming rights on front of official jersey',
        'Logo on pitchside advertising, pole protectors, and corner flags',
        'Recognition in press conference room and gameday signage',
        'Website and social media advertising support',
        'Player gear package and membership card benefits',
        'Award ceremony participation and branded recognition assets',
        'Merchandise and fitness-club discount privileges'
      ]
    },
    {
      name: 'Diamond',
      price: 'USD 21,000',
      keyInclusions: [
        'Chest jersey logo placement',
        'Strong media and event visibility',
        'Access to official club functions',
        'Three pitch-side advertising spaces (3m x 4m each)'
      ],
      benefits: [
        'Logo placement on right or left chest of jerseys',
        'Press room recognition and gameday signage',
        'Website, social media, and broadcast mention support',
        'Pitchside board visibility and member card package',
        'Player brand-ambassador collaboration options',
        'Merchandise and fitness-club discount privileges'
      ]
    },
    {
      name: 'Gold',
      price: 'USD 10,500',
      keyInclusions: [
        'Strong event-day branding',
        'Digital promotion support',
        'Club-function invitations',
        'Two pitch-side advertising spaces (3m x 4m each)'
      ],
      benefits: [
        'Recognition in press room and on gameday assets',
        'Pitchside board and social media visibility',
        'Fan communication support via SMS and media mentions',
        'Entry benefits, merchandise discounts, and function invites',
        'Player activation opportunities under agreement'
      ]
    },
    {
      name: 'Silver',
      price: 'USD 5,300',
      keyInclusions: [
        'Sleeve or shirt-number area logo options',
        'Core signage exposure',
        'Entry-level official partner benefits',
        'One pitch-side advertising space (3m x 4m)'
      ],
      benefits: [
        'Logo placement on sleeve or shirt-number zones',
        'Pitchside board and selected media visibility',
        'Membership and merchandise discount support',
        'Invitations to club functions and partner activations'
      ]
    }
  ],
  utilization: [
    'Scholarships and financial assistance for less-advantaged players',
    'Community outreach clinics and equipment support',
    'Youth development and mentorship programs',
    'Facility access, maintenance, and safety upgrades',
    'Nutrition, health, and wellbeing initiatives',
    'Transport assistance for training and match participation',
    'Educational support, tutoring, and life-skills development'
  ]
};

export const PLAYER_SPONSOR_CONTENT: PlayerSponsorProgram = {
  offer: 'Sponsor a player for UGX 200,000 per month and directly support their training, performance, and welfare journey.',
  supports: [
    'Training and coaching fees',
    'Match kits and equipment',
    'Transport to fixtures and tournaments',
    'Medical and injury support',
    'Player welfare and development programs'
  ],
  reasons: [
    'Invest in youth development and long-term character growth',
    'Promote your brand or social commitment through club recognition',
    'Contribute to disciplined, structured community engagement',
    'Help players turn potential into achievement'
  ]
};

export const DONATE_CONTENT = {
  intro: 'Your donation helps Eagles Rugby Club and Foundation sustain education support, player welfare, and youth development programs.',
  allocation: [
    {
      title: 'School Fees Support',
      description: 'Keeps vulnerable children in school through targeted fee assistance.'
    },
    {
      title: 'Youth Training Support',
      description: 'Funds coaching access, gear, and structured athlete development.'
    },
    {
      title: 'Player Welfare and Emergency Support',
      description: 'Supports medical needs, transport barriers, and urgent player assistance.'
    }
  ] as PurposeItem[]
};

export const SHOP_CONTENT = {
  intro: 'Every purchase from the Eagles Shop contributes to club development and community-focused programs.'
};

export const TV_CONTENT = {
  intro: 'Eagles TV shares match highlights, behind-the-scenes stories, and club moments that connect players, fans, and community.'
};
