import React, { useState, useEffect } from "react";
import { eventsOne } from "@/data/eventsSection";
import EventModal from "./EventModal";
import { Col, Row } from "react-bootstrap";

const EventsCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // Utility function to ensure we never render Date objects
  const safeRender = (value) => {
    if (value instanceof Date) {
      console.warn('Attempted to render Date object:', value);
      return value.toDateString();
    }
    if (value === null || value === undefined) {
      return '';
    }
    return String(value);
  };

  useEffect(() => {
    // Process events data to include proper date objects
    const processedEvents = eventsOne.map(event => {
      // Parse dates in format "DD MMM YYYY" (e.g., "14 Oct 2025")
      const startDate = new Date(event.date);
      const endDate = new Date(event.endDate);
      
      // Check if dates are valid
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.warn(`Invalid date format for event ${event.id}: ${event.date} or ${event.endDate}`);
        return null;
      }
      
      return {
        ...event,
        startDate,
        endDate,
        startDay: startDate.getDate(),
        startMonth: startDate.getMonth(),
        startYear: startDate.getFullYear(),
        endDay: endDate.getDate(),
        endMonth: endDate.getMonth(),
        endYear: endDate.getFullYear()
      };
    }).filter(Boolean); // Remove any events with invalid dates
    
    setEvents(processedEvents);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    // Ensure we return primitive values
    return { 
      daysInMonth: parseInt(daysInMonth, 10), 
      startingDayOfWeek: parseInt(startingDayOfWeek, 10) 
    };
  };

  const getEventsForDay = (day) => {
    return events.filter(event => {
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      
      // Check if event spans this day
      const eventStart = new Date(event.startYear, event.startMonth, event.startDay);
      const eventEnd = new Date(event.endYear, event.endMonth, event.endDay);
      const currentDay = new Date(currentYear, currentMonth, day);
      
      // Ensure we're comparing valid dates
      if (isNaN(eventStart.getTime()) || isNaN(eventEnd.getTime()) || isNaN(currentDay.getTime())) {
        return false;
      }
      
      return currentDay >= eventStart && currentDay <= eventEnd;
    });
  };

  const goToPreviousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const goToCurrentMonth = () => {
    setCurrentDate(new Date());
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  // Ensure monthNames array is safe to access
  const getMonthName = (monthIndex) => {
    if (monthIndex >= 0 && monthIndex < monthNames.length) {
      return monthNames[monthIndex];
    }
    return '';
  };

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const renderCalendarDays = () => {
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day);
      const hasEvents = dayEvents.length > 0;
      
      // Create date objects for comparison
      const today = new Date();
      const currentDayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = today.getDate() === currentDayDate.getDate() && 
                     today.getMonth() === currentDayDate.getMonth() && 
                     today.getFullYear() === currentDayDate.getFullYear();
      
      // Ensure all values being rendered are primitives, not objects
      const dayNumber = parseInt(day, 10);
      const eventCount = parseInt(dayEvents.length, 10);
      

      
      // Ensure all values are primitives before rendering
      const dayKey = String(day);
      const hasEventsClass = hasEvents ? 'has-events' : '';
      const todayClass = isToday ? 'today' : '';
      const calendarDayClass = `calendar-day ${hasEventsClass} ${todayClass}`.trim();
      
      days.push(
        <div 
          key={dayKey} 
          className={calendarDayClass}
        >
          <div className="day-number">{safeRender(dayNumber)}</div>
          {hasEvents && (
            <div className="day-events">
              {dayEvents.slice(0, 2).map((event, index) => (
                <div key={String(event.id)} className="day-event">
                  <button 
                    className="event-link" 
                    title={safeRender(event.title)}
                    onClick={() => handleEventClick(event)}
                  >
                    {event.title && event.title.length > 20 ? safeRender(event.title.substring(0, 20) + '...') : safeRender(event.title)}
                  </button>
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div className="more-events">+{safeRender(eventCount - 2)} more</div>
              )}
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };

  return (
    <section className="events-calendar">
      <div className="auto-container">
        <div className="calendar-header">
          <div className="calendar-navigation">
            <button 
              onClick={goToPreviousMonth}
              className="calendar-nav-btn"
              aria-label="Previous month"
            >
              ←
            </button>
            
            <div className="calendar-title">
              <h3>{safeRender(getMonthName(currentDate.getMonth()))} {safeRender(currentDate.getFullYear())}</h3>
              <button 
                onClick={goToCurrentMonth}
                className="current-month-btn"
              >
                Today
              </button>
            </div>
            
            <button 
              onClick={goToNextMonth}
              className="calendar-nav-btn"
              aria-label="Next month"
            >
              →
            </button>
          </div>
        </div>

        <div className="calendar-grid">
          <div className="calendar-weekdays">
            {dayNames.map(day => (
              <div key={String(day)} className="weekday-header">{safeRender(day)}</div>
            ))}
          </div>
          
          <div className="calendar-days">
            {renderCalendarDays()}
          </div>
        </div>

        <div className="calendar-legend">
          <div className="legend-item">
            <span className="legend-dot has-events"></span>
            <span>Events</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot today"></span>
            <span>Today</span>
          </div>
        </div>
      </div>
      
      <EventModal 
        show={showModal}
        onHide={handleCloseModal}
        event={selectedEvent ? {
          ...selectedEvent,
          // Ensure only primitive values are passed, not Date objects
          startDate: undefined,
          endDate: undefined,
          // Also ensure all other properties are safe
          id: safeRender(selectedEvent.id),
          title: safeRender(selectedEvent.title),
          date: safeRender(selectedEvent.date),
          endDate: safeRender(selectedEvent.endDate),
          time: safeRender(selectedEvent.time),
          address: safeRender(selectedEvent.address),
          link: safeRender(selectedEvent.link),
          days: safeRender(selectedEvent.days),
          month: safeRender(selectedEvent.month),
          image: safeRender(selectedEvent.image)
        } : null}
      />
    </section>
  );
};

export default EventsCalendar;
