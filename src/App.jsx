
import { useState, useEffect } from 'react';
import React from 'react';
import './App.css';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import loadAndRenderTimelineElements from './parse.jsx';



function TimelineComponent() {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    loadAndRenderTimelineElements('src/data/imdb_top_1000.csv')
      .then(elements => setElements(elements))  // Set state with the resolved elements
      .catch(error => console.error('Error loading CSV:', error));
  }, []);

  return (
    <div>
      <VerticalTimeline>
        {elements}
      </VerticalTimeline>
    </div>
  );
}
  
export default TimelineComponent;