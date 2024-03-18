import { ThemeProvider } from '@emotion/react';
import * as React from 'react';
import { DateRangePicker, ThemingProvider,  } from 'rsuite';


export default function BasicDateRangePicker() {
  return (
    <div>
      
        <DateRangePicker 
          showOneCalendar
          defaultCalendarValue={""}
          showHeader={false}
          placeholder="Enter Date"
        />
    </div>
  );
}