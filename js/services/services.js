const postData = async (url, data ) => {   //ф-я отвечает за прстинг данных
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data

    });

    return await res.json();
};

const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok){
        throw new Error(`Could not fetch ${url}, status: ${res.status}`); //new Error() -Обьект ошибки
    }                                                  // throw - оператор ощибки, выкидывает ее
   
    return await res.json();
};


export{postData};
export{getResource};