import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja'
import "../calendar.css"

const Calender = () => {
    const events = [
        { title: 'Meeting', start: new Date() },
    ]; 

    return (
        <FullCalendar 
            plugins={[dayGridPlugin]}
            initialView='dayGridMonth'
            locale={jaLocale}
            events={events}
        />
    );
};

export default Calender;