package com.example.gateway.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/posts")
public class PostsController {

    private final WebClient webClient;

    @Value("${posts-service.url}")
    private String authServiceUrl;

    public PostsController(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    @RequestMapping(value = "/**", method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
    public Mono<ResponseEntity<String>> proxyRequest(
            @RequestHeader HttpHeaders headers,
            @RequestBody(required = false) String body,
            HttpMethod method,
            jakarta.servlet.http.HttpServletRequest request) {

        String requestPath = request.getRequestURI();

        if (requestPath.startsWith("/api")) {
            requestPath = requestPath.substring(4);
        }
        
        String uri = authServiceUrl + requestPath;

        return webClient.method(method)
                .uri(uri)
                .headers(httpHeaders -> copyHeaders(headers, httpHeaders))
                .body(Mono.justOrEmpty(body), String.class)
                .exchangeToMono(clientResponse -> 
                    clientResponse.toEntity(String.class)
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