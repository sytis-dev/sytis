import { eventsOne } from "@/data/eventsSection";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import { useRouter } from "next/router";
import SingleEventsOne from "./SingleEventsOne";
import EventsCalendar from "./EventsCalendar";
import EventsViewToggle from "./EventsViewToggle";

const EventsOne = () => {
  const router = useRouter();
  const [currentView, setCurrentView] = useState('grid');

  // Initialize view from URL query parameter or default to grid
  useEffect(() => {
    const { view } = router.query;
    if (view === 'calendar' || view === 'grid') {
      setCurrentView(view);
    } else {
      // Default to grid view if no valid view parameter
      setCurrentView('grid');
    }
  }, [router.query]);

  const handleViewChange = (view) => {
    setCurrentView(view);
    // Update URL query parameter
    router.push({
      pathname: router.pathname,
      query: { ...router.query, view }
    }, undefined, { shallow: true });
  };

  // Function to check if an event has passed
  const isEventPast = (event) => {
    const eventEndDate = new Date(event.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    return eventEndDate < today;
  };

  return (
    (<section className="events-one">
      <div className="auto-container">
        <EventsViewToggle 
          currentView={currentView} 
          onViewChange={handleViewChange} 
        />
        
        {currentView === 'grid' ? (
          <>
            <Row>
              {eventsOne.map((event) => (
                <SingleEventsOne 
                  key={event.id} 
                  event={event} 
                  isPast={isEventPast(event)}
                />
              ))}
            </Row>

            <div className="more-box text-center">
              <Link href="/events" className="theme-btn btn-style-one" legacyBehavior>
                <i className="btn-curve"></i>
                <span className="btn-title">Load more events</span>
              </Link>
            </div>
          </>
        ) : (
          <EventsCalendar />
        )}
      </div>
    </section>)
  );
};

export default EventsOne;
