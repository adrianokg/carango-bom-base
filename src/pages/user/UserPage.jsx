import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Table from '../../components/table/table';

const UserPage = () => {
  function remove() { }

  return (
    <div style={{ height: 300, width: '100%' }}>
      <Link className="link" to="/usuarios/novo">
        <Button className="custom-button" variant="outlined" color="primary">
          Novo
        </Button>
      </Link>
      <Table
        fields={
          [
            { id: '10', nome: 'teste' },
            { id: '1', nome: 'teste' },
          ]

          // List from BackEnd
        }
        columns={
          [
            { field: 'nome', headerName: 'Nome', width: 200 },
          ]
        }
        routeToChange={'/usuarios/editar/'}
        remove={remove()}
      />

    </div>
  );
};

export default UserPage;
