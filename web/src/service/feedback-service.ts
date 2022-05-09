import { api } from "./api";

export async function sendFeedback({type, comment, screenshot}: {type: string, comment: string, screenshot: string | null}){
    await api.post('/feedbacks', {
        type: type,
        comment: comment,
        screenshot: screenshot
    });
}