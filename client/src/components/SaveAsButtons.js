import React from 'react';
import { Button } from 'semantic-ui-react';
import {
  createPDF,
  tableToExcel,
} from '../helpers/saveTableRecordAsPdfExcel';

export default function SaveAsButtons() {
  return (
    <>
      <Button
        content="Save as Excel"
        icon="file pdf"
        style={{
          backgroundColor: '#13af4f',
          color: 'white',
        }}
        onClick={() => tableToExcel('tableItems', 'Table-Records')}
      />

      <Button
        content="Save as PDF"
        icon="file pdf"
        style={{
          backgroundColor: '#af2121',
          color: 'white',
        }}
        id="btPrint"
        onClick={() => createPDF()}
      />
    </>
  );
}
