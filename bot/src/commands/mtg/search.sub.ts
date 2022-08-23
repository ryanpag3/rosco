import { Command } from '../../../types/command';
import logger from '../../util/logger';
import prisma from '../../util/prisma';

const MtcgSearch: Command = {
    id: '4194adab-034c-4350-b575-f45fb54f0758',
    name: 'mtg search',
    handler: async (interaction, user, server) => {
        const name = interaction.options.getString('name', true);
        const set = interaction.options.getString('set');

        let where: any = {
            name: {
                search: `'${name}'` 
            }
        };

        if(set) {
            where.setName = {
                search: `'${set}'`
            }
        }

        const cards = await prisma.magicTheGatheringCard.findMany({ where, orderBy: {
            releasedAt: 'desc'
        } }); 

        if (cards.length === 0) {
            return interaction.reply({
                embeds: [
                    {
                        description: `Could not find any Magic: The Gathering cards with those parameters.`
                    }
                ]
            });
        }

        let [ { card } ]: any = cards;

        logger.trace(card);

        const faces = card.card_faces ? card.card_faces : [ card ];

        return interaction.reply({
            embeds: faces.map((f: any) => {
                return {
                    title: `${f.name} - ${f.mana_cost}`,
                    description: f.oracle_text.replace('\n', '\n\n') + `\n\n${card.scryfall_uri}`,
                    image: {
                        url: f?.image_uris?.png
                    },
                    footer: {
                        text: 'Not what you are looking for? Try a more narrow search query.'
                    }
                }
            })
        })
    }
};

export default MtcgSearch;