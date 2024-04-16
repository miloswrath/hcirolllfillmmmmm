import Papa from 'papaparse'
import React, { useEffect, useState } from 'react';



async function fetchAndParseCSV(csvFilePath) {
    try {
      const response = await fetch(csvFilePath);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const csvData = await response.text();
  
      return new Promise((resolve, reject) => {
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: function(results) {
            resolve(results.data);
          },
          error: function(error) {
            reject(error);
          }
        });
      });
    } catch (error) {
      console.error('Error fetching or parsing CSV:', error);
      throw error;  // Re-throw to allow the caller to handle it
    }
  }

  export default fetchAndParseCSV;