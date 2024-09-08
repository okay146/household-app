import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import "../calendar.css";
import { DatesSetArg, EventContentArg } from '@fullcalendar/core';
import { Balance, CalendarContent, Transaction } from '../types';
import { calculateDailyBalance } from '../utils/financeCalculations';
import { formatCurrency } from '../utils/formatting';


interface CalendarProps {
    monthlyTransactions: Transaction[],
    setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>,
}

const Calender = ({monthlyTransactions, setCurrentMonth}: CalendarProps) => {
    const events = [
        { title: 'Meeting', start: "2024-09-16", income: 300, expense: 200, balance: 100 },
    ];

    const daylyBalances = calculateDailyBalance(monthlyTransactions)

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


    const createCalendarEvents = (daylyBalances: Record<string, Balance>): CalendarContent[] => {
        return Object.keys(daylyBalances).map((date) => {
            const {income, expense, balance} = daylyBalances[date];
            return {
                start: date,
                income: formatCurrency(income),
                expense: formatCurrency(expense),
                balance: formatCurrency(balance),
            }
        })
    };

    const calendarEvents =  (createCalendarEvents(daylyBalances));

    const handleDateSet = (datesetInfo: DatesSetArg) => {
        setCurrentMonth(datesetInfo.view.currentStart)
    }

    return (
        <FullCalendar 
            plugins={[dayGridPlugin]}
            initialView='dayGridMonth'
            locale={jaLocale}
            events={calendarEvents}
            eventContent={renderEventContent}
            datesSet={handleDateSet}
        />
    );
};

export default Calender;