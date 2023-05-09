const fs = require('fs')
const {csvModel} = require('../Model/csvModel')
const csv = require('csv-string')
const path = require('path')    
const CSVFileValidator  = require('csv-file-validator')
const config = {
    headers: [
        {
            name: 'url',
            inputName: 'url',
            required: true,
        },
        {
            name: 'lastModifiedDate',
            inputName: 'lastModifiedDate',
            required: true,
            validate: function(lastModifiedDate, rowNumber, columnNumber) {
                var dateFormat = /(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-\d{4}/ ;
              if(lastModifiedDate.match(dateFormat)){
                  return 'date format'
            }
        }
     },
        {
            name: 'priority',
            inputName: 'priority',
            required: false,
            validate : function(priority, rowNumber, columnNumber){
                if(priority > 0 || priority < 1){
                     return `${priority} value must be between greater than 0 lessthan 1 is not valid in the ${rowNumber} row / ${columnNumber} column`
                }
            }
        },
        {
            name: 'changeFrequency',
            inputName: 'changeFrequency',
            required: false,
            validate : function(changeFrequency, rowNumber, columnNumber){
                if(changeFrequency.includes('always') || changeFrequency.includes('hourly')
                 || changeFrequency.includes('daily') ||changeFrequency.includes('weekly') || 
                 changeFrequency.includes('monthly') || changeFrequency.includes('yearly') || changeFrequency.includes('never')){
                     return `${changeFrequency} value must be between greater than 0 lessthan 1 is not valid in the ${rowNumber} row / ${columnNumber} column`
                }
            }
        }
       
    ], // required
    isHeaderNameOptional: false, // default (optional)
    isColumnIndexAlphabetic: false // default (optional)
}
const getCsv = async (req, res) => {
    try{
    let enc = req.query.data
            const result = atob(enc)
            CSVFileValidator(result, config)
       .then(async csvData => {
      const data = csvData // Array of objects from file
      if(data.data.length > 0 || data.inValidData.length > 0){
        if(data.inValidData.length > 0){
            return res.status(400).json({error : data.inValidData[0]})
        }
        else{
            const resultData = new csvModel({
                csvData : data.data
            })
            await resultData.save()
        return res.status(200).json({result : data.data})
        }
      }
      else{
        return res.status(404).json({error : "Empty csv file"})
      }

    })
    .catch(err => {
        return res.status(404).json({error : err.message})
    })
     }
     catch(err){
        return res.status(404).json({error : err.message})
     }
    }

    
module.exports = {getCsv : getCsv}