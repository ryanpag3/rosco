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
        docUrl: '',
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
            'Supports several date/time formats.',
            'feature2',
            'feature3'
        ]
    },
    {
        image: process.env.PUBLIC_URL + 'Rosco_Feature_Currency 2.png',
        title: 'Currency',
        description: 'Users earn currency for engaging in your server.',
        docUrl: '',
        features: [
            'Supports several date/time formats.',
            'feature2',
            'feature3'
        ]
    },
    {
        image: process.env.PUBLIC_URL + 'Rosco_Feature_Permissions.png',
        title: 'Permissions',
        description: 'Set granular control over bot actions.',
        docUrl: '',
        features: [
            'Supports several date/time formats.',
            'feature2',
            'feature3'
        ]
    },
    {
        image: process.env.PUBLIC_URL + 'Rosco_Feature_Poll.png',
        title: 'Polls',
        description: 'Create polls that your community votes on.',
        docUrl: '',
        features: [
            'Supports several date/time formats.',
            'feature2',
            'feature3'
        ]
    },
    {
        image: process.env.PUBLIC_URL + 'Rosco_Feature_Scores.png',
        title: 'Scores',
        description: 'Create and track values of items over time.',
        docUrl: '',
        features: [
            'Supports several date/time formats.',
            'feature2',
            'feature3'
        ]
    },
    {
        image: process.env.PUBLIC_URL + 'Rosco_Feature_Keywords.png',
        title: 'Keywords',
        description: 'Define a keyword or phrase and track it using a score.',
        docUrl: '',
        features: [
            'Supports several date/time formats.',
            'feature2',
            'feature3'
        ]
    },
    {
        image: process.env.PUBLIC_URL + 'Rosco_Feature_Stopwatch.png',
        title: 'Stopwatch',
        description: 'Track the amount of time that passes.',
        docUrl: '',
        features: [
            'Supports several date/time formats.',
            'feature2',
            'feature3'
        ]
    },
    {
        image: process.env.PUBLIC_URL + 'Rosco_Feature_Timer.png',
        title: 'Timer',
        description: 'Count down a specific amount of time.',
        docUrl: '',
        features: [
            'Supports several date/time formats.',
            'feature2',
            'feature3'
        ]
    },
    {
        image: process.env.PUBLIC_URL + 'Rosco_Feature_Welcome.png',
        title: 'Welcome',
        description: 'Send a welcome message when a user joins your community.',
        docUrl: '',
        features: [
            'Supports several date/time formats.',
            'feature2',
            'feature3'
        ]
    }
];

export default Features;