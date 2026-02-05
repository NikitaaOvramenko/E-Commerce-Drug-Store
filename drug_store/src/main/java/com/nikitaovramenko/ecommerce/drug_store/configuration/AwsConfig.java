package com.nikitaovramenko.ecommerce.drug_store.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;

@Configuration
public class AwsConfig {

    @Value("${spring.app.aws_access_key}")
    private String accessKey;

    @Value("${spring.app.aws_secret_key}")
    private String secretKey;

    @Value("${spring.app.aws_region}")
    private String regionName;

    @Bean
    public S3Client s3Client() {
        return S3Client.builder()
                .region(Region.of(regionName))
                .credentialsProvider(
                        StaticCredentialsProvider.create(
                                AwsBasicCredentials.create(accessKey, secretKey)))
                .build();
    }

    @Bean
    public S3Presigner s3Presigner() {
        Region awsRegion = Region.of(regionName);
        return S3Presigner.builder()
                .region(awsRegion)
                .credentialsProvider(StaticCredentialsProvider.create(
                        AwsBasicCredentials.create(accessKey, secretKey)))
                .build();
    }
}
