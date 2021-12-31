import BotError from './bot-error'

it('should be its own type', () => {
    const e = new BotError();
    expect(e instanceof BotError).toBeTruthy();
});