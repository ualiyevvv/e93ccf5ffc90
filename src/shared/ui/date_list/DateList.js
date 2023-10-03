import React, {useState} from 'react';

import styles from './dateList.module.css'

export default function DateList({
}){

    // чекаем текущую дату, вытаскиваем месяц, берем -3, +3 диапозон и строим даты в объект
    // [{date: Date, events: [{event},{event}]}]
    // а нет, лучше динамически при выборе даты вытаскивать из бд сущности по scheduled_date

    // const generateWeekdays = () => {
    //     const weekdays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    //     return weekdays.map((day, index) => (
    //         <div key={index} className="weekday">
    //             {day}
    //         </div>
    //     ));
    // };
    function getDayOfWeek(date) {
        const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        const dayIndex = date.getDay();

        return daysOfWeek[dayIndex];
    }

    function getFullDay(date) {
        const year = date.getFullYear(); // Get the current year
        const month = date.getMonth() + 1; // Get the current month (Note: Months are zero-based, so add 1)
        const day = date.getDate(); // Get the current day of the month

        // Format the full date as a string
        return `${year}-${month}-${day} `;
    }

    function isDateCurrent(date) {
        const currentDate = new Date(); // Get the current date and time

        // Compare the year, month, and day of the given date with the current date
        const isCurrentYear = date.getFullYear() === currentDate.getFullYear();
        const isCurrentMonth = date.getMonth() === currentDate.getMonth();
        const isCurrentDay = date.getDate() === currentDate.getDate();

        // If all components (year, month, and day) match, it's the current date
        return isCurrentYear && isCurrentMonth && isCurrentDay;
    }
// Функция для генерации дат месяца
    const generateCalendarDates = (year, month) => {
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const startDate = new Date(firstDayOfMonth);
        const endDate = new Date(lastDayOfMonth);

        const dates = [];

        while (startDate <= endDate) {
            dates.push(new Date(startDate));
            startDate.setDate(startDate.getDate() + 1);
        }

        return dates.map((date, index) => (
            <div key={index} className={styles.calendar_date} >
                {isDateCurrent(date) ? 'TODAY' : <>
                    <span>{date.getDate()}</span>
                    <span>{getDayOfWeek(date)}</span>
                </>}
                <div key={index} className={styles.calendar_date__full}>
                    * {getFullDay(date)} *
                </div>
            </div>
        ));
    };

    return (
        <div className={styles.DateList}>
            {/*<div className={styles.weekdays}>{generateWeekdays()}</div>*/}
            <div className={styles.calendar_dates}>{generateCalendarDates(2023, 8)}</div>
        </div>
    );
}

