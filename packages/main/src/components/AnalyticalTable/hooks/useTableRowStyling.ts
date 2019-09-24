import { useCallback } from 'react';

export const useTableRowStyling = (classes, resizedColumns, selectable, selectedRow) =>
  useCallback(
    (instance) => {
      instance.getRowProps.push((row, table) => {
        let className = classes.tr;
        if (row.isAggregated) {
          className += ` ${classes.tableGroupHeader}`;
        }
        if (!row.isAggregated && selectable && row.index === selectedRow) {
          className += ` ${classes.selectedRow}`;
        }
        return {
          className,
          style: {
            // gridTemplateColumns: makeTemplateColumns(table.columns, resizedColumns)
          }
        };
      });
      return instance;
    },
    [classes.tr, classes.tableGroupHeader, classes.selectedRow, resizedColumns, selectable, selectedRow]
  );