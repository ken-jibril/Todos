export async function handler(event) {
  const token = process.env.VITE_API_TOKEN;

  const response = await fetch('https://stub.muindetuva.com/api/todos', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}
