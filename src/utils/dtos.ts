interface SignUp {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

interface Login {
  email: string;
  password: string;
}

interface Employer {
  name: string;
  description: string;
}

interface Job {
  title: string;
  salary: string;
  summary: string;
  jobtype: string;
}

interface Candidate {
  bio: string;
  phone: string;
  location: string;
  skills: string[];
}

export const signUpDto = (body: any): SignUp => {
  return {
    name: body.name,
    username: body.username,
    email: body.email,
    password: body.password,
    role: body.role,
  };
};

export const loginDto = (body: any): Login => {
  return {
    email: body.email,
    password: body.password,
  };
};

export const employerDto = (body: any): Employer => {
  return {
    name: body.name,
    description: body.description,
  };
};

export const candidateDto = (body: any): Candidate => {
  return {
    bio: body.bio,
    phone: body.phone,
    location: body.location,
    skills: body.skills,
  };
};

export const jobDto = (body: any): Job => {
  return {
    title: body.title,
    salary: body.salary,
    summary: body.summary,
    jobtype: body.jobtype,
  };
};

export const jobOutputDto = (body: any) => {
  return {
    title: body.title,
    salary: body.salary,
    summary: body.summary,
    jobtype: body.jobtype,
    createdAt: body.createdAt.toLocaleDateString("fr-FR"),
    employer: {
      name: body.employer.name,
      description: body.employer.description,
    },
  };
};
