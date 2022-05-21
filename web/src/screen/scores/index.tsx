import Screen from 'component/Screen'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as ScoreApi from 'api/score';
import { SelectedServerContext } from 'context/selected-server-context';
import { TableColumn, TableStyles } from 'react-data-table-component';
import Table from 'component/Table';
import CreateUpdateScoreModal from './CreateUpdateScoreModal';
import TableHeader from './TableHeader';
import ScoreModal from './ScoreModal';

const Scores = (props: any) => {
  const [isInit, setIsInit] = useState(false);
  const [scores, setScores] = useState([] as any);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedScore, setSelectedScore] = useState();

  function onScoreClicked(row: any) {
    setSelectedScore(row);
    setShowUpdateModal(true);
  }

  function onModalDismissed() {
    console.log(`on modal dismissed`);
    setSelectedScore(undefined);
    setShowUpdateModal(false);
    setIsInit(false);
  }

  const TableColumns: TableColumn<any>[] = [
    {
      name: 'Created At',
      sortable: true,
      selector: (row: any) => {
        const d = new Date(row.createdAt);
        return `${d.toLocaleString()}`
      },
      grow: .15
    },
    {
      name: 'Amount',
      sortable: true,
      selector: (row: any) => row.amount,
      grow: .1
    },
    {
      name: 'Name',
      sortable: true,
      selector: (row: any) => row.name,
      grow: .25
    },
    {
      name: 'Description',
      selector: (row: any) => row.description,
      grow: 1
    }
  ]

  useEffect(() => {
    if (isInit)
      return;
    
    ScoreApi.list(props.server.id)
      .then((scores) => {
        setScores([...scores.data]);
        setIsInit(true);
      });
  }, [ isInit ]);

  return (
    <SelectedServerContext.Consumer>
      {
        ({ server }: any) => (
          <StyledScreen>
              <Table
                fixedHeader
                highlightOnHover
                pointerOnHover
                theme="dark"
                actions={<TableHeader 
                  server={server}
                  onDismiss={onModalDismissed}
                  />}
                onRowClicked={(row: any) => onScoreClicked(row)}
                customStyles={TableStyle}
                columns={TableColumns}
                data={scores}
              />
              <ScoreModal
                action="Update"
                server={server}
                isOpen={showUpdateModal}
                onDismiss={onModalDismissed}
                score={selectedScore}
              />
              {/* <CreateUpdateScoreModal
                action="Upgrade"
                server={server}
                isOpen={showUpdateModal}
                onDismiss={onModalDismissed}
                score={selectedScore}
              /> */}
          </StyledScreen>
        )}
    </SelectedServerContext.Consumer>
  )
}

const StyledScreen = styled(Screen)`

`;

const TableStyle: TableStyles = {
  header: {
    style: {
      height: '1.5em',
      maxHeight: '1.5em',
      borderBottomStyle: 'solid',
      borderBottomWidth: '1px',
      borderBottomColor: '#858585' 
    }
  }
};

export default Scores