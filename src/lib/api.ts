export async function submitPhaseOne(name: string, location: string) {
    const res = await fetch(
      "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location }),
      }
    );
  
    if (!res.ok) throw new Error("API request failed");
    return res.json();
  }
  