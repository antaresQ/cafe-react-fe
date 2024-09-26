import { useQuery, useMutation } from "@tanstack/react-query";
import { Cafe } from "../types";

export function getCafes(location?: string) {
    
  let api_url = (location != undefined && location?.length > 0) ? `/api/v1/cafes?location=${location}` : '/api/v1/cafes';

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

export function getCafe(cafe_id: string) {
    
  let api_url = `/api/v1/cafe?cafe_id=${cafe_id}`;

  return useQuery({
    queryKey: ['GET_Cafe'],
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

export function useCafeData() {
  return useMutation({
    mutationKey: ['MUTATE_CAFE'],
    mutationFn: async (cafe:Cafe) => {
      //event.preventDefault();
      const response = await fetch('/api/v1/cafe', 
      {
        method: cafe.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cafe)
      })
      
      return await response.json()
    },
    onSuccess(data, variables, context) {
        
    },
    onError(error, variables, context) {
        console.log('Fetch PUT failed:')
        console.log(error);
    },
  })
}