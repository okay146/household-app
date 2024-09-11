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
import { isSameMonth } from 'date-fns';


interface CalendarProps {
    monthlyTransactions: Transaction[],
    setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>,
    setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
    currentDay: string;
    today: string;
}

const Calender = (
    {
        monthlyTransactions, 
        setCurrentMonth, 
        setCurrentDay, 
        currentDay,
        today,
    }: CalendarProps) => {


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


    // 月の日付取得
    const handleDateSet = (datesetInfo: DatesSetArg) => {
        const currentMonth = datesetInfo.view.currentStart;
        setCurrentMonth(currentMonth);
        // 今月のデータも含めて取得
        const todayDate = new Date();

        // currentMonthが今月の場合のみ今日の日付を取得
        // todayDateには今月の情報、currentMonthは現在表示中の月
        if(isSameMonth(todayDate, currentMonth)) {
            // 現在表示中の月が今月の場合true。
            // 「今日」ボタンを押した時のみ今日の日付を取得
            setCurrentDay(today);
        }
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