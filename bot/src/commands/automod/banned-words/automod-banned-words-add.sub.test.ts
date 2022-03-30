import { createTestInteraction } from '../../../util/test-helper'
import onCommandReceived from '../../../event/interaction-create';
import prisma from '../../../util/prisma';

it('should add a banned word to the server', async () => {
    let int = createTestInteraction('automod', ['banned-words', 'add'], {
        word: 'bad-word'
    });

    const r = await onCommandReceived(int);

    const bannedWord = await prisma.bannedWord.findUnique({
        where: {
            word_serverId: {
                word: 'bad-word',
                serverId: r.server.id
            }
        }
    });

    expect(bannedWord).not.toBeNull();
});

it('should throw an error if the banned word is already included in the server', async () => {
    let int = createTestInteraction('automod', ['banned-words', 'add'], {
        word: 'bad-word'
    });

    const r = await onCommandReceived(int);

    const bannedWord = await prisma.bannedWord.findUnique({
        where: {
            word_serverId: {
                word: 'bad-word',
                serverId: r.server.id
            }
        }
    });

    expect(bannedWord).not.toBeNull();

    int = createTestInteraction('automod', ['banned-words', 'add'], {
        word: 'bad-word'
    });

    await expect(onCommandReceived(int)).rejects.toThrow(); 
});