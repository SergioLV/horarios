import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import PropTypes from "prop-types";
import clsx from "clsx";
import { styled } from "@mui/material/styles";
import { withStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { AutoSizer, Column, Table } from "react-virtualized";
import Skeleton from "@mui/material/Skeleton";

import axios from "axios";

// import Footer from "./Footer";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#000",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#000",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#000",
    },
    "&:hover fieldset": {
      borderColor: "#000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000",
    },
  },
});

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
    headerHeight: 58,
    rowHeight: 58,
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
  <Skeleton animation="wave" width={100} />,
  <Skeleton animation="wave" width={100} />,
  <Skeleton animation="wave" width={100} />,
  <Skeleton animation="wave" width={100} />,
  <Skeleton animation="wave" width={100} />,
  <Skeleton animation="wave" width={100} />,
  <Skeleton animation="wave" width={100} />,
  <Skeleton animation="wave" width={100} />,
];

function createData(id, s1, s2, s3, s4, s5, s6, s7, s8) {
  return { id, s1, s2, s3, s4, s5, s6, s7, s8 };
}

const rows = [];

for (let i = 0; i < 10; i += 1) {
  // const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  rows.push(createData(i, ...sample));
}

const carreras = [
  { label: "Industrial", query: "industrial", id: 1 },
  { label: "Obras", query: "obras", id: 2 },
  { label: "Inform??tica", query: "informatica", id: 3 },
  { label: "Cursos de Formaci??n General e Ingl??s", query: "cfg", id: 4 },
  {
    label: "Cursos Deportivos de Formaci??n General",
    query: "deportivos",
    id: 5,
  },
  { label: "Obstetricia y Neonatolog??a", query: "obstetricia", id: 6 },
];

function Oferta() {
  const [curso, setCurso] = useState("");
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
    setLoadingCursos(true);
    const getCursos = () => {
      axios
        .get("https://horariosfic.herokuapp.com/".concat(carrera))
        .then((response) => {
          setCursos(response.data.rows);
          setFiltered(response.data.rows);
          setLoadingCursos(false);
        })
        .catch((e) => {
          //
        });
    };
    getCursos();
  }, [carrera]);

  useEffect(() => {
    let newc = cursos.filter((c) =>
      c.nombre_asignatura.includes(curso.toUpperCase())
    );

    setFiltered(newc);
  }, [curso]);

  return (
    <div className="page__content__oferta">
      <div className="buscador__oferta">
        <div className="table__oferta">
          <div className="selector__carrera__oferta">
            <Autocomplete
              id="disable-close-on-select"
              value="Inform??tica"
              // disableCloseOnSelect
              onChange={(e, value) => setCarrera(value.query)}
              sx={{
                "& label.Mui-focused": {
                  color: "#000",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#000",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#000",
                  },
                  "&:hover fieldset": {
                    borderColor: "#000",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#000",
                  },
                },
              }}
              options={carreras}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Carrera"
                  id="filled-size-normal"
                  style={{ width: "15rem", marginRight: "1rem" }}
                />
              )}
            />
          </div>
          <div className="search__bar">
            <CssTextField
              autoComplete="false"
              label="Busca un ramo"
              id="custom-css-outlined-input"
              onChange={(e) => setCurso(e.target.value)}
            />
          </div>
        </div>
        <Paper style={{ height: 400, width: "100%" }}>
          <VirtualizedTable
            rowCount={loadingCursos ? rows.length : filtered.length}
            rowGetter={
              loadingCursos
                ? ({ index }) => rows[index]
                : ({ index }) => filtered[index]
            }
            columns={
              loadingCursos
                ? [
                    {
                      width: 120,
                      label: "Asignatura",
                      dataKey: "s1",
                    },
                    {
                      width: 280,
                      label: "Nombre Asignatura",
                      dataKey: "s2",
                    },
                    {
                      width: 94,
                      label: "Cr??ditos",
                      dataKey: "s3",
                      // numeric: true,
                    },
                    {
                      width: 160,
                      label: "Secci??n",
                      dataKey: "s4",
                    },
                    {
                      width: 240,
                      label: "Descripci??n Evento",
                      dataKey: "s5",
                    },

                    {
                      width: 300,
                      label: "Horario",
                      dataKey: "s6",
                    },
                    {
                      width: 300,
                      label: "Profesor",
                      dataKey: "s7",
                    },
                    {
                      width: 190,
                      label: "Sede",
                      dataKey: "s8",
                    },
                  ]
                : [
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
                      label: "Cr??ditos",
                      dataKey: "creditos_asignatura",
                      // numeric: true,
                    },
                    {
                      width: 160,
                      label: "Secci??n",
                      dataKey: "seccion",
                    },
                    {
                      width: 240,
                      label: "Descripci??n Evento",
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
                  ]
            }
          />
        </Paper>
      </div>
    </div>
  );
}

export default Oferta;
