# tc-collect-data 项目架构设计与目录结构指南

## 📋 文档目的

本文档为 AI 助手提供 tc-collect-data 项目的完整架构设计和目录结构指导，确保在代码生成和修改时能够：

- 正确理解项目的分层架构设计
- 准确定位文件的存放位置
- 遵循项目的设计规范和约束
- 保持代码的一致性和可维护性

## 🔧 技术栈概览

**基础环境**: Java 8 + Spring Boot 2.7.0 + Maven 3.6+
**数据库**: MySQL 5.1.47 + MyBatis Plus 3.5.2 + Druid 1.2.8
**缓存**: Redis + Redisson 3.18.0 + Caffeine 2.9.3
**工具库**: Hutool 5.7.22 + Lombok 1.18.24 + FastJSON 1.2.83
**文档**: Swagger 3.0.0 + SpringDoc OpenAPI 1.6.14
**测试**: JUnit + Mockito 1.10.19 + JaCoCo 0.8.8

> ⚠️ **重要**: 项目严格使用 Java 8，禁止使用高版本 Java 语法特性！

## 🏗️ 项目架构概览

tc-collect-data 采用分层架构设计，包含 6 个核心模块，遵循严格的依赖关系和职责划分。

### 核心架构原则

1. **分层清晰**：严格按照 Control → Domain → Service → DAO 的四层架构
2. **职责单一**：每个模块有明确的职责边界，不可越界
3. **依赖单向**：上层可依赖下层，下层不能依赖上层
4. **数据转换集中**：Entity ↔ DTO 转换统一在 infrastructure 层进行

## 📁 模块结构与职责

### 1. tc-collect-data-common（通用基础模块）

**职责定位**：提供基础框架、父类、工具类和通用组件，不包含具体业务逻辑

**依赖关系**：独立模块，不依赖任何其他业务模块，只被其他模块引用

**目录结构**：

```
tc-collect-data-common/src/main/java/com/tc/fms/common/
├── annotation/          # 业务注解定义
│   ├── ExcelColumn.java
│   └── ExcelSheet.java
├── config/             # 系统配置类
│   ├── ApiDocumentationConfig.java
│   ├── SystemConfig.java
│   └── ...
├── constant/           # 常量和枚举
│   ├── Constants.java
│   └── Enums.java
├── context/           # 上下文类
│   └── BusinessLineContext.java
├── core/              # 核心基础类
│   ├── base/          # 基础父类
│   │   ├── BaseEntity.java        # 实体类基础父类
│   │   └── BaseController.java    # 控制器基础父类
│   ├── dto/           # 基础响应类
│   │   └── ResponseDTO.java       # 统一API响应包装
│   └── page/          # 分页基础类
│       └── PageDTO.java           # 分页响应包装
├── exception/         # 异常体系
│   ├── ApiException.java
│   └── error/
└── utils/            # 工具类集合
    ├── object/
    │   └── BeanUtils.java         # 统一Bean转换工具
    ├── file/
    ├── time/
    └── ...
```

**关键类说明**：

- `BaseEntity<T>`：所有实体类必须继承，提供通用字段（创建时间、更新时间、删除标志等）
- `BaseController`：所有控制器推荐继承，提供通用功能（日期转换等）
- `ResponseDTO<T>`：所有API接口统一返回类型
- `PageDTO<T>`：所有分页接口统一返回类型
- `BeanUtils`：项目统一的Bean转换工具，禁止使用其他Bean转换工具

### 2. tc-collect-data-orm（数据访问层）

**职责定位**：负责数据库访问，包含实体类、Mapper接口、Service接口定义

**依赖关系**：依赖 tc-collect-data-common，被 tc-collect-data-infrastructure 依赖

**目录结构**：

```
tc-collect-data-orm/src/main/java/com/tc/fms/orm/
├── common/            # 通用ORM组件
│   ├── enums/         # 数据库相关枚举（59个文件）
│   ├── query/         # 查询条件基类
│   └── util/          # ORM工具类
├── system/            # 系统核心数据模型
│   ├── entity/        # 实体类（85个实体）
│   │   ├── User.java              # 用户实体
│   │   ├── Department.java        # 部门实体
│   │   ├── Role.java             # 角色实体
│   │   └── ...                   # 其他业务实体
│   ├── mapper/        # Mapper接口（85个Mapper）
│   │   ├── UserMapper.java
│   │   ├── DepartmentMapper.java
│   │   └── ...
│   ├── service/       # 数据访问服务接口（85个服务接口）
│   │   ├── UserService.java       # 用户数据服务接口
│   │   ├── DepartmentService.java # 部门数据服务接口
│   │   └── ...
│   └── result/        # 查询结果对象（45个结果类）
├── invoice/           # 发票相关数据模型
│   ├── entity/
│   └── mapper/
├── workflow/          # 工作流数据模型
└── config/           # 数据源配置
```

