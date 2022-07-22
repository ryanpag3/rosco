import Column from 'component/Column';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { AgGridReact } from 'ag-grid-react';
import * as ScoreApi from 'api/score';
import { CellClickedEvent, CellValueChangedEvent, ColDef } from 'ag-grid-community';
import Button from 'component/Button';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Colors from 'util/colors';
import ReactTooltip from 'react-tooltip';
import ScoreModal from './ScoreModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { dateComparator } from 'util/date';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

const Scores = (props: any) => {
  const gridRef = useRef();
  const [data, setData] = useState([] as any);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [scoreToDelete, setScoreToDelete] = useState(undefined as any);

  useEffect(() => {
    if(isLoaded)
      return;

    ScoreApi.listAll(props.server.id)
      .then(({ data }) => {
          setData(data);
          setIsLoaded(true);
      });
  });

  const ColumnDefs: ColDef[] = [
    {
        field: 'createdAt', 
        headerName: 'Created At', 
        sortable: true, 
        filter: 'agDateColumnFilter',
        cellRenderer: ({ data }: any) => {
            const d = new Date(data.createdAt);
            return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
        },
        valueGetter: (params: any) => {
            return new Date(params.data.createdAt)
        },
        comparator: (valueA: any, valueB: any) => {
            return dateComparator(valueA, valueB);
        }
    },
    {
        field: 'updatedAt', 
        headerName: 'Updated At', 
        sortable: true, 
        filter: 'agDateColumnFilter',
        cellRenderer: ({ data }: any) => {
            const d = new Date(data.updatedAt);
            return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
        },
        valueGetter: (params: any) => {
            return new Date(params.data.updatedAt)
        },
        comparator: (valueA: any, valueB: any) => {
            return dateComparator(valueA, valueB);
        }
    },
    { 
        field: 'amount', 
        headerName: 'Amount', 
        editable: true, sortable: true, 
        filter: 'agNumberColumnFilter'
    },
    { 
        field: 'name', 
        headerName: 'Name', 
        editable: true, 
        sortable: true, 
        filter: 'agTextColumnFilter' 
    },    
    { 
        field: 'color', 
        headerName: 'Color', 
        sortable: true 
    },
    {
        headerName: '',
        cellRenderer: (e: any) => {
            return (<TrashIcon/>)
        },
        onCellClicked: (e: CellClickedEvent) => {
            e.node.setRowSelectable(false);
            setScoreToDelete({ ...e.data, index: e.rowIndex });
        },
        width: 50,
    }
  ]; 

  return (
      <Container>
          <AgGridReact
              ref={gridRef as any}
              className="ag-theme-alpine-dark"
              columnDefs={ColumnDefs}
              rowData={data}
              onCellValueChanged={async (event: CellValueChangedEvent) => {
                let updatedData = data;
                updatedData[event.rowIndex as number] = event.data;
                setData(updatedData);
                const updated = {
                  [event.colDef.field as string]: event.colDef.field === 'amount' ? 
                                                  Number.parseInt(event.newValue) : event.newValue
                };

                await ScoreApi.updateScore(props.server.id, event.data.id, updated);
              }}
          />
          <CreateButton
            data-tip
            data-for="createScore"
            onClick={() => setShowCreateModal(true)}
          >
            <PlusIcon/>
          </CreateButton>
          {/* @ts-ignore */}
          <ReactTooltip id="createScore" place="left" type="light" effect="solid" delayShow={300}>
              <span>Create a new score.</span>
          </ReactTooltip>

          <ScoreModal
            action="Create"
            server={props.server}
            onModalDismissed={(score) => {
              setShowCreateModal(false);
              if (score) {
                setData([score, ...data]);
              }
            }}
            isOpen={showCreateModal}
          />

          <DeleteConfirmationModal
            server={props.server}
            score={scoreToDelete}
            isOpen={scoreToDelete !== undefined}
            onDismiss={(isSubmitted: boolean) => {
              if (isSubmitted) {
                const copy = [...data];              
                copy.splice(scoreToDelete.index, 1);
                setData(copy);
              }
              setScoreToDelete(undefined);
            }}
          />
      </Container>
  );
}

const Container = styled(Column)`
    height: 100%;
    width: 100%;
`;

const CreateButton = styled(Button)`
  height: 3em;
  width: 3em;
  border-radius: 50%;
  position: absolute;
  bottom: 2em;
  right: 2em;
  background-color: ${Colors.BUTTON_GREEN};

  :hover {
    background-color: ${Colors.BUTTON_GREEN_HOVER};
  }
`;

const PlusIcon = styled(FaPlus)`
  font-size: 1.75em;
  color: ${Colors.TEXT_DARK};
`;

const TrashIcon = styled(FaTrash)`
    color: ${Colors.TEXT_MEDIUM};
    cursor: pointer;
`;

export default Scores;