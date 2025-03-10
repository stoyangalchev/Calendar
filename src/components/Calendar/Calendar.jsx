import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = ({ onYearChange }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState({});
    const [modalContent, setModalContent] = useState(null);
    const [modalDate, setModalDate] = useState(null);
    const [newEvent, setNewEvent] = useState('');

    useEffect(() => {
        onYearChange(currentDate.getFullYear());
    }, [currentDate, onYearChange]);

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    const generateCalendar = () => {
        const daysInMonth = getDaysInMonth(currentDate.getMonth(), currentDate.getFullYear());
        const firstDay = getFirstDayOfMonth(currentDate.getMonth(), currentDate.getFullYear());

        const daysArray = [];
        for (let i = 0; i < firstDay; i++) {
            daysArray.push(null);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            daysArray.push(day);
        }

        return daysArray;
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    };

    const handleDayClick = (day) => {
        const date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
        setModalDate(date);
        setModalContent(events[date] || '');
        setNewEvent('');
        document.getElementById('event-modal').style.display = 'flex';
    };

    const handleEventChange = (e) => {
        setNewEvent(e.target.value);
    };

    const saveEvent = () => {
        if (newEvent) {
            setEvents({
                ...events,
                [modalDate]: newEvent,
            });
        }
        closeModal();
    };

    const deleteEvent = () => {
        const updatedEvents = { ...events };
        delete updatedEvents[modalDate];
        setEvents(updatedEvents);
        closeModal();
    };

    const closeModal = () => {
        document.getElementById('event-modal').style.display = 'none';
        setModalContent(null);
        setModalDate(null);
    };

    const days = generateCalendar();
    const today = new Date();

    return (
        <div className="calendar">
            <div className="calendar-header">
                <button onClick={handlePrevMonth}>Prev</button>
                <span>
                    {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                </span>
                <button onClick={handleNextMonth}>Next</button>
            </div>
            <div className="calendar-grid">
                {days.map((day, index) => {
                    const isToday =
                        day &&
                        today.getDate() === day &&
                        today.getMonth() === currentDate.getMonth() &&
                        today.getFullYear() === currentDate.getFullYear();
                    return (
                        <div
                            key={index}
                            className={`calendar-day ${day ? '' : 'empty'} ${isToday ? 'today' : ''}`}
                            onClick={day ? () => handleDayClick(day) : null}
                        >
                            {day && (
                                <>
                                    <span>{day}</span>
                                    {events[`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`] && (
                                        <div className="event" onClick={() => handleDayClick(day)}>
                                            <span>
                                                {events[`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`]
                                                    .slice(0, 5)}
                                            </span>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
            <div id="event-modal" className="modal" onClick={closeModal}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    {modalContent ? (
                        <>
                            <span>{modalContent}</span>
                            <button className="modal-delete" onClick={deleteEvent}>Delete</button>
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                value={newEvent}
                                onChange={handleEventChange}
                                placeholder="Enter your event"
                            />
                            <button className="modal-save" onClick={saveEvent}>Save</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Calendar;