**关键约束**：

- 所有实体类必须继承 `BaseEntity<T>`
- 实体类只包含数据库字段映射，不包含业务逻辑
- Service接口只定义数据访问方法，不包含复杂业务逻辑
- Mapper接口遵循MyBatis Plus规范
- Mapper接口继承BaseMapper后，基础CRUD操作无需在XML中编写，但是自定义查询方法需要编写XML

**文件路径示例**：

```java
// 实体类路径
tc-collect-data-orm/src/main/java/com/tc/fms/orm/system/entity/User.java

// Mapper接口路径
tc-collect-data-orm/src/main/java/com/tc/fms/orm/system/mapper/UserMapper.java

// Service接口路径
tc-collect-data-orm/src/main/java/com/tc/fms/orm/system/service/UserService.java

// XML映射文件路径
tc-collect-data-orm/src/main/resources/mapper/system/UserMapper.xml
```

### MyBatis Plus 使用规范

由于项目使用 MyBatis Plus 框架，Mapper 接口继承 BaseMapper 后可自动获得基础 CRUD 功能，因此：

1. **基础CRUD操作无需编写XML**：BaseMapper已提供insert、delete、update、select等基础操作，无需在XML中重复编写
2. **仅自定义查询编写XML**：只有自定义的复杂查询方法才需要在XML中编写SQL语句
3. **避免冗余配置**：不需要为BaseMapper提供的方法编写resultMap和基本查询语句
4. **统一命名规范**：自定义查询方法命名应清晰表达查询意图，如selectByXxx、selectPageXxx等

示例：

```java
// Mapper接口继承BaseMapper
public interface CompanyMapper extends BaseMapper<CompanyEntity> {
    // 以下方法无需编写XML，MyBatis Plus自动实现
    // int insert(CompanyEntity entity);
    // CompanyEntity selectById(Serializable id);
    // int updateById(CompanyEntity entity);
    // int deleteById(Serializable id);

    // 自定义查询方法需要编写XML
    IPage<CompanyEntity> selectCompanyPage(Page<CompanyEntity> page,
                                          @Param("companyName") String companyName,
                                          @Param("companyType") String companyType,
                                          @Param("status") String status,
                                          @Param("unifiedSocialCreditCode") String unifiedSocialCreditCode);
}
```

**职责定位**：核心业务逻辑实现层，负责Entity↔DTO转换、复杂业务逻辑处理

**依赖关系**：依赖 tc-collect-data-common 和 tc-collect-data-orm，被控制器层依赖

**目录结构**：

```
tc-collect-data-infrastructure/src/main/java/com/tc/fms/infrastructure/
├── domain/            # 业务域实现
│   ├── system/        # 系统管理域（40个实现类）
│   │   ├── bill/       # 账单相关
│   │   ├── user/       # 用户相关
│   │   │   ├── dto/    # 用户数据传输对象
│   │   │   │   ├── UserCreateDTO.java
│   │   │   │   ├── UserUpdateDTO.java
│   │   │   │   ├── UserQueryDTO.java
│   │   │   │   └── ...
│   │   │   ├── vo/     # 用户视图对象
│   │   │   │   ├── UserListVO.java
│   │   │   │   ├── UserDetailVO.java
│   │   │   │   └── ...
│   │   │   └── UserApplicationService.java  # 用户业务服务
│   │   ├── dept/       # 部门相关
│   │   ├── role/       # 角色相关
│   │   └── ...
│   ├── invoice/        # 发票管理域
│   └── common/         # 通用业务组件
├── service/           # 业务服务实现
│   └── impl/          # 服务实现类
├── config/           # 基础设施配置
├── security/         # 安全相关
├── cache/           # 缓存实现
├── aspectj/         # AOP切面
└── utils/           # 基础设施工具
```

