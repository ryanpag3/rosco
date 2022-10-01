import Column from 'component/Column'
import Screen from 'component/Screen'
import React from 'react'
import styled from 'styled-components'

const PrivacyPolicy = () => {
    return (
        <Screen>
            <Container>
                <PrivacyPolicyText>
                {
                    `We at Rosco Bot know you care about your personal information and we take your privacy seriously. Please read the following to learn more about our Privacy Policy.

                    We only ask you to provide personal information when it is needed to provide services to you. All personal information is collected by fair and lawful means, with your full knowledge and consent. We will also let you know why we’re collecting it and how it will be used.

                    Rosco Bot does not share or sell your personal information for advertising or marketing purposes. Additionally, we don’t share your personally identifying information with any third-parties, except when it is required by law.
    
                    Following Information is saved by Rosco Bot only for proper function of them:
    
                    - User Ids ( To link you and your server members with your saved configurations)
    
                    - Server Ids ( Only stored in some circumstances for information like your language preferences, server config in case of moderation bots and levelling bots)
    
                    - Channel Ids ( For command overwrites and configurations that are specific to channels )
    
                    - Role Ids ( For command overwrites and configurations that are specific to roles)
    
                    - Message Ids ( For message specific features like role menu, reaction roles, reaction verification)
    
                    - Any user supplied content that can include text for greetings, reminders, rank cards
    
                    We only retain collected information for as long as necessary to provide you with your requested service. What data we do collect, we’ll protect using commercially reasonable means to prevent loss and theft, as well as unauthorised access, disclosure, copying, use or modification.
    
                    Our site may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
    
                    You can always opt not to disclose information to us, but keep in mind you may need to provide some information to us in order to take advantage of some of our services and features.
    
                    If you have any questions or concerns regarding our privacy policies, please send us a detailed message to support@roscobot.com, and we will try to resolve your concerns.`
                }
                </PrivacyPolicyText>
            </Container>

        </Screen>
    )
}

const Container = styled(Column)`
    padding: 1em;
    font-size: 1em;
    max-width: 60%;
    white-space: pre-line;
`;

const PrivacyPolicyText = styled.span`

`;

export default PrivacyPolicy