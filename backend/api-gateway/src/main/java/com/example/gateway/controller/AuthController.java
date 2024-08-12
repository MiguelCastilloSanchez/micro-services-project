package com.example.gateway.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
public class AuthController {

    private final WebClient webClient;

    @Value("${auth-service.url}")
    private String authServiceUrl;

    public AuthController(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    @RequestMapping(value = "/**", method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
    public Mono<ResponseEntity<byte[]>> proxyRequest(
            @RequestHeader HttpHeaders headers,
            @RequestBody(required = false) byte[] body,
            HttpMethod method,
            HttpServletRequest request) {

        String requestPath = request.getRequestURI();
        String uri = authServiceUrl + requestPath;

        return webClient.method(method)
                .uri(uri)
                .headers(httpHeaders -> copyHeaders(headers, httpHeaders))
                .body(Mono.justOrEmpty(body), byte[].class)
                .exchangeToMono(clientResponse -> 
                    clientResponse.toEntity(byte[].class)
                )
                .map(responseEntity -> 
                    ResponseEntity.status(responseEntity.getStatusCode())
                            .headers(responseEntity.getHeaders())
                            .body(responseEntity.getBody())
                );
    }

    private void copyHeaders(HttpHeaders from, HttpHeaders to) {
        for (String headerName : from.keySet()) {
            to.put(headerName, from.get(headerName));
        }
    }
}