**关键职责**：

- **DTO/VO 定义**：在这里定义具体的数据传输对象和视图对象
- **数据转换**：使用 `BeanUtils` 进行 Entity ↔ DTO 转换
- **业务逻辑**：实现复杂的业务规则和流程
- **服务编排**：协调多个数据服务完成业务功能

**文件路径示例**：

```java
// DTO定义路径
tc-collect-data-infrastructure/src/main/java/com/tc/fms/infrastructure/domain/system/user/dto/UserCreateDTO.java

// VO定义路径
tc-collect-data-infrastructure/src/main/java/com/tc/fms/infrastructure/domain/system/vo/UserListVO.java

// 业务服务实现路径
tc-collect-data-infrastructure/src/main/java/com/tc/fms/infrastructure/domain/system/user/UserApplicationService.java
```

### 4. tc-collect-data-api（API控制器层）

**职责定位**：对外提供业务API接口，处理HTTP请求和响应

**依赖关系**：依赖 tc-collect-data-common 和 tc-collect-data-infrastructure

**目录结构**：

```
tc-collect-data-api/src/main/java/com/tc/fms/api/
├── controller/        # API控制器
│   ├── system/        # 系统管理API（41个控制器）
│   │   ├── UserController.java
│   │   ├── DepartmentController.java
│   │   ├── RoleController.java
│   │   └── ...
│   ├── invoice/       # 发票相关API
│   ├── merchant/      # 商户管理API
│   ├── batch/         # 批量操作API
│   ├── external/      # 外部接口API
│   └── common/        # 通用API
└── ApiApplication.java # 启动类
```

**控制器规范**：

```java
@RestController
@RequestMapping("/api/v1/users")
@Tag(name = "用户管理", description = "用户信息管理相关接口")
@Slf4j
public class UserController extends BaseController {

    @GetMapping
    @Operation(summary = "分页查询用户列表")
    public ResponseDTO<PageDTO<UserListVO>> getUserList(@Valid UserQueryDTO queryDTO) {
        // 统一返回 ResponseDTO<PageDTO<T>> 格式
    }
}
```

### 5. tc-collect-data-admin（管理后台控制器层）

**职责定位**：提供管理后台界面的API接口

**依赖关系**：依赖 tc-collect-data-common 和 tc-collect-data-infrastructure

**目录结构**：

```
tc-collect-data-admin/src/main/java/com/tc/fms/admin/
├── controller/        # 管理后台控制器
│   ├── system/        # 系统管理（13个控制器）
│   ├── common/        # 通用功能（3个控制器）
│   └── tool/          # 工具类功能（1个控制器）
└── AdminApplication.java # 启动类
```

### 6. tc-collect-data-integration-test（集成测试模块）

**职责定位**：提供集成测试支持

**目录结构**：

```
tc-collect-data-integration-test/src/test/java/com/tc/fms/integrationtest/
├── sys/               # 系统模块测试
├── csr/               # CSR模块测试
├── dts/               # DTS模块测试
├── market/            # 市场模块测试
└── IntegrationTestApplication.java
```

## 🔄 数据流转规律

### 标准数据流

```
HTTP请求 → Controller → DomainService → DataService → Mapper → Database
         ↓
HTTP响应 ← ResponseDTO ← VO ← DTO ← Entity ←
```

### 关键转换点

1. **Controller层**：接收请求参数，调用DomainService，返回ResponseDTO
2. **DomainService层**：进行Entity↔DTO转换，实现业务逻辑
3. **DataService层**：纯数据访问，不包含业务逻辑
4. **Mapper层**：数据库操作映射

## 📝 代码生成指导原则

### 1. 文件创建位置规则

