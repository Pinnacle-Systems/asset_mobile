import React from 'react';
import { DataTable, IconButton, Provider, useTheme } from 'react-native-paper';
import { View, StyleSheet, ScrollView, Text } from 'react-native';

const CustomDataTable = ({ 
  data, 
  fields, 
  onEdit, 
  onDelete,
  title,
  itemsPerPage = 5,
  pagination = true,
  width = '100%',
  height = 'auto',
  style = {},
  scrollable = true,
  onRowPress,
  emptyMessage = "No data available"
}) => {
  const [page, setPage] = React.useState(0);
  const [itemsPerPageState, setItemsPerPage] = React.useState(itemsPerPage);
  const theme = useTheme();
  
  // Guard against missing or malformed data
  const safeData = Array.isArray(data) ? data : [];
  const from = page * itemsPerPageState;
  const to = Math.min((page + 1) * itemsPerPageState, safeData.length);

  const tableContent = (
    <DataTable style={[styles.table, { width }, style]}>
      {title && (
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      )}
      
      <DataTable.Header style={styles.columnHeader}>
        {fields.map((field, index) => (
          <DataTable.Title 
            textStyle={styles.headerCellText}
            key={`header-${index}`} 
            {...field.titleProps}
            style={[
              field.width && { width: field.width },
              field.flex && { flex: field.flex },
              styles.headerCell
            ]}
          >
            {field.label}
          </DataTable.Title>
        ))}
        {(onEdit || onDelete) && (
          <DataTable.Title textStyle={styles.headerCellText} numeric style={styles.actionHeader}>
            Actions
          </DataTable.Title>
        )}
      </DataTable.Header>

      {safeData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{emptyMessage}</Text>
        </View>
      ) : (
        safeData.slice(from, to).map((row, rowIndex) => (
          <DataTable.Row 
            key={`row-${rowIndex}`} 
            style={[
              styles.row,
              onRowPress && styles.clickableRow,
              rowIndex % 2 === 0 ? styles.evenRow : styles.oddRow
            ]}
            onPress={onRowPress ? () => onRowPress(row) : undefined}
          >
            {fields.map((field, fieldIndex) => (
              <DataTable.Cell  
                textStyle={styles.cellText}
                key={`cell-${rowIndex}-${fieldIndex}`} 
                {...field.cellProps}
                style={[
                  field.width && { width: field.width },
                  field.flex && { flex: field.flex },
                  styles.cell
                ]}
              >
                {field.renderCell ? field.renderCell(row) : row[field.key]}
              </DataTable.Cell>
            ))}
            
            {(onEdit || onDelete) && (
              <DataTable.Cell numeric style={styles.actionCell}>
                {onEdit && (
                  <IconButton
                    icon="pencil-outline"
                    iconColor="#3b82f6"
                    size={20}
                    onPress={() => onEdit(row)}
                    style={styles.actionButton}
                  />
                )}
                {onDelete && (
                  <IconButton
                    icon="trash-can-outline"
                    iconColor="#ef4444"
                    size={20}
                    onPress={() => onDelete(row)}
                    style={styles.actionButton}
                  />
                )}
              </DataTable.Cell>
            )}
          </DataTable.Row>
        ))
      )}

      {pagination && safeData.length > itemsPerPageState && (
        <Provider>
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(safeData.length / itemsPerPageState)}
            onPageChange={(newPage) => setPage(newPage)}
            label={`${from + 1}-${to} of ${safeData.length}`}
            showFastPaginationControls
            numberOfItemsPerPageList={[5, 10, 15, 20]}
            numberOfItemsPerPage={itemsPerPageState}
            onItemsPerPageChange={setItemsPerPage}
            selectPageDropdownLabel={'Rows per page'}
            style={styles.pagination}
          />
        </Provider>
      )}
    </DataTable>
  );

  return (
    <View style={[styles.container, { height }]}>
      {scrollable ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, minWidth: '100%' }}>
          {tableContent}
        </ScrollView>
      ) : (
        tableContent
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  table: {
    flex: 1,
    minWidth: '100%',
  },
  titleContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  columnHeader: {
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingHorizontal: 16,
    elevation: 0,
  },
  headerCell: {
    paddingVertical: 8,
  },
  headerCellText: {
    color: '#64748b',
    fontWeight: '600',
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  actionHeader: {
    justifyContent: 'flex-end',
    minWidth: 100,
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingHorizontal: 16,
    minHeight: 56,
  },
  clickableRow: {
    // cursor: 'pointer' works on web, ignored natively usually
  },
  evenRow: {
    backgroundColor: '#ffffff',
  },
  oddRow: {
    backgroundColor: '#fafafa',
  },
  cell: {
    paddingVertical: 8,
  },
  cellText: {
    color: '#334155',
    fontSize: 14,
  },
  actionCell: {
    justifyContent: 'flex-end',
    minWidth: 100,
  },
  actionButton: {
    margin: 0,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
  },
  emptyContainer: {
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 15,
    textAlign: 'center',
  },
  pagination: {
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    backgroundColor: '#ffffff',
  },
});

export default CustomDataTable;