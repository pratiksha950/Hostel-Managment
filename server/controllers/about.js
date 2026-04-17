const getAbout = (req, res) => {
  const aboutData = {
    projectName: "Smart Task Management Platform",
    tagline: "Empowering teams to achieve more through innovative technology solutions.",
    description: "A comprehensive platform that combines cutting-edge technology with intuitive design to streamline team collaboration and boost productivity.",
    problem: "In today's fast-paced digital world, teams struggle with inefficient workflows, poor communication, and lack of real-time collaboration tools that truly understand their needs.",
    solution: "We built a comprehensive platform that combines cutting-edge technology with intuitive design to streamline team collaboration and boost productivity.",
    mission: "To empower teams worldwide with innovative technology solutions that enhance collaboration, productivity, and success in the digital age.",
    vision: "To be the leading platform for team collaboration, setting new standards for productivity and innovation in the workplace.",
    team: [
      {
        name: "Alice Johnson",
        role: "CEO & Founder",
        bio: "Visionary leader with 10+ years in tech innovation and team management."
      },
      {
        name: "Bob Smith",
        role: "CTO",
        bio: "Expert in scalable architectures and modern web technologies."
      },
      {
        name: "Carol Davis",
        role: "Head of Design",
        bio: "Creative designer focused on user experience and interface design."
      },
      {
        name: "David Wilson",
        role: "Lead Developer",
        bio: "Full-stack developer passionate about clean code and performance."
      },
      {
        name: "Eva Brown",
        role: "Product Manager",
        bio: "Strategic thinker driving product development and user satisfaction."
      },
      {
        name: "Frank Miller",
        role: "DevOps Engineer",
        bio: "Infrastructure expert ensuring reliable and scalable deployments."
      }
    ]
  };

  res.json(aboutData);
};

export { getAbout };