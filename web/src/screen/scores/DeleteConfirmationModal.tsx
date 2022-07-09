import Button from 'component/Button';
import Column from 'component/Column';
import Modal from 'component/Modal';
import Row from 'component/Row';
import styled from 'styled-components';
import * as ScoreApi from 'api/score';

const DeleteConfirmationModal = (props: any) => {

    async function submit() {
        await ScoreApi.deleteScore(props.server.id, props.score.id);
        props.onDismiss(true);
    }

    return (
        <StyledModal
           isOpen={props.isOpen}
           onDismiss={props.onDismiss} 
        >
            <Content>
                <span>Are you sure you want to delete this score?</span>
                &nbsp;
                <span>name: <b>{props?.score?.name}</b></span>
                <span>amount: <b>{props?.score?.amount}</b></span>
                &nbsp;
                <ButtonRow>
                    <CancelButton
                        onClick={() => props.onDismiss()}
                    >Cancel</CancelButton>
                    <SubmitButton
                        onClick={() => submit()}
                    >Submit</SubmitButton>
                </ButtonRow>
            </Content>
        </StyledModal>
    )
};

const StyledModal = styled(Modal)`
    width: 25em;
    align-items: center;
`;

const Content = styled(Column)`
    align-items: center;
`;

const FormButton = styled(Button)`
    padding-left: 1em;
    padding-right: 1em;
    font-size: 1em;
`;

const ButtonRow = styled(Row)`
    margin-top: 1em;
    width: 100%;
    justify-content: space-evenly;
`;

const CancelButton = styled(FormButton)`

`;

const SubmitButton = styled(FormButton)`

`;



export default DeleteConfirmationModal;