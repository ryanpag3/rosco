import { css } from 'styled-components';
import Colors from 'util/colors';

const TableHeaderIconStyle = css`
    font-size: .85em;
    margin: .2em .75em;
    cursor: pointer;
    color: ${Colors.TEXT_MEDIUM};

    :hover {
        color: white;
    }
`;

export default TableHeaderIconStyle;