import React from 'react';
import { within } from '@testing-library/react';
import { renderWithIntl as render } from '../../../utils/test-utils';
import Table from './Table';

describe('Table component', () => {
  const MOCK_COLUMNS = [
    {
      id: 'field1',
      label: 'field1 title',
    },
    {
      id: 'field2',
      label: 'field2 title',
    },
  ];

  const MOCK_ROWS = [
    { id: 1, field1: 'row 1 value field 1', field2: 'row 1 value field 2' },
    {
      id: 2,
      field1: 'row 2 other value field 1',
      field2: 'row 2 other value field 2',
    },
  ];

  test('it should renders table headers', () => {
    const { getByTestId } = render(
      <Table columns={MOCK_COLUMNS} rows={MOCK_ROWS} />
    );

    const tableHead = getByTestId('table-head');

    MOCK_COLUMNS.forEach((column) => {
      const columnHead = within(tableHead).getByText(column.label);
      expect(columnHead).toBeVisible();
    });
  });

  test('it should renders data properly', () => {
    const { getByTestId, getAllByTestId } = render(
      <Table columns={MOCK_COLUMNS} rows={MOCK_ROWS} />
    );

    const tableBodyRows = getAllByTestId('table-body-row');

    expect(tableBodyRows.length).toBe(MOCK_ROWS.length);

    const tableBody = getByTestId('table-body');

    MOCK_ROWS.forEach((row) => {
      const field1Value = within(tableBody).getByText(row.field1);
      const field2Value = within(tableBody).getByText(row.field2);

      expect(field1Value).toBeVisible();
      expect(field2Value).toBeVisible();
    });
  });
});
