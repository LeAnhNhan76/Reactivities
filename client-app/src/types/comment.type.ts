export type CommentItem = {
    id: string;
    activityId: string;
    userId: string;
    displayName: string;
    avatar: string;
    comment: string;
    commentedDate: Date;
}

export type AddComment = {
    activityId: string;
    userId: string;
    comment: string;
}