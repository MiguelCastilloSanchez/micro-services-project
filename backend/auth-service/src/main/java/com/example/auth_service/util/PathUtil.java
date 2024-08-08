package com.example.auth_service.util;

import java.nio.file.Paths;

public class PathUtil {

    public static String cleanPath(String path) {
        return Paths.get(path).normalize().toString();
    }
}