| 文件类型       | 存放模块                       | 路径规则                                          | 示例                                                                                                                           |
| -------------- | ------------------------------ | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 实体类(Entity) | tc-collect-data-orm            | `orm/{domain}/entity/`                            | `tc-collect-data-orm/src/main/java/com/tc/fms/orm/system/entity/User.java`                                                     |
| Mapper接口     | tc-collect-data-orm            | `orm/{domain}/mapper/`                            | `tc-collect-data-orm/src/main/java/com/tc/fms/orm/system/mapper/UserMapper.java`                                               |
| 数据服务接口   | tc-collect-data-orm            | `orm/{domain}/service/`                           | `tc-collect-data-orm/src/main/java/com/tc/fms/orm/system/service/UserService.java`                                             |
| DTO类          | tc-collect-data-infrastructure | `infrastructure/domain/{domain}/{subdomain}/dto/` | `tc-collect-data-infrastructure/src/main/java/com/tc/fms/infrastructure/domain/system/user/dto/UserCreateDTO.java`             |
| VO类           | tc-collect-data-infrastructure | `infrastructure/domain/{domain}/{subdomain}/vo/`  | `tc-collect-data-infrastructure/src/main/java/com/tc/fms/infrastructure/domain/system/vo/UserListVO.java`                      |
| 业务服务实现   | tc-collect-data-infrastructure | `infrastructure/domain/{domain}/service/impl/`    | `tc-collect-data-infrastructure/src/main/java/com/tc/fms/infrastructure/domain/system/service/impl/UserDomainServiceImpl.java` |
| API控制器      | tc-collect-data-api            | `api/controller/{domain}/`                        | `tc-collect-data-api/src/main/java/com/tc/fms/api/controller/system/UserController.java`                                       |
| 管理控制器     | tc-collect-data-admin          | `admin/controller/{domain}/`                      | `tc-collect-data-admin/src/main/java/com/tc/fms/admin/controller/system/UserController.java`                                   |

### 2. 包路径命名规范

```java
// 基础包路径
com.tc.fms.common.*           // 通用组件
com.tc.fms.orm.*              // 数据访问层
com.tc.fms.infrastructure.*   // 业务实现层
com.tc.fms.api.*              // API接口层
com.tc.fms.admin.*            // 管理后台层

// 具体业务域包路径
com.tc.fms.orm.system.entity.*        // 系统实体
com.tc.fms.infrastructure.domain.system.dto.*  // 系统DTO
com.tc.fms.api.controller.system.*             // 系统API控制器
```

### 3. 类命名规范

| 类型         | 命名规则                   | 示例                            |
| ------------ | -------------------------- | ------------------------------- |
| 实体类       | {业务名}Entity 或 {业务名} | `User`, `Department`            |
| DTO类        | {业务名}{操作}DTO          | `UserCreateDTO`, `UserQueryDTO` |
| VO类         | {业务名}{用途}VO           | `UserListVO`, `UserDetailVO`    |
| Mapper接口   | {业务名}Mapper             | `UserMapper`                    |
| 数据服务接口 | {业务名}Service            | `UserService`                   |
| 业务服务实现 | {业务名}DomainServiceImpl  | `UserDomainServiceImpl`         |
| 控制器       | {业务名}Controller         | `UserController`                |

### 4. 继承和依赖规范

```java
// 实体类必须继承BaseEntity
public class User extends BaseEntity<User> {
    // 业务字段
}

// 控制器推荐继承BaseController
@RestController
public class UserController extends BaseController {
    // 控制器方法
}

// 统一返回类型
public ResponseDTO<PageDTO<UserListVO>> getUserList(...) {
    // 分页查询统一返回格式
}

public ResponseDTO<UserDetailVO> getUserDetail(...) {
    // 详情查询统一返回格式
}

// Bean转换使用统一工具
UserListVO vo = BeanUtils.toBean(entity, UserListVO.class);
```

## 🔧 技术栈与版本约束

### 核心技术栈版本

#### 基础环境

- **Java版本**: `1.8` (JDK 8)
- **Maven版本**: `3.6+`
- **项目编码**: `UTF-8`

#### 核心框架版本

```properties
# Spring生态
spring.boot.version=2.7.0
spring-cloud.version=2021.0.5
spring-cloud-alibaba.version=2021.0.5.0

# 数据库相关
mysql-connector-java.version=5.1.47
mybatis-plus.version=3.5.2
mybatis-plus-generator.version=3.5.1
mybatis-spring-boot.version=2.2.2
pagehelper.boot.version=1.4.1
druid.version=1.2.8

# 缓存相关
redisson.version=3.18.0
caffeine.version=2.9.3

# 工具库版本
hutool.version=5.7.22
lombok.version=1.18.24
fastjson.version=1.2.83
guava.version=31.0.1-jre
jackson.version=2.13.3 (Spring Boot 2.7.0默认)

# 文档和API
swagger.version=3.0.0
springdoc-openapi-ui.version=1.6.14
io.swagger.version=1.6.8

# 其他重要依赖
jwt.version=0.9.1
poi.version=4.1.2
commons-io.version=2.11.0
commons-collections.version=3.2.2
bitwalker.version=1.21
oshi.version=6.4.0
xxl-job.version=2.3.1
jsoup.version=1.9.2
oss.version=3.16.1
p6spy.version=3.9.1
okhttp.version=4.10.0
```

