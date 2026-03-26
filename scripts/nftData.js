let count;

const showNFT = (NFTs) => {
  count=0;

  //to display all nfts by default
  NFTs.forEach((data, i) => {
    if (data.nft_data) {
      data.nft_data.forEach((nft, j) => {
      //console.log("nft:",nft.external_data);

      let myComponent = document.createElement("my-component");
      let el = nft.external_data;
      let desc =
        el.description !== null
          ? el.description.length > 100
            ? `${el.description.substring(0, 100)}...`
            : el.description
          : "no description";

      myComponent.setAttribute("name", el.name);
      myComponent.setAttribute("desc", desc);
      myComponent.setAttribute("img", el.image_256);
      document.querySelector("#nft-container").appendChild(myComponent);
      count++;
     });
    }
    document.getElementById("total-NFTs").innerHTML = 'TOTAL: ' + count;
  });

  //console.log("NFTs", NFTs);
  const contOptions = document.createElement("div");
  contOptions.classList.add("options");

  const allcont = document.createElement("button"); //all nft button
  allcont.classList.add("selectallnft");
  allcont.innerHTML = "ALL";
  contOptions.appendChild(allcont);

  NFTs.forEach((data, i) => {

    //to create button according to contract name 
    const contName = document.createElement("button"); //nft button according to contract name
    contName.classList.add("selectnft");
    contName.innerHTML= data.contract_name;

    contOptions.appendChild(contName);

    //to display nfts according to contract name
    contName.onclick = function(){
      count=0;
      document.getElementById("nft-container").innerHTML = "";
              if (data.nft_data) {
                data.nft_data.forEach((nft, j) => {
                //console.log("nft:",nft.external_data);
        
                let myComponent = document.createElement("my-component");
                let el = nft.external_data;
                let desc =
                  el.description !== null
                    ? el.description.length > 100
                      ? `${el.description.substring(0, 100)}...`
                      : el.description
                    : "no description";
        
                myComponent.setAttribute("name", el.name);
                myComponent.setAttribute("desc", desc);
                myComponent.setAttribute("img", el.image_256);
                document.querySelector("#nft-container").appendChild(myComponent);
                count++;
               });
              }
            document.getElementById("total-NFTs").innerHTML = 'TOTAL: ' + count;
    }

  });

          document.getElementById("options").appendChild(contOptions);

          //to display all nfts
          allcont.onclick = function(){
            document.getElementById("nft-container").innerHTML = "";
            count=0;
            NFTs.forEach((data, i) => {
              if(data.nft_data)
              {
                data.nft_data.forEach((nft, j) => {
                //console.log("nft:",nft.external_data);
        
                let myComponent = document.createElement("my-component");
                let el = nft.external_data;
                let desc =
                  el.description !== null
                    ? el.description.length > 100
                      ? `${el.description.substring(0, 100)}...`
                      : el.description
                    : "no description";
        
                myComponent.setAttribute("name", el.name);
                myComponent.setAttribute("desc", desc);
                myComponent.setAttribute("img", el.image_256);
                document.querySelector("#nft-container").appendChild(myComponent);
                count++;
               });
              }
            });
            document.getElementById("total-NFTs").innerHTML = 'TOTAL: ' + count;
          }

};


const fetchNFTData = async () => {
  let nftHeaders = new Headers();
  nftHeaders.append("Authorization", `Basic ${API_KEY}`);
  let requestOptions = {
    method: "GET",
    headers: nftHeaders,
    redirect: "follow",
  };

  fetch(
    `${url}/${chain_id}/address/${address}/balances_v2/?nft=true&match={\"type\":\"nft\"}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      showNFT(result.data.items);
    })
    .catch((error) => console.log("error", error));
};

fetchNFTData();
