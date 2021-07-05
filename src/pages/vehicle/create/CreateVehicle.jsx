import React, { useEffect, useState } from 'react';
import Form from '../../../components/form';
import BrandService from '../../../services/BrandService';
import VehicleService from '../../../services/Vehicleservice';

function onSubmit(value) {
  VehicleService.Save(value);
  console.log(value);
}

const CreateVehicle = () => {
  const [brandList, setbrandList] = useState([]);

  useEffect(() => {
    async function loadBrands() {
      await BrandService.List()
        .then(data => {
          setbrandList(data);
        });
    }
    loadBrands();
  }, []);

  return (
    <>
      <Form
        mainButton={{
          text: 'Salvar',
          onSubmit,
        }}
        fields={[
          {
            name: 'idBrand',
            label: 'Marca',
            componentType: 'autocomplete',
            options: brandList,
            required: true,
          },
          { name: 'model', label: 'Modelo', required: true },
          { name: 'year', label: 'Ano', required: true },
          { name: 'value', label: 'Valor', required: true },
        ]}
      />
    </>
  );
};

export default CreateVehicle;
