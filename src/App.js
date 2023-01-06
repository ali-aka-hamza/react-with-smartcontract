import './App.css';
//import Web3 from 'web3';
import React, { Component } from 'react';
import HelloWorld from './contracts/HelloWorld.json';
import getWeb3 from './getWeb3';

import $ from 'jquery';
// import data from './HelloWorld.json';
// //import TruffleContract from 'truffle-contract';
// import { HELLO_WORLD_ABI, HELLO_WORLD_ADDRESS } from './config';
//var TruffleContract = require('truffle-contract');
class App extends Component {
 
state = { winnerNa:'',votee : '' ,storageValue: 0, web3: null, accounts: null, contract: null, balances: '', address:'', amount:'' };

componentDidMount = async () => {
  try {
    // Get network provider and web3 instance.
    const web3 = await getWeb3();

    // Use web3 to get the user's accounts.
    const accounts = await web3.eth.getAccounts();

    // Get the contract instance.
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = HelloWorld.networks[networkId];
    const instance = new web3.eth.Contract(
      HelloWorld.abi,
      deployedNetwork && deployedNetwork.address,
    );

    // Set web3, accounts, and contract to the state, and then proceed with an
    // example of interacting with the contract's methods.
    this.setState({ web3, accounts, contract: instance }, this.runExample);
  } catch (error) {
    // Catch any errors for any of the above operations.
    alert(
      `Failed to load web3, accounts, or contract. Check console for details.`,
    );
    console.error(error);
  }
};

runExample = async () => {
  const { accounts, contract } = this.state;

  // Get the value from the contract to prove it worked.
  const response = await contract.methods.winnerName().call();
  let balanceresult = await Promise.all (accounts.map(async (account) => {
    return await contract.methods.winnerName().call();
  } ) );
  
  // Update state with the result.
  this.setState({ storageValue: response, balances: balanceresult });
};

// Fectch panels name from database

fetchPanels = async () => {
  const { accounts, contract } = this.state;
  var g = document.getElementById('div-vote');
  let r = g.getElementsByTagName('input');
  for(let i=0;i<r.length;i++){
  contract.methods.addPanel(r[i].id).send({from: accounts[0]});
  // let panelnames = await Promise.all (accounts.map(async (account) => {
  //   return await contract.methods.addPanel(r[i]).call(account);
  // } ) );

  }

}

castevote = async ()=>{
  const { accounts, contract } = this.state;
  var NAME = $("input[type='radio'][name='count']:checked").val();
  //const response = await contract.methods.vote(NAME).call();
  contract.methods.vote(NAME).send({from: accounts[0]});

 
  
}
winner = async ()=>{
  const { accounts, contract } = this.state;
 // const response = await contract.methods.winnerName().call();
  const response = await contract.methods.winnerName().call();
  // let balanceresult = await Promise.all (accounts.map(async (account) => {
  //   return await contract.methods.winnerName().call();
  // } ) );
  this.setState({ winnerNa: response});

}
render() {
  if (!this.state.web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
        <>
    <div id="div-vote">
      <div>
        <h1>panel 111</h1>
        <input type="radio" id="panel 111" name="count" value="panel 111" />
      </div>

      <div>
        <h1>panel 112</h1>
        <input type="radio" id="panel 112" name="count" value="panel 112" />
      </div>

      <div>
        <h1>panel 113</h1>
        <input type="radio" id="panel 113" name="count" value="panel 113" />

        <br />

        <button id="setName" onClick={this.castevote.bind(this)}>VOTE</button>
        <button id="getName" onClick={this.winner.bind(this)}>SHOW</button>
      </div>
    </div>
    <div class="container">
      <div>
        <label class="center-label" for="output">OUTPUT </label>
        <div id="output">{this.state.winnerNa}</div>
      </div>
    </div>
    <div class="container">
      <div>
        <label class="center-label" for="errorHolder">ERROR</label>
        <div id="errorHolder">None</div>
      </div>
    </div>
    </>
  );
}
}


  //   if (window.ethereum) {
  //     window.web3 = new Web3(window.ethereum);
  //     await window.ethereum.enable();
  //   }
  //   else if (window.web3) {
  //     window.web3 = new Web3(window.web3.currentProvider);
  //   }
  //   else {
  //     window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
  //   }
  // }
  // loadWeb3();
 // async function loadWeb3() {

  //   componentWillMount() {
//     this.loadBlockchainData();
//   }
//   async loadBlockchainData() {
//     var contr = {};
//    // const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8081");
//     const web3 = new Web3.providers.HttpProvider("http://127.0.0.1:8081");
//    // const network = await web3.eth.net.getNetworkType();
//     //console.log("network : ",network);
//     const cc = new Web3(web3);
//     console.log("web3 : ",cc);
//     const accounts = await cc.eth.getAccounts();
//     console.log("accounts : ",accounts[0]);
//     this.setState({ account: accounts[0] })
//     const helloworld = new cc.eth.Contract(HELLO_WORLD_ABI, HELLO_WORLD_ADDRESS);
//     this.setState({ helloworld })
//     console.log("helloworld : ",helloworld);
//     const taskCount = await helloworld.methods.addPanel("b").call();
//     console.log("taskCount : ",taskCount);
//     const taskCount2 = await helloworld.methods.vote("b").call();
//     console.log("taskCount2 : ",taskCount2);
//     //console.log("data : ",data);
//     // function getdata(){
//     //   var hwArtifact = data;
//     //   contr.helloworld = TruffleContract(hwArtifact);
//     //   contr.helloworld.setProvider(web3);
//     //   console.log("contr : ",contr);
//     // }

//     // contr.helloworld.deployed().then(function (obj) {
//     //   return obj.vote.sendTransaction("NAME", { from: accounts[0] });
//     // }).then(function (result) {
//     //   console.log(result);
//     //   console.log("Name submitted as a txn");
//     // }).catch(function (error) {
//     //   console.log("ERROR ExeInputUser");
//     // });
    
//     // getdata();
    

//   }
//   constructor(props) {
//     super(props)
//     this.state = {
//       account: '',
//       helloworld: null,
//       taskCount: 0,
//     }
//   }
  

//   render(){
//   return (
//     <div className="container">
//     <h1>Hello World  </h1>
//     <p>Your accounts: {this.state.account} </p>
//     </div>
//   );
// }
// }

// function App() {
//   return (
//     <>
//     <div id="div-vote">
//       <div>
//         <h1>panel 111</h1>
//         <input type="radio" id="panel 111" name="count" value="panel 111" />
//       </div>

//       <div>
//         <h1>panel 112</h1>
//         <input type="radio" id="panel 112" name="count" value="panel 112" />
//       </div>

//       <div>
//         <h1>panel 113</h1>
//         <input type="radio" id="panel 113" name="count" value="panel 113" />

//         <br />

//         <button id="setName">VOTE</button>
//         <button id="getName">SHOW</button>
//       </div>
//     </div>
//     <div class="container">
//       <div>
//         <label class="center-label" for="output">OUTPUT </label>
//         <div id="output">None</div>
//       </div>
//     </div>
//     <div class="container">
//       <div>
//         <label class="center-label" for="errorHolder">ERROR</label>
//         <div id="errorHolder">None</div>
//       </div>
//     </div>
//     </>
//   )
// }

export default App;
