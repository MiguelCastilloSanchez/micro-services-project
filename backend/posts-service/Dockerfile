FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/posts-service-0.0.1-SNAPSHOT.jar posts-service.jar
ENTRYPOINT ["java", "-jar", "posts-service.jar"]