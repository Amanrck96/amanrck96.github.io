import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BookUser, Briefcase, Code, FileText, GanttChartSquare, Github, Linkedin, Mail, MapPin, Phone, Star } from "lucide-react";

const findImage = (id: string): ImagePlaceholder => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    return {
      id: 'default',
      imageUrl: `https://picsum.photos/seed/${id}/1200/800`,
      imageHint: 'abstract placeholder',
      description: 'Default placeholder image',
    };
  }
  return image;
};

export const profile = {
  name: 'Aman Sah',
  title: 'Data Analyst & MIS Executive',
  profilePic: 'https://scontent.cdninstagram.com/v/t39.30808-6/500309682_24224647873889571_847236585883311838_n.jpg?stp=c0.45.1080.1350a_dst-jpg_e35_s480x480_tt6&_nc_cat=105&ig_cache_key=MzEyODQ1MzEyODM3OTYxNjcyMg%3D%3D.3-ccb1-7&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTQ0MC5zZHIuQzMifQ%3D%3D&_nc_ohc=YBTZD2i1IvYQ7kNvwHwxl9I&_nc_oc=AdmIa58wZPGoBck3s0KmUxrbe0-QmNzHisJuwkDPtf0gg9J8rIRxER9lrdyjvEX6YtLBIBQbtX-dg78JLNH4X0Y1&_nc_ad=z-m&_nc_cid=1174&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=cO6MtSQh-Am401_ELPncHQ&oh=00_AfeVBRKdBjc-NPMXGH2NG8TF4KKAxbBMSEF4nGehapoZqw&oe=68FF06D2',
  location: 'Cooch Behar, West Bengal',
  email: 'Amanrck69@gmail.com',
  phone: ['+91-9547526440', '+91-8250522929'],
  social: [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/amanrck69/', icon: Linkedin },
    { name: 'GitHub', url: 'https://amanrck96.github.io', icon: Github },
  ],
  resumeUrl: 'https://drive.google.com/file/d/1Jj_zEh0aF7NzIBmk7TVwsXO2FGhPbG2r/view?usp=sharing',
  summary:
    'Results-driven Data Analyst & MIS Executive with 6+ years of experience in data analytics, MIS reporting, and business intelligence. Expert in Advance Excel, Power BI, VBA, SQL, and Tableau, with a proven ability to deliver automated reporting solutions, improve operational efficiency, and enhance data-driven decision-making. Adept at predictive analytics, HR analytics, and process optimization.',
};

export const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Experience', href: '/experience' },
  { name: 'Skills', href: '/skills' },
  { name: 'Projects', href: '/projects' },
  { name: 'Certifications', href: '/certifications' },
  { name: 'Contact', href: '/contact' },
];

export const achievements = [
    { metric: '30+', description: 'hours/month saved via reporting automation', icon: Star },
    { metric: '20%', description: 'improvement in HR retention rates from analytics', icon: Star },
    { metric: '40%', description: 'increase in reporting clarity with data visualization', icon: Star },
];

export const experiences = [
  {
    role: 'Senior MIS Executive / Data Analyst',
    company: 'Intellipaat Software Solutions Pvt. Ltd',
    location: 'Bangalore',
    period: 'Jul 2024 – Nov 2024',
    tasks: [
      'Created and managed reports for 5,000+ employee call logs, attendance, and productivity.',
      'Developed monthly course-wise complaint reports improving customer satisfaction insights.',
      'Automated productivity tracking using Advance Excel & Power BI, reducing manual work by 30 hours/month.',
      'Delivered sales and purchase reports to optimize procurement and revenue tracking.',
      'Collaborated with HR for accurate salary and attendance analytics.',
      'Conducted ad-hoc data analysis to support decision-making.',
      'Created interactive dashboards for leadership to track performance KPIs in real time.',
      'Ensured data accuracy through regular audits and validation checks.',
    ],
  },
  {
    role: 'HR Analyst',
    company: 'Zetwerk Manufacturing Businesses Pvt. Ltd',
    location: 'Bangalore',
    period: 'Jun 2023 – Dec 2023',
    tasks: [
      'Designed and maintained HR Analytics System to monitor employee KPIs.',
      'Generated monthly HR reports on sales, expenses, and engagement metrics.',
      'Improved forecasting accuracy by 25% through predictive analytics.',
      'Established secure data retention policies in compliance with company standards.',
      'Supported HR in manpower planning and attrition analysis.',
      'Developed visual analytics for workforce diversity and skill mapping.',
      'Analyzed employee engagement survey data to identify trends and recommend improvements.',
      'Created and monitored dashboards to track recruitment metrics and time-to-hire.',
    ],
  },
  {
    role: 'Data Analyst',
    company: 'K12 Techno Services Pvt. Ltd',
    location: 'Bangalore',
    period: 'Oct 2022 – Mar 2023',
    tasks: [
      'Developed MIS dashboards for sales, revenue, and performance tracking.',
      'Automated data processing workflows using VBA & SQL.',
      'Conducted deep-dive data analysis to identify operational improvement areas.',
      'Designed data collection templates to standardize reporting processes.',
      'Provided actionable recommendations to improve operational efficiency.',
    ],
  },
  {
    role: 'MIS Executive',
    company: 'Poddar Car World',
    location: 'Jalpaiguri',
    period: 'Sep 2017 – Jun 2022',
    tasks: [
      'Managed MIS operations for sales, inventory, and service performance.',
      'Created automated Advance Excel dashboards to track key business metrics.',
      'Prepared monthly sales, service, and spare parts performance reports.',
    ],
  },
];

