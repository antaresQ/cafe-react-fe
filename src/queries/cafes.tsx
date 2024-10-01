import { useQuery, useMutation } from "@tanstack/react-query";
import { Cafe } from "../types";
import default_headers from "./default_headers";

export function getCafes(location?: string) {
    
  let api_url = (location == undefined || location == null || location === 'null')  ? 
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/cafes` : 
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/cafes?location=${location}`;

  return useQuery({
    queryKey: ['GET_Cafes', location],
    queryFn: async () => {
      const response =  await fetch(api_url,
      {
        method: 'GET',
        mode: 'cors',
        headers:  default_headers()
      })

      return await response.json();
    }
  })
}

export function getCafe(cafe_id: string) {
    
  let api_url = `${import.meta.env.VITE_API_BASE_URL}/api/v1/cafe?cafe_id=${cafe_id}`;

  return useQuery({
    queryKey: ['GET_CAFE', cafe_id],
    queryFn: async () => {
      const response =  await fetch(api_url,
      {
        method: 'GET',
        mode: 'cors',
        headers: default_headers()
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

      let url = `${import.meta.env.VITE_API_BASE_URL}/api/v1/cafe`
      if(cafe.name.length < 6) {url += `?cafeId=${cafe.id}`}

      let http_method = cafe.name.length < 6 ? 'DELETE' : cafe.id ? 'PUT' : 'POST';

      const response = await fetch(url, 
      {
        method: http_method,
        mode: 'cors',
        headers: default_headers(),
        body: JSON.stringify(cafe)
      })
      
      return await response.json()
    },
    onSuccess(data, variables, context) {
        return data
    },
    onError(error, variables, context) {
        console.log(error);
        return error
    },
  })
}