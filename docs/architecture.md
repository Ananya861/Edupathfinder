
# EduPathfinder System Architecture

This document outlines the architecture of the EduPathfinder system, separating front-end and back-end components.

## Front-end (React + TypeScript)

### Technologies
- **React**: UI library for building component-based interfaces
- **TypeScript**: Static type checking for JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Shadcn UI**: UI component library
- **React Query**: Data fetching and cache management

### Structure
```
src/
├── components/        # Reusable UI components
│   ├── Layout.tsx     # Page layout wrapper
│   ├── Header.tsx     # Navigation header
│   ├── Footer.tsx     # Page footer
│   ├── DegreeCard.tsx # Degree program card
│   ├── CollegeCard.tsx # College card
│   └── ui/            # Shadcn UI components
├── pages/             # Route components
│   ├── Index.tsx      # Home page
│   ├── Degrees.tsx    # Degrees listing
│   ├── DegreeDetails.tsx # Single degree view
│   ├── Colleges.tsx   # Colleges listing
│   ├── CollegeDetails.tsx # Single college view
│   ├── Eligibility.tsx # Eligibility criteria
│   ├── Careers.tsx    # Career paths
│   └── Register.tsx   # Student registration
├── data/              # Mock data (to be replaced with API calls)
│   └── mockData.ts    # Degree and college data
├── hooks/             # Custom React hooks
│   └── use-toast.ts   # Toast notification hook
├── lib/               # Utility functions
│   └── utils.ts       # Helper utilities
└── api/               # API integration (to be implemented)
    ├── degrees.ts     # Degree-related API calls
    ├── colleges.ts    # College-related API calls
    └── auth.ts        # Authentication API calls
```

## Back-end (Spring Boot + Java 21 + PostgreSQL)

### Technologies
- **Spring Boot**: Java framework for building web applications
- **Java 21**: Programming language
- **PostgreSQL**: Relational database
- **JPA/Hibernate**: Object-relational mapping
- **Spring Security**: Authentication and authorization

### Structure
```
src/
├── main/
│   ├── java/
│   │   └── com/
│   │       └── edupathfinder/
│   │           ├── controllers/        # REST API controllers
│   │           │   ├── DegreeController.java
│   │           │   ├── CollegeController.java
│   │           │   ├── AuthController.java
│   │           │   └── StudentController.java
│   │           ├── models/             # Data models
│   │           │   ├── Degree.java
│   │           │   ├── College.java
│   │           │   ├── Student.java
│   │           │   └── User.java
│   │           ├── repositories/       # Data access objects
│   │           │   ├── DegreeRepository.java
│   │           │   ├── CollegeRepository.java
│   │           │   └── StudentRepository.java
│   │           ├── services/           # Business logic
│   │           │   ├── DegreeService.java
│   │           │   ├── CollegeService.java
│   │           │   └── StudentService.java
│   │           ├── security/           # Auth configuration
│   │           │   ├── WebSecurityConfig.java
│   │           │   └── JwtUtil.java
│   │           └── EduPathfinderApplication.java  # Entry point
│   └── resources/
│       ├── application.properties      # Application configuration
│       └── db/
│           └── migration/              # Database migration scripts
└── test/                               # Unit and integration tests
```

## Database Schema

### Tables
1. **Degrees**
   - id (PK)
   - name
   - description
   - duration
   - eligibility_criteria
   - category
   - created_at
   - updated_at

2. **Colleges**
   - id (PK)
   - name
   - description
   - location
   - rating
   - fees
   - website_url
   - image_url
   - created_at
   - updated_at

3. **College_Degrees** (Junction table)
   - college_id (FK)
   - degree_id (FK)
   - created_at

4. **Students**
   - id (PK)
   - name
   - email
   - phone
   - puc_stream
   - puc_percentage
   - preferred_degree
   - preferred_location
   - registration_date
   - notes

5. **Users**
   - id (PK)
   - username
   - email
   - password_hash
   - role
   - created_at
   - last_login

## API Endpoints

### Degree Endpoints
- `GET /api/degrees` - List all degrees
- `GET /api/degrees/{id}` - Get single degree
- `GET /api/degrees/category/{category}` - Get degrees by category
- `POST /api/degrees` - Create new degree (admin)
- `PUT /api/degrees/{id}` - Update degree (admin)
- `DELETE /api/degrees/{id}` - Delete degree (admin)

### College Endpoints
- `GET /api/colleges` - List all colleges
- `GET /api/colleges/{id}` - Get single college
- `GET /api/colleges/degree/{degreeId}` - Get colleges offering a specific degree
- `POST /api/colleges` - Create new college (admin)
- `PUT /api/colleges/{id}` - Update college (admin)
- `DELETE /api/colleges/{id}` - Delete college (admin)

### Student Registration
- `POST /api/students/register` - Register new student
- `GET /api/students` - List all students (admin)
- `GET /api/students/{id}` - Get student details (admin)

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Create admin account (super admin only)
- `GET /api/auth/me` - Get current user info

## Front-end to Back-end Integration

The front-end will communicate with the back-end through REST API calls:

1. **Data Fetching**: Replace mock data with API calls
   ```typescript
   // Current implementation (mock data)
   import { degrees } from "@/data/mockData";
   
   // Future implementation (API)
   import { fetchDegrees } from "@/api/degrees";
   
   // In component
   const { data: degrees, isLoading, error } = useQuery({
     queryKey: ['degrees'],
     queryFn: fetchDegrees
   });
   ```

2. **Form Submission**: Send user data to back-end
   ```typescript
   // In registration form
   const handleSubmit = async (data) => {
     try {
       await registerStudent(data);
       toast({
         title: "Registration successful",
         description: "Thank you for registering with EduPathfinder!"
       });
     } catch (error) {
       toast({
         title: "Registration failed",
         description: error.message,
         variant: "destructive"
       });
     }
   };
   ```

3. **Authentication**: Secure API endpoints
   ```typescript
   // API call with auth header
   const fetchProtectedData = async () => {
     const response = await fetch('/api/protected-endpoint', {
       headers: {
         'Authorization': `Bearer ${getToken()}`
       }
     });
     return response.json();
   };
   ```
