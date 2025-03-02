import { Eventcalendar, setOptions, Toast } from '@mobiscroll/react';
import { useCallback, useMemo, useState } from 'react';
import * as fs from 'node:fs';

setOptions({
  theme: 'ios',
  themeVariant: 'light'
});

function EventCalendarComponent() {
  const config = JSON.parse(fs.readFileSync('./config.json').toString());
  const events = config.events;

  const [myEvents, setMyEvents] = useState(events.map(event => ({
    start: new Date(event.date),
    end: new Date(event.date),
    title: event.name
  })));
  const [isToastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState();

  const myView = useMemo(
    () => ({
      calendar: { type: 'month' },
      agenda: { type: 'month' },
    }),
    [],
  );

  const handleToastClose = useCallback(() => {
    setToastOpen(false);
  }, []);

  const handleEventClick = useCallback((args) => {
    setToastMessage(args.event.title);
    setToastOpen(true);
  }, []);

  return (
    <>
      <Eventcalendar
        view={myView}
        data={myEvents}
        onEventClick={handleEventClick}
      />
      <Toast
        isOpen={isToastOpen}
        message={toastMessage}
        onClose={handleToastClose}
      />
    </>
  );
}

export default EventCalendarComponent;
