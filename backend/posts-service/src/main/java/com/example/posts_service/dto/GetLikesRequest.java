package com.example.posts_service.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter @Setter
public class GetLikesRequest {
    private Long postId;
    private List<Long> userIds;

    public GetLikesRequest(Long postId, List<Long> userIds) {
        this.postId = postId;
        this.userIds = userIds;
    }
}
