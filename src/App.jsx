
import { useState, useEffect } from 'react';
import React from 'react';
import './App.css';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import loadAndRenderTimelineElements from './parse.jsx';


function TimelineComponent() {
  const [elements, setElements] = useState(null);

  useEffect(() => {
    loadAndRenderTimelineElements('./src/assets/data/imdb_top_1000.csv')
      .then(elements => setElements(elements))
      .catch(error => console.error('Error loading CSV:', error));
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
      />
      <button>Search</button>
      <h1>RollFilm</h1>
      <p>Top 1000 movies of all time</p>
      <button> Filters </button>

      <button> Sort By </button>
      <VerticalTimeline>{elements}
      </VerticalTimeline>

    </div>
  );
}

  
export default TimelineComponent;