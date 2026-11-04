export async function submitAnswer(questionId: number, optionId: number) {
  const res = await fetch(`http://localhost:8000/answers/${questionId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      /* 
      Before auth gets wired up, test with access code from Swagger UI 
      Put that into an `env.local` file in the variable NEXT_PUBLIC_AUTH_TOKEN to use below
      When auth wired up, change the line below to Authorization: `Bearer ${getToken()}`
      */ 
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
    },
    body: JSON.stringify({ userAnswer: optionId }),
  });
  if (!res.ok) throw new Error(`Submit failed: ${res.status}`);
  return (await res.json()) as { is_correct: boolean };
}
