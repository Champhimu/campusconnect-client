
// data.js

// Companies
export const companies = [
  {
    id: 'innovatech-solutions',
    name: 'Innovatech Solutions',
    description: 'Pioneering the future of technology with cutting-edge solutions.',
    longDescription: 'Innovatech Solutions is a leader in creating next-generation software for a variety of industries. We believe in the power of innovation to solve complex problems and drive progress. Our team is composed of brilliant minds dedicated to pushing the boundaries of what\'s possible.',
    logo: 'innovatech-solutions-logo',
    website: 'https://innovatech.com',
    values: ['Innovation', 'Integrity', 'Collaboration', 'Excellence'],
    culture: 'We foster a dynamic and collaborative environment where creativity and new ideas are celebrated. Our open-door policy ensures that everyone\'s voice is heard, and we invest heavily in our employees\' growth and development.',
  },
  {
    id: 'quantum-dynamics',
    name: 'Quantum Dynamics',
    description: 'Harnessing the power of quantum computing to solve global challenges.',
    longDescription: 'Quantum Dynamics is at the forefront of the quantum computing revolution. We are developing powerful algorithms and hardware to tackle problems in medicine, finance, and materials science that are currently intractable for classical computers.',
    logo: 'quantum-dynamics-logo',
    website: 'https://quantumdynamics.com',
    values: ['Discovery', 'Impact', 'Rigor', 'Teamwork'],
    culture: 'Our research-driven culture attracts top scientists and engineers from around the world. We offer a stimulating environment for those who are passionate about solving some of the world\'s most important problems.',
  },
  {
    id: 'nexgen-robotics',
    name: 'NexGen Robotics',
    description: 'Building the next generation of autonomous systems.',
    longDescription: 'NexGen Robotics specializes in advanced robotics and AI. From autonomous drones to smart manufacturing robots, our products are designed to increase efficiency and safety across industries. We are a team of builders and dreamers, creating the future of automation.',
    logo: 'nexgen-robotics-logo',
    website: 'https://nexgenrobotics.com',
    values: ['Automation', 'Safety', 'Efficiency', 'Creativity'],
    culture: 'At NexGen, we have a hands-on, fast-paced culture. We love to build, test, and iterate. If you are passionate about robotics and want to see your work make a real-world impact, you\'ll fit right in.',
  },
  {
    id: 'biosynth-labs',
    name: 'BioSynth Labs',
    description: 'Engineering biology to improve human health and sustainability.',
    longDescription: 'BioSynth Labs uses synthetic biology to develop novel therapeutics, sustainable materials, and eco-friendly chemicals. Our work is at the intersection of biology, engineering, and computer science.',
    logo: 'biosynth-labs-logo',
    website: 'https://biosynth.com',
    values: ['Sustainability', 'Health', 'Bio-innovation', 'Ethics'],
    culture: 'We are a mission-driven company with a strong focus on ethical and sustainable innovation. Our team is collaborative, curious, and committed to making a positive impact on the planet.',
  },
];

// Jobs
export const jobs = [
  {
    id: 'job-001',
    title: 'Software Engineer, Frontend',
    companyId: 'innovatech-solutions',
    location: 'San Francisco, CA',
    description: 'Join our frontend team to build beautiful and intuitive user interfaces for our flagship products. You will work with modern web technologies to create seamless user experiences.',
    requirements: ['React', 'TypeScript', 'CSS-in-JS', 'REST APIs', 'GraphQL'],
    responsibilities: ['Develop new user-facing features', 'Build reusable code and libraries for future use', 'Ensure the technical feasibility of UI/UX designs', 'Optimize application for maximum speed and scalability'],
  },
  {
    id: 'job-002',
    title: 'Quantum Research Scientist',
    companyId: 'quantum-dynamics',
    location: 'Boston, MA',
    description: 'Conduct groundbreaking research in quantum algorithms. This role involves theoretical work and simulation to develop new quantum computing methods.',
    requirements: ['PhD in Physics, Computer Science, or related field', 'Strong background in quantum mechanics and quantum information theory', 'Experience with quantum simulation tools', 'Python'],
    responsibilities: ['Design and analyze quantum algorithms', 'Publish research in top-tier journals and conferences', 'Collaborate with hardware teams to test algorithms on quantum processors'],
  },
  {
    id: 'job-003',
    title: 'Robotics Engineer',
    companyId: 'nexgen-robotics',
    location: 'Austin, TX',
    description: 'Design, build, and test autonomous robots. This is a hands-on role that involves hardware and software development.',
    requirements: ['Experience with ROS', 'C++', 'Python', 'Solid understanding of kinematics, dynamics, and control systems', 'CAD software proficiency'],
    responsibilities: ['Develop software for robot navigation and manipulation', 'Design mechanical and electrical components', 'Integrate sensors and actuators', 'Conduct field tests and deployments'],
  },
  {
    id: 'job-004',
    title: 'Data Scientist',
    companyId: 'innovatech-solutions',
    location: 'New York, NY',
    description: 'Analyze large datasets to extract meaningful insights and inform business decisions. You will work on projects ranging from predictive modeling to customer segmentation.',
    requirements: ['Python', 'R', 'SQL', 'Experience with machine learning frameworks (e.g., Scikit-learn, TensorFlow, PyTorch)', 'Strong statistical knowledge'],
    responsibilities: ['Build and deploy machine learning models', 'Create data visualizations and dashboards', 'Communicate findings to technical and non-technical stakeholders'],
  },
  {
    id: 'job-005',
    title: 'Synthetic Biologist',
    companyId: 'biosynth-labs',
    location: 'San Diego, CA',
    description: 'Genetically engineer microorganisms for the production of specialty chemicals. This role is lab-based and involves extensive use of molecular biology techniques.',
    requirements: ['PhD or MS in Bioengineering, Molecular Biology, or related field', 'Experience with CRISPR, DNA assembly, and metabolic engineering', 'Familiarity with analytical techniques like HPLC and mass spectrometry'],
    responsibilities: ['Design and construct genetic circuits', 'Optimize microbial strains for improved production', 'Analyze experimental data and plan next steps'],
  },
];

// Applications
export const applications = [
  {
    id: 'app-001',
    jobId: 'job-001',
    studentId: 'student-123',
    status: 'Interviewing',
    dateApplied: '2023-10-15',
  },
  {
    id: 'app-002',
    jobId: 'job-004',
    studentId: 'student-123',
    status: 'Applied',
    dateApplied: '2023-10-20',
  },
  {
    id: 'app-003',
    jobId: 'job-002',
    studentId: 'student-123',
    status: 'Rejected',
    dateApplied: '2023-09-01',
  },
];
