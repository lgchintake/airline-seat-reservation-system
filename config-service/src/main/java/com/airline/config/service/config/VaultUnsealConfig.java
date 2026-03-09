package com.airline.config.service.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Configuration
public class VaultUnsealConfig {

    @Value("${spring.cloud.config.server.vault.host}")
    private String vaultHost;

    @Value("${spring.cloud.config.server.vault.port}")
    private String vaultPort;

    @Value("${spring.cloud.config.server.vault.scheme}")
    private String vaultScheme;

    @Value("${spring.cloud.config.server.vault.unseal-keys}")
    private String vaultUnsealKeys;

    private static final String VAULT_URL = "http://localhost:8200/v1/sys/unseal";

    @Bean
    public ApplicationRunner unsealVault() {
        String vaultUnsealUrl = vaultScheme + "://" + vaultHost + ":" + vaultPort + "/v1/sys/unseal";
        String[] unsealKeys = vaultUnsealKeys.split(",");
        return args -> {

            RestTemplate restTemplate = new RestTemplate();

            for (String key : unsealKeys) {

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);

                Map<String, String> body = Map.of("key", key);

                HttpEntity<Map<String, String>> request =
                        new HttpEntity<>(body, headers);

                ResponseEntity<String> response =
                        restTemplate.postForEntity(vaultUnsealUrl, request, String.class);

                System.out.println("Vault unseal response: " + response.getBody());
            }
        };
    }
}