<!-- Powered by BMAD™ Core -->

# Project Analyst Knowledge Base

## Overview

The Project Analyst expansion pack specializes in comprehensive analysis of enterprise Java web applications. This knowledge base provides the foundational expertise for conducting thorough codebase analysis, identifying architectural patterns, and generating detailed AI development guidelines.

### Core Mission

Transform complex Java projects into well-documented, AI-friendly development environments by providing comprehensive analysis that enables consistent, high-quality AI-assisted development.

## Java Enterprise Analysis Framework

### 1. Multi-Module Architecture Patterns

#### Layered Architecture (Most Common)

- **Presentation Layer**: Controllers, REST endpoints, view models
- **Business Layer**: Services, business logic, workflows
- **Persistence Layer**: Repositories, DAOs, entity mappings
- **Infrastructure Layer**: Configuration, utilities, cross-cutting concerns

#### Hexagonal Architecture (Ports & Adapters)

- **Core Domain**: Business entities, value objects, domain services
- **Application Layer**: Use cases, application services, command/query handlers
- **Infrastructure**: Adapters for databases, external services, web frameworks
- **Ports**: Interfaces defining contracts between layers

#### Domain-Driven Design (DDD)

- **Bounded Contexts**: Distinct domain boundaries with their own models
- **Aggregates**: Clusters of related entities with consistency boundaries
- **Domain Services**: Business logic that doesn't naturally fit in entities
- **Repository Patterns**: Abstract data access for domain objects

### 2. Spring Ecosystem Analysis

#### Spring Boot Analysis Points

- **Auto-configuration**: Identify which auto-configurations are active
- **Starter Dependencies**: Catalog spring-boot-starter-\* dependencies
- **Configuration Properties**: Document application.yml/properties patterns
- **Profile Management**: Understand environment-specific configurations
- **Actuator Usage**: Health checks, metrics, and monitoring endpoints

#### Spring Framework Components

- **IoC Container**: Bean definitions, dependency injection patterns
- **AOP Usage**: Aspect-oriented programming for cross-cutting concerns
- **Spring MVC**: Web layer configuration and request handling
- **Spring Data**: Repository abstractions and data access patterns
- **Spring Security**: Authentication, authorization, and security configurations

### 3. Persistence Technology Patterns

#### MyBatis Patterns

- **Mapper Interfaces**: XML-based vs annotation-based SQL mapping
- **Result Mapping**: Complex object mapping and nested result handling
- **Dynamic SQL**: Conditional query building and parameter handling
- **Cache Configuration**: First-level and second-level caching strategies

#### JPA/Hibernate Patterns

- **Entity Relationships**: One-to-one, one-to-many, many-to-many mappings
- **Inheritance Strategies**: Table per class, joined table, single table
- **Lazy Loading**: Fetch strategies and N+1 query prevention
- **Transaction Management**: @Transactional usage and boundary definitions

### 4. Build System Analysis

#### Maven Project Structure

- **Multi-module Layout**: Parent-child POM relationships
- **Dependency Management**: Version management and scope definitions
- **Plugin Configuration**: Compiler, packaging, and deployment plugins
- **Profile Activation**: Environment-specific build configurations

#### Gradle Patterns

- **Multi-project Builds**: Project dependencies and configuration sharing
- **Plugin Application**: Spring Boot, dependency management plugins
- **Task Customization**: Custom build tasks and lifecycle hooks
- **Dependency Resolution**: Version catalogs and constraint handling

### 5. Code Quality Assessment Framework

#### Naming Convention Patterns

**Package Naming**

- Domain-based: `com.company.project.domain.user`
- Layer-based: `com.company.project.controller.user`
- Feature-based: `com.company.project.user.controller`

**Class Naming Standards**

- Controllers: `UserController`, `UserRestController`
- Services: `UserService`, `UserServiceImpl`
- Repositories: `UserRepository`, `UserDAO`, `UserMapper`
- Entities: `User`, `UserEntity`, `UserDO`
- DTOs: `UserDTO`, `UserRequest`, `UserResponse`

**Method Naming Patterns**

- CRUD Operations: `findById`, `findByUsername`, `save`, `delete`
- Business Logic: `calculateTotal`, `validateUser`, `processOrder`
- Boolean Methods: `isActive`, `hasPermission`, `canAccess`

#### Code Organization Principles

- **Single Responsibility**: Each class has one reason to change
- **Interface Segregation**: Small, focused interfaces
- **Dependency Inversion**: Depend on abstractions, not concretions
- **Package Cohesion**: Related classes grouped together

### 6. Enterprise Integration Patterns

#### REST API Design

- **Resource Naming**: Plural nouns, hierarchical relationships
- **HTTP Methods**: Proper verb usage (GET, POST, PUT, DELETE)
- **Status Codes**: Consistent error and success response codes
- **Content Negotiation**: JSON/XML response format handling

#### Error Handling Strategies

- **Global Exception Handlers**: @ControllerAdvice for centralized error handling
- **Custom Exceptions**: Domain-specific exception hierarchies
- **Error Response Format**: Consistent error response structure
- **Logging Patterns**: Structured logging with correlation IDs

