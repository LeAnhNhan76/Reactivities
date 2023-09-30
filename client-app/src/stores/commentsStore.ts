// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { action, observable } from "mobx";
import { AddComment, CommentItem } from "../types/comment.type";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { store } from "./store";
import { getToken } from "../utils/authentication.util";
import ApplicationSetting from "../constants/application.constant";
import { Hubs } from "../constants/signalr.constant";

export default class CommentsStore {
    @observable comments: CommentItem[] = [];
    @observable hubConnection: HubConnection | null = null;

    @action createHubConnection(activityId: string) {
        if (store.activitiesStore.currentActivityDetails) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl(`${ApplicationSetting.apiUrl}/${Hubs.COMMENT}?activityId=${activityId}`, {
                    accessTokenFactory() {
                        return getToken();
                    },
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();
            
            this.hubConnection.start().catch((error) => console.log('Error establishing connection: ', error));

            this.hubConnection.on('LoadComments', (cmtslist: CommentItem[]) => {
                this.comments = cmtslist;
            });

            this.hubConnection.on('ReceiveComment', (newComment: CommentItem) => {
                this.comments.unshift(newComment);
            })
        }
    }

    @action stopHubConnection() {
        this.hubConnection?.stop().catch((error) => console.log('Error stop connection: ', error));
    }

    @action clearComments() {
        this.comments = [];
        this.stopHubConnection();
    }

    @action addComment(newComment: AddComment) {
        this.hubConnection?.invoke('SendCommentAsync', newComment);
    }
}