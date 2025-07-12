
# Team Name: Async Ninjas

**Date:** 12th December 2025  
**Front End By:** Dhruv Singh  
**Back End By:** Kuldeep Kumar  

## OVERVIEW

**High level summary:**

WebsiteBoss is a comprehensive web application that enables users to create professional websites quickly using customizable templates. The platform provides a complete solution for businesses across multiple industries including cosmetics, education, pharmacy, and general business sectors. Users can select templates, customize them with their branding, content, and products/services, preview their websites, and download the complete code package.

## Design Details

**High Level Design Considerations:**

The application follows a modern three-tier architecture with clear separation of concerns:
- **Frontend Layer:** React-based SPA with TypeScript, providing intuitive user interface
- **Backend Layer:** Node.js/Express RESTful API with JWT authentication and file processing
- **Database Layer:** PostgreSQL with Prisma ORM for type-safe database operations

**Low Level Components:**

### Frontend Components:
- **Authentication System:** Sign-in/Sign-up forms with validation using React Hook Form + Zod
- **Template Management:** Template selection, customization interface with tabbed design
- **Project Management:** Dashboard for managing user projects with CRUD operations  
- **File Upload System:** Image upload with Cloudinary integration
- **Preview System:** Real-time website preview in iframe with responsive design
- **Order Management:** Complete e-commerce flow with payment options

### Backend Components:
- **Authentication Service:** JWT-based auth with bcrypt password hashing
- **Template Engine:** Dynamic code generation with placeholder replacement
- **File Processing:** Multer + Cloudinary for image uploads, Archiver for ZIP generation
- **Database Layer:** Prisma ORM with PostgreSQL for data persistence
- **API Routes:** RESTful endpoints for auth, templates, projects, uploads

### Database Schema:
- **Users:** User account management with encrypted passwords
- **Templates:** Reusable website templates with HTML/CSS/JS content
- **Projects:** User's customized websites with generated content
- **Uploads:** File management for user-uploaded images

## High Level Design Considerations

### Architecture Pattern
- **Frontend:** Component-based architecture with React hooks and context
- **Backend:** MVC pattern with Express.js middleware pipeline
- **Database:** Normalized relational schema with foreign key relationships
- **Authentication:** Stateless JWT tokens with 7-day expiration
- **File Storage:** Cloud-based storage with Cloudinary CDN

### Scalability Considerations
- **Database:** Indexed queries and optimized relationships
- **File Storage:** CDN integration for global content delivery
- **API:** RESTful design with proper HTTP status codes
- **Frontend:** Code splitting and lazy loading capabilities

### Security Implementation
- **Password Security:** bcrypt with 12 salt rounds
- **Authentication:** JWT with secure secret keys
- **Input Validation:** Server-side validation for all user inputs
- **File Upload:** Type and size validation with secure storage
- **CORS:** Configured for specific frontend origins

## LLD - UI

### Page Structure
- **Landing Page (/):** Hero section, features, testimonials, CTA
- **Authentication (/signin, /signup):** Form-based auth with validation
- **Dashboard (/dashboard):** Project management with statistics
- **Templates (/templates):** Template gallery with industry filters
- **Editor (/editor):** Multi-tab customization interface
- **Preview (/preview):** Live website preview with browser simulation
- **Order (/order):** E-commerce checkout with payment options

### Component Hierarchy
```
App
├── Navbar (Authentication, Theme Toggle)
├── Router
│   ├── Index (Landing Page)
│   ├── SignIn/SignUp (Authentication)
│   ├── Dashboard (Project Management)
│   ├── Templates (Template Selection)
│   ├── TemplateEditor (Customization Interface)
│   ├── Preview (Website Preview)
│   └── Order (E-commerce Checkout)
└── Theme Provider (Dark/Light Mode)
```

### State Management
- **Local State:** useState/useEffect for component-level state
- **Global State:** React Context for authentication and theme
- **Form State:** React Hook Form for complex form management
- **API State:** Direct API calls with loading/error handling

## LLD - Web Service/MicroService/Backend

### API Architecture
```
/api
├── /auth (Authentication endpoints)
│   ├── POST /signup (User registration)
│   └── POST /signin (User authentication)
├── /templates (Template management)
│   ├── GET / (List templates)
│   └── GET /:id (Get specific template)
├── /projects (Project CRUD operations)
│   ├── GET / (User projects)
│   ├── POST / (Create project)
│   ├── GET /:id (Get project)
│   ├── PUT /:id (Update project)
│   ├── DELETE /:id (Delete project)
│   └── GET /:id/download (Download ZIP)
└── /upload (File management)
    ├── POST /image (Upload image)
    ├── GET / (List uploads)
    └── DELETE /:id (Delete upload)
```

### Middleware Pipeline
1. **CORS Handler:** Cross-origin request processing
2. **Body Parser:** JSON/URL-encoded request parsing
3. **Authentication:** JWT token validation for protected routes
4. **Route Handler:** Business logic execution
5. **Error Handler:** Centralized error processing

### Database Operations
- **Connection:** PostgreSQL with connection pooling
- **ORM:** Prisma for type-safe database operations
- **Migrations:** Version-controlled schema changes
- **Seeding:** Sample data for development/testing

### External Integrations
- **Cloudinary:** Image upload and optimization
- **JWT:** Secure token-based authentication
- **File System:** Temporary file processing for ZIP generation

## Working Application

**Key Features Implemented:**

### User Authentication
- Secure registration and login system
- JWT-based session management
- Protected routes for authenticated users
- Password encryption with bcrypt

### Template System
- Multiple industry-specific templates (Cosmetics, Education, Pharmacy)
- Dynamic template selection with preview images
- Customizable template fields and content areas
- Real-time template customization interface

### Project Management
- Create projects from templates
- Edit existing projects with persistent data
- Delete unwanted projects
- Download complete website packages as ZIP files

### Customization Interface
- **Basic Info Tab:** Business details, contact information
- **Design Tab:** Logo upload, color customization, branding
- **Content Tab:** Products/services management with CRUD operations
- **Social Tab:** Social media links configuration

### E-commerce Integration
- Industry-specific "Buy Now"/"Add to Cart" buttons
- Complete order management system
- Payment method selection (UPI, Credit Card, COD)
- Delivery information collection
- Quantity selection and pricing calculation

### File Management
- Image upload with Cloudinary integration
- File type and size validation
- User-specific file organization
- Secure file deletion capabilities

### Preview & Export
- Real-time website preview in iframe
- Responsive design testing
- Complete code generation (HTML, CSS, JS)
- Downloadable website packages

**Screenshots and API Documentation:**
- All UI components feature modern dark theme with animations
- Responsive design across desktop and mobile devices
- RESTful API with proper HTTP status codes and error handling
- Comprehensive form validation and user feedback systems

## Assumptions

### Technical Assumptions
- Users have modern web browsers with JavaScript enabled
- Stable internet connection for file uploads and preview generation
- Basic understanding of website customization concepts
- Email addresses provided during registration are valid and accessible

### Business Assumptions
- Templates are sufficient for target industries without extensive customization needs
- Generated websites meet basic SEO and performance requirements
- Users prefer visual customization over code-level modifications
- Payment integration serves demonstration purposes (dummy implementation)

### Infrastructure Assumptions
- Cloudinary service availability for image storage and delivery
- PostgreSQL database performance adequate for concurrent users
- Server resources sufficient for ZIP file generation and processing
- JWT token security adequate for session management requirements
