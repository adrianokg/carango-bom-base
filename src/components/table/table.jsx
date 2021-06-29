import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Link, BrowserRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import CustomModal from '../modal/CustomModal';

function Table({ fields, columns, routeToChange, remove }) {
  const [listFields] = useState(fields);
  const [lineSelected, setLineSelected] = useState();

  return (
    <>
      <DataGrid
        hideFooter="true"
        rows={listFields}
        columns={columns}
        onRowSelected={(gridSelection) => setLineSelected(gridSelection.data)}
      />

      <div className="action-itens">
        <CustomModal disabled={!lineSelected} remove={remove} />
        <BrowserRouter>
          <Link
            className={lineSelected ? 'link' : 'link link-disabled'}
            to={routeToChange + lineSelected?.id}
          >
            <Button
              disabled={!lineSelected}
              className="action-item"
              variant="outlined"
              color="primary"
            >
              Alterar
            </Button>
          </Link>
        </BrowserRouter>
      </div>
    </>
  );
}

export default Table;
