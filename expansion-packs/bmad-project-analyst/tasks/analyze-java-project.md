# Analyze Java Project

This task involves conducting a comprehensive analysis of a Java web project to understand its architecture, technology stack, coding conventions, and development patterns. The analysis follows enterprise-grade standards and focuses on multi-module project structures.

## Analysis Framework:

### 1. **Project Structure Analysis**

- **Root Directory Examination**: Analyze project root structure, build files, and configuration
- **Module Architecture**: Identify multi-module structure and inter-module dependencies
- **Package Hierarchy**: Map package organization and naming conventions
- **Resource Organization**: Examine configuration files, static resources, and documentation
- **Business Entry Point Identification**:
  - Scan for Web API endpoints (Controller classes with @RestController, @Controller)
  - Identify background job entry points (classes with @Component, @Service for scheduled tasks)
  - Locate event handlers (classes with @EventListener, @RabbitListener, @KafkaListener)
  - Find other business entry points (WebSocket handlers, batch job entry points)
  - Assess entry point coverage and representativeness of the codebase

### 2. **Technology Stack Assessment**

- **Build System Analysis**:
  - Maven/Gradle configuration and version management
  - Plugin usage and build lifecycle customization
  - Dependency management and version constraints
- **Framework Identification**:
  - Spring ecosystem components (Boot, MVC, Data, Security, etc.)
  - Persistence frameworks (MyBatis, JPA, Hibernate)
  - Testing frameworks and utilities
- **Database Technologies**:
  - Database drivers and connection management
  - ORM configurations and mapping strategies
  - Migration tools and schema management
- **Infrastructure Components**:
  - Caching solutions (Redis, Ehcache)
  - Message queues and event handling
  - Monitoring and logging frameworks

### 3. **Architecture Pattern Analysis**

- **Layered Architecture**: Identify presentation, business, persistence layers
- **Separation of Concerns**: Analyze module responsibilities and boundaries
- **Dependency Injection**: Examine IoC container usage and bean management
- **Data Flow Patterns**: Trace request/response flow and data transformation
- **Design Patterns**: Identify common patterns (Factory, Strategy, Observer, etc.)

### 4. **Code Quality and Standards Evaluation**

- **Naming Conventions**:
  - Class, method, and variable naming patterns
  - Package naming standards
  - Constants and enum conventions
- **Code Organization**:
  - File structure within packages
  - Interface and implementation separation
  - Abstract class usage patterns
- **Documentation Standards**:
  - JavaDoc coverage and quality
  - README and technical documentation
  - API documentation practices

### 5. **Enterprise Patterns and Constraints**

- **Module Dependencies**: Map dependency relationships and identify circular dependencies
- **Version Compatibility**: Check Java version constraints and library compatibility
- **Security Patterns**: Analyze authentication, authorization, and data protection
- **Error Handling**: Examine exception handling strategies and error response patterns
- **Configuration Management**: Analyze property management and environment-specific configs

### 6. **Development Standards Assessment**

- **Java Version Constraints**:
  - Identify target Java version and compatibility requirements
  - Check for version-specific syntax usage
  - Validate library compatibility with Java version
- **Coding Conventions**:
  - Method signature patterns
  - Return type conventions
  - Parameter naming and validation
- **Testing Strategies**:
  - Unit test patterns and coverage
  - Integration test approaches
  - Mock usage and test data management

### 7. **Database Design Analysis**

- **Schema Conventions**: Table naming, field naming, and indexing patterns
- **Entity Relationships**: Analyze entity mappings and relationship patterns
- **Data Access Patterns**: Repository/DAO patterns and query strategies
- **Transaction Management**: Analyze transaction boundaries and isolation levels

### 8. **Performance and Scalability Patterns**

- **Caching Strategies**: Identify caching layers and invalidation patterns
- **Connection Management**: Database connection pooling and resource management
- **Async Processing**: Identify asynchronous processing patterns
- **Resource Optimization**: Memory usage and performance considerations

### 9. **Entry Point Based Deep Code Analysis**

- **Call Chain Tracing**:
  - Trace complete execution paths from entry points to DAO layer
  - Identify service layer interactions and data transformation points
  - Map cross-cutting concerns (logging, validation, security)
- **Code Style Pattern Extraction**:
  - Analyze naming conventions across call chains
  - Identify common method signature patterns
  - Extract team-specific coding habits and preferences
- **Middleware Integration Pattern Analysis**:
  - Identify message queue usage patterns within call chains
  - Analyze caching integration points and strategies
  - Map external API integration patterns
- **Architecture Pattern Recognition**:
  - Identify design patterns through call chain analysis
  - Recognize architectural patterns (layered, hexagonal, etc.)
  - Extract team's architectural decision patterns

## Analysis Checklist:

### ✅ **Structural Analysis**

- [ ] Project root structure documented
- [ ] Module dependencies mapped
- [ ] Package hierarchy analyzed
- [ ] Configuration files cataloged

### ✅ **Technology Assessment**

- [ ] Build system configuration analyzed
- [ ] Framework versions documented
- [ ] Database technologies identified
- [ ] Third-party libraries cataloged

### ✅ **Architecture Evaluation**

- [ ] Layer separation validated
- [ ] Design patterns identified
- [ ] Data flow documented
- [ ] Dependency injection patterns analyzed

### ✅ **Code Standards Review**

- [ ] Naming conventions documented
- [ ] Code organization patterns identified
- [ ] Documentation standards assessed
- [ ] Error handling patterns analyzed

### ✅ **Enterprise Compliance**

- [ ] Version constraints validated
- [ ] Security patterns documented
- [ ] Performance considerations noted
- [ ] Scalability patterns identified

## Output Requirements:

Use the comprehensive analysis findings to populate the ai-guideline-template with:

- Detailed project architecture documentation
- Complete technology stack specifications
- Comprehensive coding standards and conventions
- Specific implementation patterns and examples
- Development constraints and best practices
- Module-specific guidelines and dependencies
- **Entry Point Analysis Report**:
  - Business entry point inventory with categorization
  - Representative call chain analysis with detailed tracing
  - Code style and architecture pattern summary
  - Middleware integration pattern analysis
  - Team coding habits and best practices extraction
