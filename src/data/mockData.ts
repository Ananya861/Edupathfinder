
export interface Degree {
  id: number;
  name: string;
  category: string;
  duration: string;
  description: string;
  eligibility: string[];
  careers: string[];
}

export interface College {
  id: number;
  name: string;
  location: string;
  rating: number;
  fees: string;
  degreesOffered: number[];
  description: string;
  imageUrl: string;
  isFeatured?: boolean;
  collegeCode?: string;
  specialization?: string[];
  rank?: number;
  affiliation?: string;
  features?: string[];
}

export const degrees: Degree[] = [
  {
    id: 1,
    name: "Bachelor of Computer Science",
    category: "Engineering & Technology",
    duration: "3-4 years",
    description: "A comprehensive program covering programming, algorithms, data structures, and computer architecture. Students learn to solve complex problems using computational principles.",
    eligibility: [
      "PUC with Mathematics as a core subject",
      "Minimum 60% aggregate in PUC",
      "Entrance exam may be required by some colleges"
    ],
    careers: [
      "Software Developer",
      "System Analyst",
      "Database Administrator",
      "Web Developer",
      "AI/Machine Learning Engineer"
    ]
  },
  {
    id: 2,
    name: "Bachelor of Business Administration",
    category: "Business & Management",
    duration: "3 years",
    description: "Focuses on developing management skills, business principles, and entrepreneurial thinking. Students gain insights into marketing, finance, human resources, and operations management.",
    eligibility: [
      "PUC in any stream",
      "Minimum 50% aggregate in PUC",
      "Some colleges conduct their own entrance test"
    ],
    careers: [
      "Business Manager",
      "Marketing Executive",
      "HR Specialist",
      "Entrepreneur",
      "Operations Manager"
    ]
  },
  {
    id: 3,
    name: "Bachelor of Medicine (MBBS)",
    category: "Medical & Health Sciences",
    duration: "5.5 years (including internship)",
    description: "Prepares students for medical practice through extensive study of human anatomy, physiology, pathology, pharmacology, and clinical training.",
    eligibility: [
      "PUC with Biology, Physics, and Chemistry",
      "Minimum 50% aggregate in these subjects",
      "NEET qualification mandatory"
    ],
    careers: [
      "General Physician",
      "Surgeon",
      "Clinical Specialist",
      "Medical Researcher",
      "Public Health Professional"
    ]
  },
  {
    id: 4,
    name: "Bachelor of Arts in Psychology",
    category: "Arts & Humanities",
    duration: "3 years",
    description: "Explores human behavior, cognitive processes, and psychological theories. Students learn research methodologies and counseling techniques.",
    eligibility: [
      "PUC in any stream",
      "Minimum 45-50% aggregate in PUC"
    ],
    careers: [
      "Counselor",
      "Human Resource Specialist",
      "Market Researcher",
      "Social Worker",
      "Educational Counselor"
    ]
  },
  {
    id: 5,
    name: "Bachelor of Science in Physics",
    category: "Science",
    duration: "3 years",
    description: "Focuses on understanding the fundamental laws of nature, from subatomic particles to cosmic phenomena. Students develop strong analytical and problem-solving skills.",
    eligibility: [
      "PUC with Physics and Mathematics",
      "Minimum 55% aggregate in PUC",
      "Some colleges may require entrance exams"
    ],
    careers: [
      "Research Scientist",
      "Data Analyst",
      "Teaching Professional",
      "Lab Technician",
      "Technical Consultant"
    ]
  },
  {
    id: 6,
    name: "Bachelor of Commerce",
    category: "Commerce & Finance",
    duration: "3 years",
    description: "Provides knowledge in accounting, finance, taxation, and business law. Students develop skills in financial analysis and business management.",
    eligibility: [
      "PUC in Commerce/Science stream preferred",
      "Minimum 45-50% aggregate in PUC"
    ],
    careers: [
      "Accountant",
      "Financial Analyst",
      "Tax Consultant",
      "Auditor",
      "Investment Banker"
    ]
  },
  {
    id: 7,
    name: "Bachelor of Technology in Civil Engineering",
    category: "Engineering & Technology",
    duration: "4 years",
    description: "Trains students in the design, construction, and maintenance of infrastructure such as buildings, roads, bridges, and water systems.",
    eligibility: [
      "PUC with Physics, Chemistry, and Mathematics",
      "Minimum 60% aggregate in PCM subjects",
      "JEE Main/State-level entrance exam qualification"
    ],
    careers: [
      "Civil Engineer",
      "Structural Engineer",
      "Construction Manager",
      "Urban Planner",
      "Environmental Engineer"
    ]
  },
  {
    id: 8,
    name: "Bachelor of Arts in Economics",
    category: "Arts & Humanities",
    duration: "3 years",
    description: "Studies economic theories, policies, and their applications. Students develop analytical skills to understand market forces, financial systems, and economic trends.",
    eligibility: [
      "PUC in any stream (Mathematics preferred)",
      "Minimum 50% aggregate in PUC"
    ],
    careers: [
      "Economic Analyst",
      "Policy Researcher",
      "Banking Professional",
      "Finance Consultant",
      "Public Sector Advisor"
    ]
  }
];

