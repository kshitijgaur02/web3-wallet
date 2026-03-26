const chain_id = "1";
const API_KEY = "Y2tleV9lZDMzOTIyNjFlNzA0MzA0ODI1MjZkMzgyYjA6"; // your covalent API key else Y2tleV9lZDMzOTIyNjFlNzA0MzA0ODI1MjZkMzgyYjA6
const url = "https://api.covalenthq.com/v1";
const address = "0x51688cd36c18891167e8036bde2a8fb10ec80c43"; // address of the user (chain id 137)
// const address = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"; // vitalik's, use whenever required
// const address = "0x00d7c902fbbcd3c9db2da80a439c94486c50eb81"; // only 1 nft (chain id 1)
// const address = "0x51688cd36c18891167e8036bde2a8fb10ec80c43"; // use this to check the nfts (chain id 1 and 137)

let tokenList;
var balanceSum = 0;



const fetchData = () => {
  let myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Basic ${API_KEY}`
  );
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${url}/${chain_id}/address/${address}/balances_v2/`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      tokenList = data.data.items;

      createImg = (src) => {
        let img = document.createElement("img");
        img.src = src;
        img.className = "token-logo";
        return img;
      };

      truncate = (str) => {
        if (str.length > 8) {
          return str.slice(0, 4) + "..." + str.slice(-2);
        }
        return str;
      };

      //    getting images from the cryptoicons.io and create & return an img tag. It will return an img with default image if the crypto is not found.
      getImage = async (symbol) => {
        let src;
        await fetch(
          `./node_modules/cryptocurrency-icons/svg/color/${symbol}.svg`
        )
          .then((response) => {
            if (response.status === 404) {
              src = "./node_modules/cryptocurrency-icons/svg/color/generic.svg";
            } else
              src = `./node_modules/cryptocurrency-icons/svg/color/${symbol}.svg`;
          })
          .catch((err) => {
            console.log("err", err);
          });

        const tokenImg = await createImg(src);
        return tokenImg;
      };

      

      //   not really a fan of the code below. I would like to take some other approach
      tokenList.forEach(async (token) => {
        const tokenList = document.createElement("div");
        tokenList.classList.add("tokens");

        let tokenImg = await getImage(token.contract_ticker_symbol);

        // creating token name element
        const tokenName = document.createElement("h4");
        tokenName.classList.add("token-call");
        tokenName.innerHTML = token.contract_name;

        // create tokenOuter element and put the token img and token name inside tokenOuter
        let tokenOuter = document.createElement("div");
        tokenOuter.classList.add("token-name");
        tokenOuter.appendChild(tokenImg);
        tokenOuter.appendChild(tokenName);

        // put the tokenOuter inside tokenList
        tokenList.appendChild(tokenOuter);

        // create token balance element
        const tokenBalance = document.createElement("div");
        tokenBalance.classList.add("token-balance");
        tokenBalance.innerHTML = `<div>${truncate(token.balance)} ${
          token.contract_ticker_symbol
        }</div> <div>$ ${token.quote}</div>`;

        tokenList.appendChild(tokenBalance);

        // put the tokenList inside the main container
        document.getElementById("token-container").appendChild(tokenList);

        if(token.quote>0){
          balanceSum += token.quote;
          console.log("forEach",balanceSum);}
         
        
      });
      
      setTimeout(() => {
        let totalBalance = document.getElementById("total-balance");
        totalBalance.innerText = "Balance: $" + balanceSum;
      },100); 
      
    })
    .catch((err) => {
      console.log("err", err);
    });


     
    
};



fetchData();








