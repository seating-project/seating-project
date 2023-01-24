
async function getData() {
    const res = await fetch('http://127.0.0.1:8000/cseii/')
    return res.json()
}

async function Homepage() {
    
    const data = await getData();
    console.log(data)
    return (

    <div>
        <h1>Welcome </h1>
        <p>Yes indeed</p>
        {data.map((item) => (
            <div key={item.id}>
                <h3>{item.name}</h3>
            </div>
        ))}
    </div>
  )
}


export default Homepage