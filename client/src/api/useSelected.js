export const useSelected = async (id, status) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/class/status/${id}`,
      {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ status }),
      }
    )
    const data = await response.json()
    return data
  }