export const skills = {
    technical: {
      title: 'Technical Proficiency',
      icon: Code,
      items: [
        { name: 'Data Mapping & Analytics', description: 'Advanced data structuring, ETL processes, and analytics implementation' },
        { name: 'Microsoft Excel', description: 'Advanced VBA, Macros, Power Query, DAX, and complex financial modeling' },
        { name: 'Data Visualization', description: 'Power BI, Tableau, interactive dashboards, and KPI tracking' },
        { name: 'Programming & Automation', description: 'App Script, VBA, SQL, Python for process automation' },
      ]
    },
    business: {
      title: 'Business Analysis Skills',
      icon: Briefcase,
      items: [
        { name: 'Financial Analysis', description: 'Revenue forecasting, cost analysis, budgeting, and financial modeling' },
        { name: 'Process Analysis', description: 'Workflow optimization, process mapping, and efficiency improvement' },
        { name: 'Strategic Planning', description: 'Requirements gathering, stakeholder management, and solution design' },
        { name: 'Performance Analytics', description: 'KPI development, metric tracking, and performance optimization' },
      ]
    },
    management: {
      title: 'Management Expertise',
      icon: GanttChartSquare,
      items: [
        { name: 'MIS Development', description: 'End-to-end MIS implementation and optimization' },
        { name: 'Team Collaboration', description: 'Cross-functional team coordination and stakeholder management' },
        { name: 'Risk Management', description: 'Risk assessment, mitigation strategies, and compliance' },
        { name: 'Problem Solving', description: 'Critical thinking, analytical problem resolution, and decision-making' },
      ]
    }
};

export const projects = [
  {
    title: 'EraBooking',
    description: 'Live booking/demo application.',
    link: 'https://erabooking.vercel.app/',
    image: findImage('project-erabooking'),
  },
  {
    title: 'Tanumaya Dhikary Portfolio',
    description: 'Personal portfolio showcasing projects and technical write-ups.',
    link: 'https://tanumayadhikary.netlify.app/',
    image: findImage('project-tanumaya'),
  },
  {
    title: 'Tejaswini Dabade Portfolio',
    description: 'Another portfolio / project showcase highlighting UI and responsive work.',
    link: 'https://tejaswinidabade.netlify.app/',
    image: findImage('project-tejaswini'),
  },
];

export const certifications = [
  {
    title: 'Power BI Certified',
    issuer: 'Simplilearn',
    period: 'Issued',
    skills: 'Power BI, Data Visualization, Business Intelligence',
    link: 'https://drive.google.com/file/d/1F0n3txEf-OL0Dyc06ykxQ93rdub_I9F2/view?usp=sharing',
    icon: FileText
  },
  {
    title: 'Google Analytics Certification',
    issuer: 'Google',
    period: 'Issued',
    skills: 'Data Analysis, Analytical Skills, Data Analytics',
    link: 'https://drive.google.com/file/d/1B2t1VA-FZfys7ARRqhmPq9J19fi4Bn-c/view?usp=sharing',
    icon: FileText
  },
  {
    title: 'Advance Excel Macros & VBA',
    issuer: 'LinkedIn Learning',
    period: 'Issued',
    skills: 'Excel Models, Excel Dashboards, Excel Automation, VBA',
    link: 'https://drive.google.com/file/d/1O_XB1IQoJkVNXvYB9tDWyxwnJY56r3ib/view?usp=sharing',
    icon: FileText
  }
];

export const education = [
    {
        degree: 'B.C.A.',
        institution: 'Jaipur National University, Cooch Behar',
        year: '2019'
    },
    {
        degree: 'B.Com (Accounting & Finance)',
        institution: 'Cooch Behar Shree Hindi Vidyalaya',
        year: '2011'
    }
]

export const contactDetails = {
  email: 'Amanrck69@gmail.com',
  phone: ['9547526440', '8250522929'],
  address: 'S.N. Road, Near BSF Camp, Cooch Behar, West Bengal',
  icons: {
    email: Mail,
    phone: Phone,
    address: MapPin,
  },
};
