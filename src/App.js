import './App.css';
import {useEffect, useState} from "react";
import axios from "axios"
const url = `http://www.mocky.io/v2/5ba8efb23100007200c2750c`

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("")



  useEffect(() => {
    getData();
  }, []);


  const getData = async () => {
    try {
      if (typeof window !== "undefined") {
        await axios.get(
          url
        ).then((res) => {
          if (res?.status === 200) {
            console.log(res.data);
            setData(res?.data);
          } else {
            setData([]);
          }
        });
      }
    } catch (error) {
      setData([]);
    }
  };

  // const filteredProducts = data.filter((product) => {
  //   return String(product?.items)?.toLowerCase()?.includes(query.toLowerCase()) ||
  //     String(product?.name)?.toLowerCase()?.includes(query.toLowerCase()) ||
  //     String(product?.address)?.toLowerCase()?.includes(query.toLowerCase()) ||
  //     String(product?.id)?.toLowerCase()?.includes(query.toLowerCase()) ||
  //     String(product?.pincode)?.toLowerCase()?.includes(query.toLowerCase());
  // });

  const filteredProducts = data.filter((obj) => {
    return Object.keys(obj).some((key) => {
      return String(obj[key]).toLowerCase().includes(query.toLowerCase());
    })
  });

  const boldString = (fString, bString, id = false) => {
    const regex = new RegExp(bString, "i");
    const str = bString.toLowerCase();
    if (id) {
      return fString.replace(regex, `<i class="highlightID">${str}</i>`);
    } else {
      return fString.replace(regex, `<i class="highlight">${str}</i>`);
    }
  };

  return (
    <div className="App">
      <input className='input' placeholder="Search something" onChange={event => setQuery(event.target.value)}/>
      {query.length > 0 && <div className='cardContainer'>
        {filteredProducts?.length > 0 && filteredProducts?.map((item) => (
          <div className='card'>
            <p dangerouslySetInnerHTML={{
              __html: boldString(item.id, query, true)
            }}/>
            <p dangerouslySetInnerHTML={{
              __html: boldString(item.name, query)
            }}/>
            <p dangerouslySetInnerHTML={{
              __html: boldString(item.address, query)
            }}/>
            <p dangerouslySetInnerHTML={{
              __html: boldString(item.pincode, query)
            }}/>
            {item.items?.map((i) => (
              <ul>
                {query.length > 0 && i.toLowerCase().includes(query.toLowerCase()) &&
                <li className='leftAlign'><i className='highlight'>{query.toLowerCase()}</i> found in items</li>}
              </ul>
            ))}
          </div>
        ))}
        {!filteredProducts?.length && (
          <div>No items</div>
        )}
      </div>}
      {query?.length > 0 && !!filteredProducts.length && <p>Found {filteredProducts?.length} Results</p>}
    </div>
  );
}

export default App;
