import { AppLayout } from './components/AppLayout';
import { CalendarTable } from './components/CalendarTable';
import { ErrorBox } from './components/ErrorBox';
import { FilterGroup } from './components/FilterGroup';
import { HolidayContextProvider } from './holidayStore';

function App() {
  return (
    <HolidayContextProvider>
      <AppLayout>
        <ErrorBox />
        <FilterGroup />
        <CalendarTable />
      </AppLayout>
    </HolidayContextProvider>
  )
}

export default App
