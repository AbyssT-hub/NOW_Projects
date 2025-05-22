# Stage 1: Build ứng dụng
FROM openjdk:17-jdk-slim AS builder

# Cài đặt các công cụ cần thiết để tăng tốc build
RUN apt-get update && apt-get install -y --no-install-recommends \
    unzip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Sao chép file Gradle Wrapper và build.gradle để caching dependency
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Cấp quyền thực thi cho gradlew
RUN chmod +x gradlew

# Tải dependency trước để tận dụng caching
RUN ./gradlew dependencies

# Sao chép toàn bộ mã nguồn
COPY . .

# Build ứng dụng
RUN ./gradlew build -x test

# Stage 2: Tạo image chạy ứng dụng
FROM openjdk:17-jdk-slim

WORKDIR /app

# Sao chép file JAR từ stage build
COPY --from=builder /app/build/libs/auth_service-*.jar app.jar

# Chạy ứng dụng
CMD ["java", "-jar", "app.jar"]