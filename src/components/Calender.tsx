import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import "../calendar.css";
import { DatesSetArg, EventContentArg } from '@fullcalendar/core';
import { Balance, CalendarContent, Transaction } from '../types';
import { calculateDailyBalance } from '../utils/financeCalculations';
import { formatCurrency } from '../utils/formatting';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { Palette } from '@mui/icons-material';
import { useTheme } from '@mui/material';


interface CalendarProps {
    monthlyTransactions: Transaction[],
    setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>,
    setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
    currentDay: string;
}

const Calender = (
    {
        monthlyTransactions, 
        setCurrentMonth, 
        setCurrentDay, 
        currentDay
    }: CalendarProps) => {

    const events = [
        { title: 'Meeting', start: "2024-09-16", income: 300, expense: 200, balance: 100 },
    ];

    const theme = useTheme();

    const daylyBalances = calculateDailyBalance(monthlyTransactions)

    // 選択した日付に背景色をつける
    const backgroundEvent = {
        start: currentDay, // 選択した日付
        display: "background",
        backgroundColor: theme.palette.incomeColor.light,
    }

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

    // 日付を選択したときに発火
    const handleDateClick = (dateInfo: DateClickArg) => {
        // 
        setCurrentDay(dateInfo.dateStr)
    }

    return (
        <FullCalendar 
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView='dayGridMonth'
            locale={jaLocale}
            events={[...calendarEvents, backgroundEvent]}
            eventContent={renderEventContent}
            datesSet={handleDateSet}
            dateClick={handleDateClick}
        />
    );
};

export default Calender;