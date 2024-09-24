import { useQuery } from "@tanstack/react-query";

export function getCafes(location?: string) {
    
  let api_url = (location != undefined && location?.length > 0) ? `/api/v1/cafes/${location}` : '/api/v1/cafes';

  return useQuery({
    queryKey: ['GET_Cafes'],
    queryFn: async () => {
      const response =  await fetch(api_url,
      {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json'
        }
      })

      return await response.json();
    }
  })
}