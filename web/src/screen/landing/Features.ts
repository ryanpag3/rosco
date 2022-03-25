const docBaseUrl = process.env.REACT_APP_DOC_URL || 'http://wiki.roscobot.com'

const Features: {
    image: string;
    title: string;
    description: string;
    docUrl: string;
    features: string[];
}[] = [
    {
        image: process.env.PUBLIC_URL + 'Rosco_Feature_Announcement 2.png',
        title: 'Announcements',
        description: 'Schedule messages to be announced later.',
        docUrl: docBaseUrl + '/en/commands/announce',
        features: [
            'Schedule messages to be sent in the future.',
            'Supports several date/time formats including plain english.',
            'Control which channel announcements are sent to.'
        ]
    },
    {
        image: process.env.PUBLIC_URL + 'Rosco_Feature_AuoMod 4.png',
        title: 'Auto Moderation',
        description: 'Let the bot do the boring stuff for you.',
        docUrl: '',
        features: [
            'Banned words detection.',
            'Spam detection.',
            'Link detection.',
            'Configurable punishments.'
        ]
    },
    {
        image: process.env.PUBLIC_URL + 'Rosco_Feature_Currency 2.png',
        title: 'Currency',
        description: 'Users earn currency for engaging in your server.',
        docUrl: docBaseUrl + '/en/commands/currency',
        features: [
            'Earn currency for performing server actions.',
            'Trade currency with other users.',
            'Store currency in a bank.',
            'Admins can issue/revoke currency.'
        ]
    },
    {
        image: process.env.PUBLIC_URL + 'Rosco_Feature_Permissions.png',
        title: 'Permissions',
        description: 'Set granular control over bot actions.',
        docUrl: docBaseUrl + '/en/commands/permission',
        features: [
            'Set specific roles for commands.',
            'Can also configure specific sub-commands.',
            'Easily set all commands to require a certain role.'
        ]
    },
    {
        image: process.env.PUBLIC_URL + 'Rosco_Feature_Poll.png',
        title: 'Polls',
        description: 'Create polls that your community votes on.',
        docUrl: docBaseUrl + '/en/commands/poll',
        features: [
            'Create polls that users can interact with.',
            'Open/close polls manually or by time.',
            'Announce results when poll has been closed.'
        ]
    },
    {
        image: process.env.PUBLIC_URL + 'Rosco_Feature_Scores.png',
        title: 'Scores',
        description: 'Create and track values of items over time.',
        docUrl: docBaseUrl + '/en/commands/score',
        features: [
            'Display score progress in scoreboards.',
            'Display scores in a generated bar graph.',
            'Filter graph display on multiple search queries, including scoreboards.'
        ]
    },
    {
        image: process.env.PUBLIC_URL + 'Rosco_Feature_Keywords.png',
        title: 'Keywords',
        description: 'Define a keyword or phrase and track it using a score.',
        docUrl: docBaseUrl + '/en/commands/keyword',
        features: [
            'Track the occurence of keywords typed in chat.',
            'Supports keywords, patterns, and wildcards (*).',
            'Customize actions on scores when detection occurs.'
        ]
    },
    {
        image: process.env.PUBLIC_URL + 'Rosco_Feature_Stopwatch.png',
        title: 'Stopwatch',
        description: 'Track the amount of time that passes.',
        docUrl: docBaseUrl + '/en/commands/stopwatch',
        features: [
            'Start and stop the stopwatch at any time.',
            'List out current defined stopwatches.',
            'Reset a stopwatch to 00:00:00.'
        ]
    },
    {
        image: process.env.PUBLIC_URL + 'Rosco_Feature_Timer.png',
        title: 'Timer',
        description: 'Count down a specific amount of time.',
        docUrl: docBaseUrl + '/en/commands/timer',
        features: [
            'Count down from up to 99 days.',
            'Create a custom message when the timer reaches 00:00:00:00.'
        ]
    },
    {
        image: process.env.PUBLIC_URL + 'Rosco_Feature_Welcome.png',
        title: 'Welcome',
        description: 'Send a welcome message when a user joins your community.',
        docUrl: docBaseUrl + '/en/commands/welcome',
        features: [
            'Define a custom message to be sent to the user when they join the server.',
            'Messages can be public, private, or both.'
        ]
    }
];

export default Features;