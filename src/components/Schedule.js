import React from "react";

import {
  Scheduler,
  WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";

function Schedule() {
  return (
    <div className="scheduler__container">
      <div className="scheduler">
        <Scheduler height={800} locale="es-ES" firstDayOfWeek={1}>
          <WeekView
            startDayHour={7}
            endDayHour={22}
            cellDuration={60}
            //   timeTableCellComponent={TimeTableCell}
          />
          {/* <Appointments /> */}
        </Scheduler>
      </div>
    </div>
  );
}

export default Schedule;
