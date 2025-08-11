import React from "react";
import { Row, Col } from "react-bootstrap";

const EventsViewToggle = ({ currentView, onViewChange }) => {
  return (
    <div className="events-view-toggle">
      <div className="auto-container">
        <Row>
          <Col lg={12}>
            <div className="view-toggle-container">
              <div className="view-toggle-buttons">
                <button
                  className={`view-toggle-btn ${currentView === 'grid' ? 'active' : ''}`}
                  onClick={() => onViewChange('grid')}
                  aria-label="Grid View"
                >
                  <span className="toggle-icon">⊞</span>
                  <span className="toggle-label">Grid View</span>
                </button>
                <button
                  className={`view-toggle-btn ${currentView === 'calendar' ? 'active' : ''}`}
                  onClick={() => onViewChange('calendar')}
                  aria-label="Calendar View"
                >
                  <span className="toggle-icon">📅</span>
                  <span className="toggle-label">Calendar View</span>
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default EventsViewToggle;