### Java 8 兼容性约束（重要！）

#### ❌ 严格禁止使用的语法特性

```java
// ❌ 禁止：var 关键字（Java 10+）
var list = new ArrayList<>();  // 错误
List<String> list = new ArrayList<>();  // ✅ 正确

// ❌ 禁止：switch 表达式（Java 12+）
String result = switch (value) {  // 错误
    case 1 -> "one";
    case 2 -> "two";
    default -> "other";
};

// ❌ 禁止：文本块（Java 13+）
String json = """  // 错误
    {
        "name": "value"
    }
    """;

// ❌ 禁止：record 类（Java 14+）
record Person(String name, int age) {}  // 错误

// ❌ 禁止：instanceof 模式匹配（Java 14+）
if (obj instanceof String s) {  // 错误
    return s.length();
}

// ❌ 禁止：Optional.orElseThrow()无参方法（Java 10+）
optional.orElseThrow();  // 错误
optional.orElseThrow(() -> new RuntimeException());  // ✅ 正确

// ❌ 禁止：Files.writeString（Java 11+）
Files.writeString(path, content);  // 错误
Files.write(path, content.getBytes(StandardCharsets.UTF_8));  // ✅ 正确

// ❌ 禁止：String.isBlank()（Java 11+）
string.isBlank();  // 错误
StringUtils.isBlank(string);  // ✅ 正确（使用Apache Commons Lang3）

// ❌ 禁止：Collection.toArray(IntFunction)（Java 11+）
list.toArray(String[]::new);  // 错误
list.toArray(new String[0]);  // ✅ 正确
```

#### ✅ 推荐使用的Java 8语法

```java
// ✅ Lambda 表达式
list.stream().filter(s -> s.length() > 5).collect(Collectors.toList());

// ✅ 方法引用
list.stream().map(String::toUpperCase).collect(Collectors.toList());

// ✅ Optional 处理
Optional.ofNullable(value)
    .map(String::trim)
    .filter(s -> !s.isEmpty())
    .orElse("default");

// ✅ Stream API
Map<String, List<User>> groupedUsers = users.stream()
    .collect(Collectors.groupingBy(User::getDepartment));

// ✅ 新的时间API
LocalDateTime now = LocalDateTime.now();
LocalDate date = LocalDate.of(2024, 8, 24);

// ✅ 接口默认方法
interface UserService {
    List<User> findUsers();

    default List<User> findActiveUsers() {
        return findUsers().stream()
            .filter(User::isActive)
            .collect(Collectors.toList());
    }
}
```

### 依赖库使用约束

#### 字符串处理

```java
// ✅ 使用 Apache Commons Lang3
import org.apache.commons.lang3.StringUtils;
StringUtils.isBlank(str);  // 代替 Java 11+ 的 str.isBlank()
StringUtils.isEmpty(str);  // 空字符串检查

// ✅ 使用 Hutool 工具
import cn.hutool.core.util.StrUtil;
StrUtil.isBlank(str);
StrUtil.format("Hello {}", name);  // 字符串格式化
```

#### 集合处理

```java
// ✅ 使用 Hutool 集合工具
import cn.hutool.core.collection.CollUtil;
CollUtil.isEmpty(collection);
CollUtil.isNotEmpty(collection);

// ✅ 使用 Google Guava
import com.google.common.collect.Lists;
List<String> list = Lists.newArrayList();
```

#### 日期时间处理

```java
// ✅ 使用 Hutool 日期工具（推荐）
import cn.hutool.core.date.DateUtil;
Date date = DateUtil.parseDate("2024-08-24");
String dateStr = DateUtil.formatDate(new Date());

// ✅ 使用 Java 8 时间API
LocalDateTime now = LocalDateTime.now();
LocalDate date = LocalDate.parse("2024-08-24");
```

#### JSON 处理