#### Configuration Management

- **Property Sources**: application.yml, environment variables, external configs
- **Profile-based Configuration**: dev, test, prod environment separation
- **Feature Toggles**: Configuration-driven feature enabling/disabling
- **Secret Management**: Secure handling of passwords and API keys

### 7. Testing Strategies

#### Unit Testing Patterns

- **Test Structure**: Given-When-Then or Arrange-Act-Assert
- **Mock Usage**: Mockito for dependency isolation
- **Test Data Builders**: Object Mother or Builder patterns
- **Parameterized Tests**: JUnit 5 parameterized test usage

#### Integration Testing

- **Spring Boot Test**: @SpringBootTest for full application context
- **Test Slices**: @WebMvcTest, @DataJpaTest for focused testing
- **TestContainers**: Database integration testing with real databases
- **Test Profiles**: Separate configurations for test environments

### 8. Performance and Scalability Patterns

#### Caching Strategies

- **Application-level Caching**: @Cacheable annotations and cache managers
- **Database Caching**: Query result caching and second-level cache
- **Distributed Caching**: Redis integration for session and data caching
- **Cache Invalidation**: Time-based and event-driven cache eviction

#### Database Optimization

- **Connection Pooling**: HikariCP configuration and tuning
- **Query Optimization**: Index usage and query performance analysis
- **Pagination**: Efficient large dataset handling
- **Read Replicas**: Separate read/write database configurations

### 9. Security Implementation Patterns

#### Authentication & Authorization

- **JWT Token Handling**: Token generation, validation, and refresh
- **Role-based Access Control**: Method-level and URL-based security
- **Security Configuration**: SecurityConfig setup and customization
- **Password Management**: Encoding, validation, and policy enforcement

#### Data Protection

- **Input Validation**: Request validation and sanitization
- **SQL Injection Prevention**: Parameterized queries and prepared statements
- **CORS Configuration**: Cross-origin request handling
- **HTTPS Enforcement**: SSL/TLS configuration and redirection

### 10. Monitoring and Observability

#### Logging Standards

- **Structured Logging**: JSON format with correlation IDs
- **Log Levels**: Appropriate usage of DEBUG, INFO, WARN, ERROR
- **MDC (Mapped Diagnostic Context)**: Thread-local context for request tracing
- **Log Aggregation**: Integration with ELK stack or similar solutions

#### Metrics and Health Checks

- **Actuator Endpoints**: Health, metrics, and application information
- **Custom Metrics**: Business-specific metrics and KPIs
- **APM Integration**: Application Performance Monitoring setup
- **Alerting**: Threshold-based monitoring and notification

## Analysis Best Practices

### 1. Systematic Investigation Approach

1. **Start with Build Files**: Understand dependencies and project structure
2. **Map Package Hierarchy**: Identify architectural layers and boundaries
3. **Trace Data Flow**: Follow request/response paths through the application
4. **Identify Patterns**: Look for repeated code structures and conventions
5. **Document Anomalies**: Note inconsistencies and potential improvements

### 2. Documentation Standards

- **Be Specific**: Provide exact class names, package structures, and version numbers
- **Include Examples**: Show actual code patterns from the analyzed project
- **Note Variations**: Document different approaches used within the same project
- **Highlight Conventions**: Emphasize project-specific naming and organization rules

### 3. AI Guideline Generation

- **Actionable Instructions**: Provide clear, implementable guidelines
- **Code Templates**: Include skeleton code that follows project patterns
- **Constraint Documentation**: Clearly state what should and shouldn't be done
- **Version Compatibility**: Specify Java version and library compatibility requirements

## Common Analysis Challenges

### 1. Legacy Code Integration

- **Mixed Patterns**: Different architectural approaches in the same project
- **Technical Debt**: Outdated dependencies and deprecated APIs
- **Inconsistent Naming**: Multiple naming conventions within the same codebase
- **Configuration Sprawl**: Multiple configuration files and property sources

### 2. Complex Enterprise Setups

- **Multi-module Dependencies**: Circular dependencies and tight coupling
- **Custom Frameworks**: Project-specific abstractions and utilities
- **Legacy Database Schemas**: Non-standard table and column naming
- **Integration Complexity**: Multiple external system integrations

### 3. Modern vs Traditional Approaches

- **Annotation vs XML**: Configuration style differences
- **Reactive vs Traditional**: Different programming paradigms
- **Cloud vs On-premise**: Infrastructure-specific patterns
- **Microservice vs Monolith**: Architectural style implications

## Output Quality Standards

### 1. Comprehensive Coverage

- All major architectural components documented
- Technology stack completely cataloged
- Coding conventions clearly specified
- Integration patterns thoroughly analyzed

### 2. Practical Utility

- Guidelines directly applicable to development work
- Code examples that compile and run
- Clear constraints and best practices
- Specific version and compatibility information

### 3. Maintainability Focus

- Future-proof recommendations
- Evolutionary architecture considerations
- Technical debt identification and mitigation
- Performance and scalability guidance

This knowledge base serves as the foundation for conducting thorough, professional-grade Java project analysis that results in actionable AI development guidelines.