export const colleges: College[] = [
  {
    id: 1,
    name: "National Institute of Technology Karnataka",
    location: "Bangalore, Karnataka",
    rating: 4.8,
    fees: "₹80,000 - ₹2,50,000 per year",
    degreesOffered: [1, 7],
    description: "A premier engineering institution known for its excellent faculty, cutting-edge research facilities and industry collaborations.",
    imageUrl: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop",
    isFeatured: true,
    collegeCode: "NITK",
    specialization: ["Computer Science", "Electronics", "Mechanical Engineering"],
    rank: 3,
    affiliation: "Deemed University",
    features: ["Central Library", "Smart Classrooms", "International Exchange Programs", "Research Labs"]
  },
  {
    id: 2,
    name: "Christ University",
    location: "Bangalore, Karnataka",
    rating: 4.6,
    fees: "₹90,000 - ₹2,20,000 per year",
    degreesOffered: [2, 4, 6, 8],
    description: "Known for its academic excellence and holistic approach to education across various disciplines with a focus on research and innovation.",
    imageUrl: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop",
    isFeatured: true,
    collegeCode: "CU",
    specialization: ["Business Management", "Psychology", "Commerce", "Economics"],
    rank: 5,
    affiliation: "Deemed University",
    features: ["Industry Partnerships", "Cultural Exchange", "Placement Cell", "Entrepreneurship Cell"]
  },
  {
    id: 3,
    name: "Indian Institute of Science",
    location: "Bangalore, Karnataka",
    rating: 4.9,
    fees: "₹50,000 - ₹2,00,000 per year",
    degreesOffered: [1, 5, 7],
    description: "A premier research institution focusing on advanced scientific and technological research and education with global recognition.",
    imageUrl: "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop",
    isFeatured: true,
    collegeCode: "IISc",
    specialization: ["Physics", "Computer Science", "Engineering Physics", "Material Science"],
    rank: 1,
    affiliation: "Deemed University (Institute of National Importance)",
    features: ["Research Centers", "Collaborations with MIT", "Innovation Hub", "Science Park"]
  },
  {
    id: 4,
    name: "RV College of Engineering",
    location: "Bangalore, Karnataka",
    rating: 4.6,
    fees: "₹1,00,000 - ₹3,00,000 per year",
    degreesOffered: [1, 7],
    description: "One of the top engineering colleges in Bangalore with strong industry connections, modern infrastructure and excellent placements.",
    imageUrl: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop",
    isFeatured: true,
    collegeCode: "RVCE",
    specialization: ["Computer Science", "Electronics", "Mechanical", "Information Science"],
    rank: 7,
    affiliation: "Visvesvaraya Technological University",
    features: ["Incubation Center", "Robotics Lab", "Industry Partnerships", "Sports Complex"]
  },
  {
    id: 5,
    name: "PES University",
    location: "Bangalore, Karnataka",
    rating: 4.7,
    fees: "₹1,50,000 - ₹3,50,000 per year",
    degreesOffered: [1, 5, 7],
    description: "A renowned institution focused on providing quality education in engineering, medicine, and management with excellent research facilities.",
    imageUrl: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop",
    isFeatured: true,
    collegeCode: "PESU",
    specialization: ["Computer Science", "Electronics", "Biotechnology", "Mechanical"],
    rank: 6,
    affiliation: "Autonomous University",
    features: ["Design Center", "Research Park", "Incubation Hub", "Startup Ecosystem"]
  },
  {
    id: 6,
    name: "BMS College of Engineering",
    location: "Bangalore, Karnataka",
    rating: 4.5,
    fees: "₹90,000 - ₹2,80,000 per year",
    degreesOffered: [1, 7],
    description: "One of the oldest engineering colleges in Karnataka with strong alumni network, industry partnerships and modern facilities.",
    imageUrl: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?auto=format&fit=crop",
    isFeatured: true,
    collegeCode: "BMSCE",
    specialization: ["Computer Science", "Information Science", "Electronics", "Civil"],
    rank: 9,
    affiliation: "Visvesvaraya Technological University",
    features: ["Innovation Center", "Entrepreneurship Cell", "Industry Collaboration", "Cultural Activities"]
  },
  {
    id: 7,
    name: "Mount Carmel College",
    location: "Bangalore, Karnataka",
    rating: 4.3,
    fees: "₹40,000 - ₹1,20,000 per year",
    degreesOffered: [2, 4, 6, 8],
    description: "A premier women's college offering various undergraduate and postgraduate programs in arts, science, and commerce with focus on holistic development.",
    imageUrl: "https://images.unsplash.com/photo-1439337153520-7082a56a81f4?auto=format&fit=crop",
    collegeCode: "MCC",
    specialization: ["Psychology", "Commerce", "Economics", "Fashion Design"],
    rank: 15,
    affiliation: "Bengaluru North University",
    features: ["Cultural Programs", "Women Entrepreneurship Cell", "Career Guidance", "Community Outreach"]
  },
  {
    id: 8,
    name: "MS Ramaiah Institute of Technology",
    location: "Bangalore, Karnataka",
    rating: 4.5,
    fees: "₹1,00,000 - ₹3,00,000 per year",
    degreesOffered: [1, 7],
    description: "A top engineering institute known for its cutting-edge research, industry-focused curriculum and excellent placement record.",
    imageUrl: "https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a?auto=format&fit=crop",
    collegeCode: "MSRIT",
    specialization: ["Computer Science", "Information Science", "Electronics", "Mechanical"],
    rank: 10,
    affiliation: "Visvesvaraya Technological University",
    features: ["Innovation Hub", "Research Centers", "Entrepreneurship Cell", "Industry Collaboration"]
  },
  {
    id: 9,
    name: "Bangalore Medical College",
    location: "Bangalore, Karnataka",
    rating: 4.7,
    fees: "₹1,80,000 - ₹5,00,000 per year",
    degreesOffered: [3],
    description: "One of the premier medical colleges in South India with excellent clinical exposure, research opportunities and modern facilities.",
    imageUrl: "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?auto=format&fit=crop",
    collegeCode: "BMC",
    specialization: ["Medicine", "Surgery", "Pediatrics", "Gynecology"],
    rank: 4,
    affiliation: "Rajiv Gandhi University of Health Sciences",
    features: ["Hospital Attachment", "Research Labs", "Rural Healthcare Programs", "Medical Conferences"]
  },
  {
    id: 10,
    name: "St. Joseph's College",
    location: "Bangalore, Karnataka",
    rating: 4.4,
    fees: "₹30,000 - ₹1,10,000 per year",
    degreesOffered: [4, 5, 6, 8],
    description: "A renowned college offering various undergraduate and postgraduate programs with a focus on holistic development and research.",
    imageUrl: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop",
    collegeCode: "SJC",
    specialization: ["Arts", "Commerce", "Science", "Management"],
    rank: 12,
    affiliation: "Bengaluru Central University",
    features: ["Research Centers", "Cultural Activities", "Sports Facilities", "Community Service"]
  },
  {
    id: 11,
    name: "Bangalore Institute of Technology",
    location: "Bangalore, Karnataka",
    rating: 4.3,
    fees: "₹85,000 - ₹2,50,000 per year",
    degreesOffered: [1, 7],
    description: "A well-established engineering institute known for its quality education, placement opportunities and industry connections.",
    imageUrl: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop",
    isFeatured: true,
    collegeCode: "BIT",
    specialization: ["Computer Science", "Information Science", "Electronics", "Civil"],
    rank: 14,
    affiliation: "Visvesvaraya Technological University",
    features: ["Placement Cell", "Technical Fests", "Research Projects", "Industry Visits"]
  },
  {
    id: 12,
    name: "Ramaiah Institute of Management",
    location: "Bangalore, Karnataka",
    rating: 4.2,
    fees: "₹1,20,000 - ₹2,80,000 per year",
    degreesOffered: [2],
    description: "A premier business school offering quality management education with industry-relevant curriculum and practical exposure.",
    imageUrl: "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop",
    isFeatured: true,
    collegeCode: "RIM",
    specialization: ["Marketing", "Finance", "HR", "Operations"],
    rank: 18,
    affiliation: "Autonomous Institute",
    features: ["Corporate Partnerships", "Industry Projects", "Management Conferences", "Leadership Programs"]
  },
  {
    id: 13,
    name: "Jain University",
    location: "Bangalore, Karnataka",
    rating: 4.4,
    fees: "₹70,000 - ₹2,20,000 per year",
    degreesOffered: [1, 2, 4, 5, 6, 8],
    description: "A deemed-to-be university offering diverse programs across multiple disciplines with a focus on entrepreneurship and innovation.",
    imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop",
    isFeatured: true,
    collegeCode: "JU",
    specialization: ["Engineering", "Management", "Sciences", "Media Studies"],
    rank: 11,
    affiliation: "Deemed University",
    features: ["Incubation Cell", "Cultural Exchange Programs", "Sports Academy", "Research Centers"]
  },
  {
    id: 14,
    name: "Reva University",
    location: "Bangalore, Karnataka",
    rating: 4.2,
    fees: "₹80,000 - ₹2,50,000 per year",
    degreesOffered: [1, 2, 5, 7],
    description: "A private university with modern infrastructure, programs designed to meet industry requirements and focus on practical learning.",
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop",
    isFeatured: true,
    collegeCode: "REVA",
    specialization: ["Engineering", "Management", "Law", "Science"],
    rank: 17,
    affiliation: "Private University",
    features: ["Innovation Hub", "Startup Ecosystem", "Industry Connect", "Smart Campus"]
  },
  {
    id: 15,
    name: "CMR University",
    location: "Bangalore, Karnataka",
    rating: 4.1,
    fees: "₹75,000 - ₹2,30,000 per year",
    degreesOffered: [1, 2, 6, 8],
    description: "An institution known for its industry-focused curriculum, emphasis on practical learning and modern facilities.",
    imageUrl: "https://images.unsplash.com/photo-1439337153520-7082a56a81f4?auto=format&fit=crop",
    isFeatured: true,
    collegeCode: "CMRU",
    specialization: ["Engineering", "Management", "Law", "Commerce"],
    rank: 19,
    affiliation: "Private University",
    features: ["Entrepreneurship Cell", "Industry Partnerships", "Cultural Events", "Placement Support"]
  },
  {
    id: 16,
    name: "Dayananda Sagar College of Engineering",
    location: "Bangalore, Karnataka",
    rating: 4.3,
    fees: "₹90,000 - ₹2,70,000 per year",
    degreesOffered: [1, 7],
    description: "A renowned engineering institute with strong focus on research, innovation and industry collaboration.",
    imageUrl: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop",
    collegeCode: "DSCE",
    specialization: ["Computer Science", "Information Science", "AI & ML", "Data Science"],
    rank: 13,
    affiliation: "Visvesvaraya Technological University",
    features: ["Innovation Center", "Research Labs", "Technical Fests", "Incubation Cell"]
  },
  {
    id: 17,
    name: "New Horizon College of Engineering",
    location: "Bangalore, Karnataka",
    rating: 4.2,
    fees: "₹85,000 - ₹2,60,000 per year",
    degreesOffered: [1, 7],
    description: "An established engineering college known for its modern infrastructure, quality education and industry connections.",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop",
    collegeCode: "NHCE",
    specialization: ["Computer Science", "Mechanical", "Civil", "Electronics"],
    rank: 16,
    affiliation: "Visvesvaraya Technological University",
    features: ["Training Center", "Placement Cell", "Industry Projects", "Cultural Activities"]
  },
  {
    id: 18,
    name: "Bangalore Institute of Legal Studies",
    location: "Bangalore, Karnataka",
    rating: 4.0,
    fees: "₹70,000 - ₹1,80,000 per year",
    degreesOffered: [4, 8],
    description: "A premier law institute offering comprehensive legal education with focus on practical training and moot courts.",
    imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop",
    collegeCode: "BILS",
    specialization: ["Constitutional Law", "Corporate Law", "Criminal Law", "International Law"],
    rank: 22,
    affiliation: "Karnataka State Law University",
    features: ["Moot Court", "Legal Aid Cell", "Law Journals", "Legal Workshops"]
  },
  {
    id: 19,
    name: "Presidency College",
    location: "Bangalore, Karnataka",
    rating: 4.1,
    fees: "₹60,000 - ₹1,70,000 per year",
    degreesOffered: [2, 6, 8],
    description: "A well-established institution offering programs in commerce, management and arts with focus on practical exposure.",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop",
    collegeCode: "PC",
    specialization: ["Commerce", "Management", "Economics", "Accounting"],
    rank: 20,
    affiliation: "Bengaluru North University",
    features: ["Industry Exposure", "Placement Cell", "Business Lab", "Entrepreneurship Programs"]
  },
  {
    id: 20,
    name: "MVJ College of Engineering",
    location: "Bangalore, Karnataka",
    rating: 4.0,
    fees: "₹80,000 - ₹2,20,000 per year",
    degreesOffered: [1, 7],
    description: "An engineering college with strong focus on academics, research and industry-ready skill development.",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop",
    collegeCode: "MVJCE",
    specialization: ["Computer Science", "Electronics", "Mechanical", "Civil"],
    rank: 21,
    affiliation: "Visvesvaraya Technological University",
    features: ["Research Projects", "Technical Clubs", "Industry Collaboration", "Sports Facilities"]
  },
  {
    id: 21,
    name: "Oxford College of Engineering",
    location: "Bangalore, Karnataka",
    rating: 4.0,
    fees: "₹75,000 - ₹2,00,000 per year",
    degreesOffered: [1, 7],
    description: "An engineering institution committed to quality technical education with modern facilities and industry exposure.",
    imageUrl: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop",
    collegeCode: "OCE",
    specialization: ["Computer Science", "Information Technology", "Electronics", "Mechanical"],
    rank: 23,
    affiliation: "Visvesvaraya Technological University",
    features: ["Technical Workshops", "Research Cell", "Industry Visits", "Placement Training"]
  },
  {
    id: 22,
    name: "Acharya Institute of Technology",
    location: "Bangalore, Karnataka",
    rating: 4.1,
    fees: "₹80,000 - ₹2,40,000 per year",
    degreesOffered: [1, 7],
    description: "A diverse technical institution with global outlook, modern infrastructure and emphasis on holistic development.",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop",
    collegeCode: "AIT",
    specialization: ["Computer Science", "Electronics", "Civil", "Mechanical"],
    rank: 20,
    affiliation: "Visvesvaraya Technological University",
    features: ["International Collaborations", "Research Centers", "Cultural Diversity", "Technical Fests"]
  },
  {
    id: 23,
    name: "Sir M Visvesvaraya Institute of Technology",
    location: "Bangalore, Karnataka",
    rating: 4.0,
    fees: "₹70,000 - ₹2,10,000 per year",
    degreesOffered: [1, 7],
    description: "An engineering college dedicated to academic excellence, innovation and industry-ready skill development.",
    imageUrl: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop",
    collegeCode: "SMVIT",
    specialization: ["Computer Science", "Information Science", "Electronics", "Mechanical"],
    rank: 24,
    affiliation: "Visvesvaraya Technological University",
    features: ["Innovation Hub", "Technical Symposiums", "Industry Trainings", "Placement Cell"]
  },
  {
    id: 24,
    name: "Don Bosco Institute of Technology",
    location: "Bangalore, Karnataka",
    rating: 4.1,
    fees: "₹85,000 - ₹2,30,000 per year",
    degreesOffered: [1, 7],
    description: "An engineering institute with focus on value-based education, technical excellence and holistic development.",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop",
    collegeCode: "DBIT",
    specialization: ["Computer Science", "Electronics", "Mechanical", "Civil"],
    rank: 19,
    affiliation: "Visvesvaraya Technological University",
    features: ["Value Education", "Technical Clubs", "Community Service", "Industry Projects"]
  },
  {
    id: 25,
    name: "Alliance University",
    location: "Bangalore, Karnataka",
    rating: 4.3,
    fees: "₹1,20,000 - ₹3,00,000 per year",
    degreesOffered: [1, 2, 4, 8],
    description: "A private university offering diverse programs with focus on global education, research and industry partnerships.",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop",
    collegeCode: "AU",
    specialization: ["Engineering", "Business", "Law", "Liberal Arts"],
    rank: 8,
    affiliation: "Private University",
    features: ["Global Exposure", "Research Labs", "Industry Connect", "Entrepreneurship Cell"]
  }
];
