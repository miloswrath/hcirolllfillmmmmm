// Suggested code may be subject to a license. Learn more: ~LicenseLog:3754889339.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:4242317041.
import React from 'react';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import Papa from 'papaparse';
import WorkIcon from '@mui/icons-material/Movie'; // Ensure you have this imported

function loadAndRenderTimelineElements(csvFilePath) {
  return fetch(csvFilePath)  // Return the fetch promise
    .then(response => response.text())
    .then(csvText => {
      return new Promise((resolve, reject) => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const data = results.data;
            const elements = renderTimelineElements(data);
            resolve(elements);  // Resolve the promise with the timeline elements
          },
          error: (error) => reject(error)  // Reject on error
        });
      });
    });
}

function renderTimelineElements(data) {
  return data.map((item, index) => (
    <VerticalTimelineElement
      key={index}
      className="vertical-timeline-element--work"
      contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
      contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
      date={item.Release_Year}
      iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
      icon={<WorkIcon />}
    >
      <h3 className="vertical-timeline-element-title">{item.Series_Title}</h3>
      <h4 className="vertical-timeline-element-subtitle">{item.Release_Year}</h4>
      <p>{item.Overview}</p>
    </VerticalTimelineElement>
  ));
}
export default loadAndRenderTimelineElements;