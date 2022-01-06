import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { AutoSizer, Column, Table } from "react-virtualized";

import axios from "axios";

import Footer from "./Footer";

const styles = (theme) => ({
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    "& .ReactVirtualized__Table__headerRow": {
      ...(theme.direction === "rtl" && {
        paddingLeft: "0 !important",
      }),
      ...(theme.direction !== "rtl" && {
        paddingRight: undefined,
      }),
    },
  },

  tableRow: {
    cursor: "pointer",
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: "initial",
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? "right"
            : "left"
        }
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick
        )}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? "right" : "left"}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const { classes, columns, rowHeight, headerHeight, ...tableProps } =
      this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: "inherit",
            }}
            style={{ backgroundColor: "#000" }}
            headerHeight={headerHeight}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    })
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const defaultTheme = createTheme();
const VirtualizedTable = withStyles(styles, { defaultTheme })(
  MuiVirtualizedTable
);

// ---

const carreras = [
  { label: "Industrial" },
  { label: "Obras" },
  { label: "Informática" },
];

function Oferta() {
  // console.log(rows);
  const [cursos, setCursos] = useState([]);
  const [loadingCursos, setLoadingCursos] = useState(false);
  useEffect(() => {
    setLoadingCursos(true);
    const getCursos = () => {
      axios
        .get("https://horariosfic.herokuapp.com/informatica")
        .then((response) => {
          setCursos(response.data.rows);
          setLoadingCursos(false);
          console.log(response.data.rows);
        })
        .catch((e) => {
          //
        });
    };
    getCursos();
  }, []);
  return (
    <div className="page__content__oferta">
      <div className="selector__carrera__oferta">
        <h2>Selecciona una carrera</h2>
        <Autocomplete
          id="disable-close-on-select"
          // disableCloseOnSelect
          options={carreras}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Carrera"
              id="filled-size-normal"
              // defaultValue="Normal"
              variant="standard"
              style={{ width: "9rem", marginRight: "1rem" }}
            />
          )}
        />
      </div>
      <div className="search__bar">
        <TextField label="Busca un ramo" />
      </div>
      <Paper style={{ height: 400, width: "100%" }}>
        <VirtualizedTable
          rowCount={cursos.length}
          rowGetter={({ index }) => cursos[index]}
          columns={[
            {
              width: 100,
              label: "Asignatura",
              dataKey: "asignatura",
            },
            {
              width: 280,
              label: "Nombre Asignatura",
              dataKey: "nombre_asignatura",
            },
            {
              width: 100,
              label: "Créditos",
              dataKey: "creditos",
              // numeric: true,
            },
            {
              width: 160,
              label: "Sección",
              dataKey: "seccion",
            },
            {
              width: 200,
              label: "Descripción Evento",
              dataKey: "descripcion_evento",
            },

            {
              width: 300,
              label: "Horario",
              dataKey: "horario",
            },
            {
              width: 300,
              label: "Profesor",
              dataKey: "profesor",
            },
            {
              width: 190,
              label: "Sede",
              dataKey: "sede",
            },
          ]}
        />
      </Paper>
    </div>
  );
}

export default Oferta;
