'use server'
import Papa from 'papaparse'

export async function checkCSV(e) {
    const file = e.target.files[0];
    const reader =  new FileReader()
    reader.onload = function (e) {
      const csvData = e.target.result;
  
      Papa.parse(csvData, {
        complete: function (results) {
          const { data } = results;
          
          // Extract the columns from the first row of data
          const columns = data.length > 0 ? data[0] : [];
  
          // Handle the columns as needed
          console.log(columns); // Array containing the column names
  
          // Rest of your code...
        },
      })
    }
  
    reader.readAsText(file)
}