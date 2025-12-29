export default async function Home() {
  const res = await fetch(
    `/api/testAPI`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    } 
  );
  if (!res.ok) {
    const text = await res.text();
    console.error("POST failed:", text);
    throw new Error("POST failed");
  }
  const data = await res.json();

  const res2 = await fetch(
    `/api/testAPI`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Dean"
      })
  }
  );

  if (!res2.ok) {
    const text = await res2.text();
    console.error("POST failed:", text);
    throw new Error("POST failed");
  }
  const data2 = await res2.json();

  return (
    <>
      <p>{data.message}</p>
      <p>{data2.message}</p>
    </>
  )
}
