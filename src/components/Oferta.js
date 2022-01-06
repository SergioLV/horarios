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
import Skeleton from "@mui/material/Skeleton";

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
    overflow: "hidden",
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

const sample = [
  ["Frozen yoghurt", 159, 6.0, 24, 4.0],
  ["Ice cream sandwich", 237, 9.0, 37, 4.3],
  ["Eclair", 262, 16.0, 24, 6.0],
  ["Cupcake", 305, 3.7, 67, 4.3],
  ["Gingerbread", 356, 16.0, 49, 3.9],
];

function createData(id, dessert, calories, fat, carbs, protein) {
  return { id, dessert, calories, fat, carbs, protein };
}

const rows = [];

for (let i = 0; i < 200; i += 1) {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  rows.push(createData(i, ...randomSelection));
}

const carreras = [
  { label: "Industrial" },
  { label: "Obras" },
  { label: "Informática" },
];

function Oferta() {
  const [curso, setCurso] = useState("");
  const [informatica, setInformatica] = useState([]);
  const [obras, setObras] = useState([]);
  const [carrera, setCarrera] = useState("informatica");
  const [loadingCursos, setLoadingCursos] = useState(false);
  const [cursos, setCursos] = useState([
    {
      asignatura: "",
      nombre_asignatura: "",
      creditos_asignatura: "",
      asignaturas_referenciadas: null,
      seccion: "",
      descripcion_evento: "",
      horario: "",
      profesor: "",
      sede: "",
    },
  ]);
  const [filtered, setFiltered] = useState([
    {
      asignatura: "",
      nombre_asignatura: "",
      creditos_asignatura: "",
      asignaturas_referenciadas: null,
      seccion: "",
      descripcion_evento: "",
      horario: "",
      profesor: "",
      sede: "",
    },
  ]);
  useEffect(() => {
    let newc = cursos.filter((c) =>
      c.nombre_asignatura.includes(curso.toUpperCase())
    );
    setFiltered(newc);
  }, [curso]);
  const aux = (e, value) => {
    if (value === null) {
      return;
    }

    // console.log("diuca");
  };

  useEffect(() => {
    setLoadingCursos(true);
    const getCursos = () => {
      axios
        .get("https://horariosfic.herokuapp.com/informatica")
        .then((response) => {
          setInformatica(response.data.rows);
          setCursos(informatica);
          setFiltered(response.data.rows);
          setLoadingCursos(false);
        })
        .catch((e) => {
          //
        });
    };
    getCursos();
  }, [carrera]);

  // useEffect(() => {

  //   const getCursos = () => {
  //     axios
  //       .get("https://horariosfic.herokuapp.com/obras")
  //       .then((response) => {
  //         setObras(response.data.rows);

  //       })
  //       .catch((e) => {

  //       });
  //   };
  //   getCursos();
  // }, [carrera]);

  return (
    <div className="page__content__oferta">
      <div className="buscador__oferta">
        <div className="selector__carrera__oferta">
          <h2>Selecciona una carrera</h2>
          <Autocomplete
            id="disable-close-on-select"
            // disableCloseOnSelect
            onChange={(e, value) =>
              setCarrera(
                value.label
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/\p{Diacritic}/gu, "")
              )
            }
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
          <TextField
            autoComplete="false"
            label="Busca un ramo"
            onChange={(e) => setCurso(e.target.value)}
          />
        </div>
      </div>
      <div className="table__oferta">
        <Paper style={{ height: 400, width: "100%" }}>
          <VirtualizedTable
            rowCount={loadingCursos ? rows.length : filtered.length}
            rowGetter={
              loadingCursos
                ? ({ index }) => rows[index]
                : ({ index }) => filtered[index]
            }
            columns={[
              {
                width: 120,
                label: "Asignatura",
                dataKey: "asignatura",
              },
              {
                width: 280,
                label: "Nombre Asignatura",
                dataKey: "nombre_asignatura",
              },
              {
                width: 94,
                label: "Créditos",
                dataKey: "creditos_asignatura",
                // numeric: true,
              },
              {
                width: 160,
                label: "Sección",
                dataKey: "seccion",
              },
              {
                width: 240,
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
    </div>
  );
}

export default Oferta;
