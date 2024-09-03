import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja'
import "../calendar.css"
import { EventContentArg } from '@fullcalendar/core';

const Calender = () => {
    const events = [
        { title: 'Meeting', start: new Date() },
    ]; 
    const renderEventContent = (eventInfo: EventContentArg) => {
        console.log(eventInfo);
        return (
            <div>
                <div className='money' id='event-income'>
                    {eventInfo.event.extendedProps.income}
                </div>

                <div className='money' id='event-expense'>
                    {eventInfo.event.extendedProps.expense}
                </div>

                <div className='money' id='event-balance'>
                    {eventInfo.event.extendedProps.balance}
                </div>
            </div>
        );
    };

    return (
        <FullCalendar 
            plugins={[dayGridPlugin]}
            initialView='dayGridMonth'
            locale={jaLocale}
            events={events}
            eventContent={renderEventContent}
        />
    );
};

export default Calender;