```java
// ✅ 使用 FastJSON（项目标准）
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
String jsonStr = JSON.toJSONString(object);
User user = JSON.parseObject(jsonStr, User.class);

// ✅ 使用 Jackson（Spring Boot 默认）
import com.fasterxml.jackson.databind.ObjectMapper;
ObjectMapper mapper = new ObjectMapper();
String json = mapper.writeValueAsString(object);
```

#### Bean 拷贝

```java
// ✅ 统一使用项目 BeanUtils
import com.tc.fms.common.utils.object.BeanUtils;
UserVO vo = BeanUtils.toBean(userEntity, UserVO.class);
List<UserVO> voList = BeanUtils.toBean(entityList, UserVO.class);

// ❌ 禁止直接使用其他Bean拷贝工具
// cn.hutool.core.bean.BeanUtil.copyProperties()  // 禁止
// org.springframework.beans.BeanUtils.copyProperties()  // 禁止
```

## 📊 数据库设计规范

### 1. 表名命名规范

#### 表名格式

- **统一前缀**: 所有表名必须以 `fms_` 开头
- **命名风格**: 使用下划线分隔的小写字母（snake_case）
- **单数形式**: 表名必须使用单数形式，禁止使用复数
- **语义清晰**: 表名应清晰表达业务含义
- **二级模块**: 对于复杂业务，采用 `fms_{module}_{entity}` 格式，如 `fms_invoice_request`、`fms_config_red_reason`

#### 表名分类规范

```sql
-- 核心业务表
fms_invoice_request        -- 发票申请表（主业务表）
fms_merchant              -- 客商信息表
fms_company_entity        -- 公司主体表
fms_invoice_item          -- 发票明细表

-- 配置管理表
fms_config_business_line  -- 业务线配置表
fms_config_invoice_item   -- 发票项目配置表
fms_config_yonyou         -- 用友接口配置表
fms_config_red_reason     -- 红冲原因配置表

-- 工作流表
fms_workflow_approval     -- 审批流程表
fms_workflow_batch        -- 批量操作表

-- 基础数据表
fms_base_company          -- 基础公司信息表
fms_base_bank_account     -- 银行账户信息表

-- 日志记录表
fms_log_operation         -- 操作日志表
fms_invoice_attachment    -- 发票附件表
```

### 2. 必要字段规范

#### 标准字段定义

所有业务表必须包含以下标准字段：

```sql
-- 主键字段（必须）
`id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',

-- 审计字段（必须）
`creator_id` bigint(20) DEFAULT NULL COMMENT '创建者ID',
`create_time` datetime DEFAULT NULL COMMENT '创建时间',
`updater_id` bigint(20) DEFAULT NULL COMMENT '更新者ID',
`update_time` datetime DEFAULT NULL COMMENT '更新时间',

-- 逻辑删除字段（按需）
`deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '逻辑删除'
```

#### 字段使用说明

**主键字段**：

- 使用 `bigint(20) unsigned` 类型确保足够的ID空间
- 必须设置 `AUTO_INCREMENT` 自增
- 统一命名为 `id`

**审计字段**：

- `creator_id`：记录创建者用户ID，便于追踪数据来源
- `create_time`：记录数据创建时间，使用 `datetime` 类型
- `updater_id`：记录最后更新者用户ID，便于追踪数据变更
- `update_time`：记录最后更新时间，支持数据变更追踪

**逻辑删除字段**：

- `deleted`：使用 `tinyint(1)` 类型，默认值为 `0`（未删除）
- 值为 `1` 表示已删除，避免物理删除带来的数据丢失风险
- 根据业务需要决定是否添加，如数据完整性要求高的核心业务表建议添加

#### 建表示例

```sql
CREATE TABLE `fms_invoice_request` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `business_line` varchar(50) NOT NULL COMMENT '业务线代码',
  `business_request_id` varchar(100) NOT NULL COMMENT '业务系统请求ID',
  `fpqqlsh` varchar(50) DEFAULT NULL COMMENT '发票请求流水号',
  `invoice_type` varchar(20) NOT NULL COMMENT '发票类型',
  `status` varchar(20) NOT NULL COMMENT '发票状态',
  `creator_id` bigint(20) DEFAULT NULL COMMENT '创建者ID',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `updater_id` bigint(20) DEFAULT NULL COMMENT '更新者ID',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '逻辑删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_business_request` (`business_line`, `business_request_id`),
  KEY `idx_status` (`status`),
  KEY `idx_create_time` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='发票申请表';
