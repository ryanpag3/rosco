import React from 'react'
import DataTable, { TableProps, TableStyles } from 'react-data-table-component';
import styled from 'styled-components';
import _ from 'lodash';
import Column from './Column';
import Colors from 'util/colors';

const Table = (props: TableProps<any>) => {

  function getTableStyle() {
    const style = {};
    _.merge(style, CustomStyle, props.customStyles);
    return style;
  }

  return (
    <Container>
      <StyledTable
        {...props}
        customStyles={getTableStyle()}
      />
    </Container>
  )
}

const Container = styled(Column)``;

const StyledTable = styled(DataTable)`

`;

const borderColor = '#808080';

const CustomStyle: TableStyles = {
  table: {
    style: {
      fontFamily: 'nunito',
      borderBottomStyle: 'solid',
      borderBottomWidth: '1px',
      borderBottomColor: borderColor
    }
  },
  head: {
    style: {
      fontSize: '1.1em',
      fontWeight: 'bold'
    }
  },
  rows: {
    style: {
      backgroundColor: Colors.BACKGROUND_DARK,
      '&:not(:last-of-type)': {
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: borderColor
      }
    },
    highlightOnHoverStyle: {
      backgroundColor: Colors.BACKGROUND_MEDIUM
    }
  }
}

export default Table