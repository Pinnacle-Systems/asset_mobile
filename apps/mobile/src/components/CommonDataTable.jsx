import React from 'react';
import { DataTable, IconButton, Provider } from 'react-native-paper';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useTheme as useAppTheme } from '../theme/ThemeProvider';

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

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

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
            textStyle={[styles.headerCellText, field.align && { textAlign: field.align }]}
            key={`header-${index}`}
            {...field.titleProps}
            style={[
              field.titleProps?.style,
              field.align && { justifyContent: field.align === 'center' ? 'center' : field.align === 'right' ? 'flex-end' : 'flex-start' },
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
                textStyle={[styles.cellText, field.align && { textAlign: field.align }]}
                key={`cell-${rowIndex}-${fieldIndex}`}
                {...field.cellProps}
                style={[
                  field.cellProps?.style,
                  field.align && { justifyContent: field.align === 'center' ? 'center' : field.align === 'right' ? 'flex-end' : 'flex-start' },
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
                    iconColor={theme.colors.accent}
                    size={20}
                    onPress={() => onEdit(row)}
                    style={styles.actionButton}
                  />
                )}
                {onDelete && (
                  <IconButton
                    icon="trash-can-outline"
                    iconColor={theme.colors.error || "#ef4444"}
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
            theme={{ colors: { text: theme.colors.text } }}
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

const createStyles = (theme) => StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    elevation: 2,
    shadowColor: theme.colors.shadow,
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
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
  },
  columnHeader: {
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingHorizontal: 16,
    elevation: 0,
  },
  headerCell: {
    paddingVertical: 8,
  },
  headerCellText: {
    color: theme.colors.subtext,
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
    borderBottomColor: theme.colors.borderLight || theme.colors.border,
    paddingHorizontal: 16,
    minHeight: 56,
  },
  clickableRow: {},
  evenRow: {
    backgroundColor: theme.colors.surface,
  },
  oddRow: {
    backgroundColor: theme.colors.background,
  },
  cell: {
    paddingVertical: 8,
  },
  cellText: {
    color: theme.colors.text,
    fontSize: 14,
  },
  actionCell: {
    justifyContent: 'flex-end',
    minWidth: 100,
  },
  actionButton: {
    margin: 0,
    backgroundColor: theme.colors.background,
    borderRadius: 8,
  },
  emptyContainer: {
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: theme.colors.subtext,
    fontSize: 15,
    textAlign: 'center',
  },
  pagination: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
});

export default CustomDataTable;