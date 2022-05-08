import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

describe('Submit feedback', () => {

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        { create: createFeedbackSpy },
        { sendMail: sendMailSpy }
    );

    it('deve submeter um feedback', async () => {
        await expect(submitFeedbackUseCase.execute({
            type: 'BUG',
            comment: 'comentário',
            screenshot: 'data:image/png;base64,sdfsfdfssfdsfdfssfd'
        })).resolves.not.toThrow();
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('não deve submeter um feedback sem tipo', async () => {
        await expect(submitFeedbackUseCase.execute({
            type: '',
            comment: 'comentário',
            screenshot: 'data:image/png;base64,sdfsfdfssfdsfdfssfd'
        })).rejects.toThrow();
    });

    it('não deve submeter um feedback sem comentário', async () => {
        await expect(submitFeedbackUseCase.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,sdfsfdfssfdsfdfssfd'
        })).rejects.toThrow();
    });

    it('não deve submeter um feed back com um screenshot inválido', async () => {
        await expect(submitFeedbackUseCase.execute({
            type: 'BUG',
            comment: 'comentário',
            screenshot: 'sdfsfdfssfdsfdfssfd'
        })).rejects.toThrow();
    });

});