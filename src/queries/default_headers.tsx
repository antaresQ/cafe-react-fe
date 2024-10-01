import React from 'react'

function default_headers() {
    const default_Fetch_Headers = 
    {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }
    
  return default_Fetch_Headers
}

export default default_headers