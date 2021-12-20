import React from "react";

import {
  Scheduler,
  WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";

function Schedule() {
  return (
    <div className="scheduler__container">
      <div className="scheduler">
        <Scheduler className="scheduler__react" locale="es-ES" excludedDays={7}>
          <WeekView
            excludedDays={[0]}
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
