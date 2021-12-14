import React from "react";

import {
  Scheduler,
  WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";

function Schedule() {
  return (
    <div className="scheduler">
      <Scheduler
        height={700}
        locale="es-ES"
        firstDayOfWeek={1}
        style={{ color: "#FFF" }}
      >
        <WeekView
          startDayHour={7}
          endDayHour={20}
          cellDuration={60}
          //   timeTableCellComponent={TimeTableCell}
        />
        {/* <Appointments /> */}
      </Scheduler>
    </div>
  );
}

export default Schedule;
