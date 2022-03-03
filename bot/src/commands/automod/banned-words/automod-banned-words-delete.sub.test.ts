import { createTestInteraction } from '../../../util/test-helper'
import onCommandReceived from '../../../event/interaction-create';
import prisma from '../../../util/prisma';

it('should remove a banned word from the server', async () => {
    let int = createTestInteraction('automod', ['banned-words', 'add'], {
        word: 'bad-word'
    });

    let r = await onCommandReceived(int);

    let bannedWord = await prisma.bannedWord.findUnique({
        where: {
            word_serverId: {
                word: 'bad-word',
                serverId: r.server.id
            }
        }
    });

    expect(bannedWord).not.toBeNull();

    int = createTestInteraction('automod', ['banned-words', 'delete'], {
        word: 'bad-word'
    });

    await onCommandReceived(int); 

    bannedWord = await prisma.bannedWord.findUnique({
        where: {
            word_serverId: {
                word: 'bad-word',
                serverId: r.server.id
            }
        },
        rejectOnNotFound: false
    }) as any;

    expect(bannedWord).toBeNull();
});

it('should throw an error if the word has not been added yet', async () => {
    let int = createTestInteraction('automod', ['banned-words', 'delete'], {
        word: 'bad-word'
    });

    await expect(onCommandReceived(int)).rejects.toThrow(); 
})
