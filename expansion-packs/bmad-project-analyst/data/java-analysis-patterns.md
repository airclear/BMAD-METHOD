# Java Analysis Patterns

## Common Enterprise Java Project Structures

### 1. Traditional Layered Architecture

```
src/main/java/
├── com.company.project/
│   ├── controller/          # REST controllers
│   ├── service/            # Business logic
│   │   └── impl/           # Service implementations
│   ├── repository/         # Data access layer
│   ├── entity/            # JPA entities
│   ├── dto/               # Data transfer objects
│   ├── config/            # Configuration classes
│   └── util/              # Utility classes
```

### 2. Domain-Driven Design Structure

```
src/main/java/
├── com.company.project/
│   ├── domain/
│   │   ├── user/          # User bounded context
│   │   │   ├── entity/
│   │   │   ├── service/
│   │   │   └── repository/
│   │   └── order/         # Order bounded context
│   │       ├── entity/
│   │       ├── service/
│   │       └── repository/
│   ├── infrastructure/    # Technical concerns
│   └── application/       # Application services
```

### 3. Multi-Module Maven Structure

```
project-root/
├── project-core/          # Domain models and interfaces
├── project-service/       # Business logic implementation
├── project-web/          # Web controllers and configuration
├── project-data/         # Data access and persistence
└── project-integration/  # External service integrations
```

## Framework Detection Patterns

### Spring Boot Indicators

- Presence of `@SpringBootApplication`
- `spring-boot-starter-*` dependencies
- `application.yml` or `application.properties`
- `@RestController`, `@Service`, `@Repository` annotations

### Spring Framework Components

- **Spring MVC**: `@Controller`, `@RequestMapping`, `DispatcherServlet`
- **Spring Data JPA**: `JpaRepository`, `@Entity`, `@Query`
- **Spring Security**: `SecurityConfig`, `@PreAuthorize`, `WebSecurityConfigurerAdapter`
- **Spring Boot Actuator**: `/actuator` endpoints, health checks

### Persistence Framework Detection

- **MyBatis**: `@Mapper`, XML mapper files, `SqlSessionFactory`
- **JPA/Hibernate**: `@Entity`, `@Repository`, `persistence.xml`
- **Spring Data**: Repository interfaces extending `JpaRepository`

## Code Convention Analysis Patterns

### Class Naming Conventions

```java
// Controllers
UserController.java
UserRestController.java
UserApiController.java

// Services
UserService.java
UserServiceImpl.java
IUserService.java (interface)

// Repositories/DAOs
UserRepository.java
UserDAO.java
UserMapper.java (MyBatis)

// Entities/Models
User.java
UserEntity.java
UserDO.java (Data Object)
UserPO.java (Persistent Object)

// DTOs/VOs
UserDTO.java
UserVO.java (View Object)
UserRequest.java
UserResponse.java
```

### Method Naming Patterns

```java
// CRUD Operations
findById(Long id)
findByUsername(String username)
findAll()
save(User user)
update(User user)
deleteById(Long id)

// Business Logic
calculateTotal()
validateUser()
processOrder()
sendNotification()

// Boolean Methods
isActive()
hasPermission()
canAccess()
shouldProcess()
```

### Package Organization Patterns

```java
// Feature-based (DDD approach)
com.company.project.user.controller
com.company.project.user.service
com.company.project.user.repository

// Layer-based (traditional)
com.company.project.controller.user
com.company.project.service.user
com.company.project.repository.user

// Hybrid approach
com.company.project.web.controller
com.company.project.domain.service
com.company.project.infrastructure.repository
```

## Configuration Patterns

### Application Properties Structure

```yaml
# Server configuration
server:
  port: 8080
  servlet:
    context-path: /api

# Database configuration
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/database
    username: ${DB_USERNAME:root}
    password: ${DB_PASSWORD:password}

  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect

# Logging configuration
logging:
  level:
    com.company.project: DEBUG
    org.springframework.security: DEBUG
```

### Common Configuration Classes

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    // Security configuration
}

@Configuration
@EnableJpaRepositories
public class DatabaseConfig {
    // Database configuration
}

@Configuration
@EnableConfigurationProperties
public class ApplicationConfig {
    // Application-specific configuration
}
```

## Error Handling Patterns

### Global Exception Handler

```java
@ControllerAdvice
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(EntityNotFoundException ex) {
        // Handle not found exceptions
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidation(ValidationException ex) {
        // Handle validation exceptions
    }
}
```

### Custom Exception Hierarchy

```java
// Base exception
public abstract class BusinessException extends RuntimeException {
    private final String errorCode;
    private final String message;
}

// Specific exceptions
public class UserNotFoundException extends BusinessException {
    public UserNotFoundException(String userId) {
        super("USER_NOT_FOUND", "User not found: " + userId);
    }
}
```

## Testing Patterns

### Unit Test Structure

```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    @DisplayName("Should find user by id when user exists")
    void shouldFindUserById_WhenUserExists() {
        // Given
        Long userId = 1L;
        User expectedUser = User.builder().id(userId).build();
        when(userRepository.findById(userId)).thenReturn(Optional.of(expectedUser));

        // When
        User actualUser = userService.findById(userId);

        // Then
        assertThat(actualUser).isEqualTo(expectedUser);
    }
}
```

### Integration Test Patterns

```java
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@TestPropertySource(locations = "classpath:application-test.properties")
class UserControllerIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void shouldCreateUser_WhenValidRequest() {
        // Integration test implementation
    }
}
```

## Performance and Monitoring Patterns

### Caching Configuration

```java
@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public CacheManager cacheManager() {
        RedisCacheManager.Builder builder = RedisCacheManager
            .RedisCacheManagerBuilder
            .fromConnectionFactory(redisConnectionFactory())
            .cacheDefaults(getCacheConfiguration());
        return builder.build();
    }
}

// Usage in services
@Service
public class UserService {

    @Cacheable(value = "users", key = "#id")
    public User findById(Long id) {
        return userRepository.findById(id);
    }

    @CacheEvict(value = "users", key = "#user.id")
    public User update(User user) {
        return userRepository.save(user);
    }
}
```

### Logging Patterns

```java
// SLF4J with structured logging
@Slf4j
@RestController
public class UserController {

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody UserRequest request) {
        log.info("Creating user with email: {}", request.getEmail());

        try {
            User user = userService.create(request);
            log.info("User created successfully with id: {}", user.getId());
            return ResponseEntity.ok(user);
        } catch (Exception ex) {
            log.error("Failed to create user with email: {}", request.getEmail(), ex);
            throw ex;
        }
    }
}
```

## Security Implementation Patterns

### JWT Configuration

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
```

### Method-Level Security

```java
@Service
public class UserService {

    @PreAuthorize("hasRole('ADMIN') or #userId == authentication.principal.id")
    public User findById(Long userId) {
        return userRepository.findById(userId);
    }

    @PostAuthorize("returnObject.userId == authentication.principal.id")
    public UserProfile getUserProfile(Long userId) {
        return userProfileRepository.findByUserId(userId);
    }
}
```

This document provides common patterns that help identify and understand Java enterprise project structures, frameworks, and conventions during analysis.
