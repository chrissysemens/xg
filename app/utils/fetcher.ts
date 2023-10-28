const headers: Record<string, string> = {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY!,
    "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST!,
  };

export const fetcher = <T,>(url:string, config: RequestInit): Promise<Array<T>> => fetch(url , {...config, headers})
    .then((res) => res.json())
    .then(json => {
    return json.result as Array<T>
});
