import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import "../calendar.css";
import { EventContentArg } from '@fullcalendar/core';

const Calender = () => {
    const events = [
        { title: 'Meeting', start: "2024-09-16", income: 300, expense: 200, balance: 100 },
    ]; 

    const renderEventContent = (eventInfo: EventContentArg) => {
        console.log(eventInfo);
        console.log(eventInfo.event.extendedProps);
        return (
            <div>
                <div className="money" id="event-income">
                    {eventInfo.event.extendedProps.income}
                </div>

                <div className="money" id="event-expense">
                    {eventInfo.event.extendedProps.expense}
                </div>

                <div className="money" id="event-balance">
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