```

#### 索引设计规范

- **主键索引**：自动创建，无需额外定义
- **唯一索引**：业务唯一性约束，如 `uk_business_request`
- **普通索引**：常用查询字段，如状态、时间等
- **复合索引**：多字段组合查询，注意字段顺序

#### 字符集和存储引擎

- **字符集**：统一使用 `utf8mb4`，支持完整的UTF-8字符集
- **存储引擎**：统一使用 `InnoDB`，支持事务和外键约束
- **表注释**：每个表必须添加清晰的业务说明注释

## ⚠️ 重要约束和禁止项

### 1. 模块依赖约束

- ❌ **禁止**：tc-collect-data-common 引用其他业务模块
- ❌ **禁止**：tc-collect-data-common 直接定义具体的DTO、VO
- ❌ **禁止**：跨层级依赖（如Controller直接调用Mapper）
- ✅ **必须**：严格按照依赖层次调用

### 2. 数据转换约束

- ❌ **禁止**：在Controller中进行Entity↔DTO转换
- ❌ **禁止**：使用除项目BeanUtils外的其他Bean转换工具
- ✅ **必须**：所有Entity↔DTO转换在infrastructure层进行

### 3. 版本兼容性约束

- ❌ **禁止**：使用Java 8以上语法特性
- ❌ **禁止**：直接返回MyBatis Plus的IPage类型
- ❌ **禁止**：使用Spring Boot 2.7.0不支持的特性
- ✅ **必须**：使用Java 8兼容语法
- ✅ **必须**：统一返回ResponseDTO<PageDTO<T>>格式
- ✅ **必须**：使用项目指定版本的依赖库

## 🚀 快速开发指南

### 创建新功能模块的标准流程

1. **在tc-collect-data-orm中创建**：
   - Entity类（继承BaseEntity）
   - Mapper接口
   - Service接口
   - XML映射文件

2. **在tc-collect-data-infrastructure中创建**：
   - DTO类（请求参数）
   - VO类（响应数据）
   - DomainServiceImpl（业务逻辑实现）

3. **在tc-collect-data-api中创建**：
   - Controller类（继承BaseController）
   - API接口实现

4. **在tc-collect-data-admin中创建**（如需要）：
   - 管理后台Controller类

### 示例：创建商品管理功能

```bash
# 1. ORM层文件
tc-collect-data-orm/src/main/java/com/tc/fms/orm/system/entity/Product.java
tc-collect-data-orm/src/main/java/com/tc/fms/orm/system/mapper/ProductMapper.java
tc-collect-data-orm/src/main/java/com/tc/fms/orm/system/service/ProductService.java
tc-collect-data-orm/src/main/resources/mapper/system/ProductMapper.xml

# 2. Infrastructure层文件
tc-collect-data-infrastructure/src/main/java/com/tc/fms/infrastructure/domain/system/dto/ProductCreateDTO.java
tc-collect-data-infrastructure/src/main/java/com/tc/fms/infrastructure/domain/system/dto/ProductUpdateDTO.java
tc-collect-data-infrastructure/src/main/java/com/tc/fms/infrastructure/domain/system/dto/ProductQueryDTO.java
tc-collect-data-infrastructure/src/main/java/com/tc/fms/infrastructure/domain/system/vo/ProductListVO.java
tc-collect-data-infrastructure/src/main/java/com/tc/fms/infrastructure/domain/system/vo/ProductDetailVO.java
tc-collect-data-infrastructure/src/main/java/com/tc/fms/infrastructure/domain/system/service/impl/ProductDomainServiceImpl.java

# 3. API层文件
tc-collect-data-api/src/main/java/com/tc/fms/api/controller/system/ProductController.java

# 4. Admin层文件（可选）
tc-collect-data-admin/src/main/java/com/tc/fms/admin/controller/system/ProductController.java
```

---

**文档版本**：v1.1
**更新时间**：2024-08-24
**更新内容**：新增技术栈版本约束和Java 8兼容性指导
**维护者**：开发团队

> 💡 **提示**：本文档将根据项目演进持续更新，请开发团队和AI助手严格遵循本文档的指导原则进行代码开发和维护。

> ⚠️ **特别提醒**：严格遵循Java 8语法规范，使用项目指定版本的依赖库，禁止使用不兼容的高版本Java特性！
