# deployment of the first test interface of the
from web3 import Web3

contract_bytecode = "608060405234801561000f575f80fd5b50611e5e8061001d5f395ff3fe608060405234801561000f575f80fd5b50600436106100e8575f3560e01c80635a7fb9d71161008a578063a87430ba11610064578063a87430ba14610240578063bf50184414610275578063ed1a998d146102a5578063fb73bc64146102d5576100e8565b80635a7fb9d7146101d857806391382b57146101f4578063a7ca961514610210576100e8565b80632b946252116100c65780632b946252146101405780635110063b1461015c57806351dad8ae1461017857806356abb5d9146101a8576100e8565b8063022e9066146100ec5780630ea5e4191461010857806326e0ad0314610124575b5f80fd5b610106600480360381019061010191906113c0565b610305565b005b610122600480360381019061011d91906113c0565b6103a7565b005b61013e600480360381019061013991906113c0565b610449565b005b61015a6004803603810190610155919061141a565b6104eb565b005b610176600480360381019061017191906113c0565b61077b565b005b610192600480360381019061018d919061155f565b61081d565b60405161019f9190611604565b60405180910390f35b6101c260048036038101906101bd919061155f565b6108ec565b6040516101cf9190611604565b60405180910390f35b6101f260048036038101906101ed9190611624565b6109bb565b005b61020e600480360381019061020991906113c0565b610a57565b005b61022a6004803603810190610225919061155f565b610af9565b6040516102379190611604565b60405180910390f35b61025a6004803603810190610255919061155f565b610bc8565b60405161026c969594939291906116a9565b60405180910390f35b61028f600480360381019061028a919061172b565b610ebc565b60405161029c9190611604565b60405180910390f35b6102bf60048036038101906102ba919061155f565b610f6f565b6040516102cc9190611604565b60405180910390f35b6102ef60048036038101906102ea919061155f565b61103e565b6040516102fc9190611604565b60405180910390f35b805f808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2060050190816103519190611975565b508173ffffffffffffffffffffffffffffffffffffffff167ff5465bf5342a4f1925a69b8034c58851a693a41d6687efd81d7519a92239058f82600160405161039b929190611a5e565b60405180910390a25050565b805f808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2060010190816103f39190611975565b508173ffffffffffffffffffffffffffffffffffffffff167fb18109d56de47f8f3fb67ef94c48b15b5bb4a6fdde6dcac27a00857b7166509382600160405161043d929190611a5e565b60405180910390a25050565b805f808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2060030190816104959190611975565b508173ffffffffffffffffffffffffffffffffffffffff167f11367dad338e86b55574e55dbad877633c889d17456c7fb3ae4ea1a89c18cf238260016040516104df929190611a5e565b60405180910390a25050565b5f73ffffffffffffffffffffffffffffffffffffffff165f808973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146105b6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105ad90611ad6565b60405180910390fd5b5f6001826040516105c79190611b2e565b908152602001604051809103902080546105e09061179f565b905014610622576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161061990611b8e565b60405180910390fd5b5f6040518060c001604052808973ffffffffffffffffffffffffffffffffffffffff168152602001888152602001878152602001868152602001858152602001848152509050805f808a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f820151815f015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010190816106fe9190611975565b5060408201518160020190816107149190611975565b50606082015181600301908161072a9190611975565b5060808201518160040190816107409190611975565b5060a08201518160050190816107569190611975565b509050505f6107648961110d565b905061077083826109bb565b505050505050505050565b805f808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2060020190816107c79190611975565b508173ffffffffffffffffffffffffffffffffffffffff167f476add05a5729fa7ac341833a53b4e6bafa9fce7e320778009a503c27acb9740826001604051610811929190611a5e565b60405180910390a25050565b60605f808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2060050180546108699061179f565b80601f01602080910402602001604051908101604052809291908181526020018280546108959061179f565b80156108e05780601f106108b7576101008083540402835291602001916108e0565b820191905f5260205f20905b8154815290600101906020018083116108c357829003601f168201915b50505050509050919050565b60605f808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2060030180546109389061179f565b80601f01602080910402602001604051908101604052809291908181526020018280546109649061179f565b80156109af5780601f10610986576101008083540402835291602001916109af565b820191905f5260205f20905b81548152906001019060200180831161099257829003601f168201915b50505050509050919050565b5f6001836040516109cc9190611b2e565b908152602001604051809103902080546109e59061179f565b905014610a27576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a1e90611bf6565b60405180910390fd5b80600183604051610a389190611b2e565b90815260200160405180910390209081610a529190611975565b505050565b805f808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f206004019081610aa39190611975565b508173ffffffffffffffffffffffffffffffffffffffff167ffe7de045050b107eac8e27cb35d4d684535c55b2f8e008c4d8771a771f789b08826001604051610aed929190611a5e565b60405180910390a25050565b60605f808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f206004018054610b459061179f565b80601f0160208091040260200160405190810160405280929190818152602001828054610b719061179f565b8015610bbc5780601f10610b9357610100808354040283529160200191610bbc565b820191905f5260205f20905b815481529060010190602001808311610b9f57829003601f168201915b50505050509050919050565b5f602052805f5260405f205f91509050805f015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806001018054610c0b9061179f565b80601f0160208091040260200160405190810160405280929190818152602001828054610c379061179f565b8015610c825780601f10610c5957610100808354040283529160200191610c82565b820191905f5260205f20905b815481529060010190602001808311610c6557829003601f168201915b505050505090806002018054610c979061179f565b80601f0160208091040260200160405190810160405280929190818152602001828054610cc39061179f565b8015610d0e5780601f10610ce557610100808354040283529160200191610d0e565b820191905f5260205f20905b815481529060010190602001808311610cf157829003601f168201915b505050505090806003018054610d239061179f565b80601f0160208091040260200160405190810160405280929190818152602001828054610d4f9061179f565b8015610d9a5780601f10610d7157610100808354040283529160200191610d9a565b820191905f5260205f20905b815481529060010190602001808311610d7d57829003601f168201915b505050505090806004018054610daf9061179f565b80601f0160208091040260200160405190810160405280929190818152602001828054610ddb9061179f565b8015610e265780601f10610dfd57610100808354040283529160200191610e26565b820191905f5260205f20905b815481529060010190602001808311610e0957829003601f168201915b505050505090806005018054610e3b9061179f565b80601f0160208091040260200160405190810160405280929190818152602001828054610e679061179f565b8015610eb25780601f10610e8957610100808354040283529160200191610eb2565b820191905f5260205f20905b815481529060010190602001808311610e9557829003601f168201915b5050505050905086565b6001818051602081018201805184825260208301602085012081835280955050505050505f915090508054610ef09061179f565b80601f0160208091040260200160405190810160405280929190818152602001828054610f1c9061179f565b8015610f675780601f10610f3e57610100808354040283529160200191610f67565b820191905f5260205f20905b815481529060010190602001808311610f4a57829003601f168201915b505050505081565b60605f808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f206002018054610fbb9061179f565b80601f0160208091040260200160405190810160405280929190818152602001828054610fe79061179f565b80156110325780601f1061100957610100808354040283529160200191611032565b820191905f5260205f20905b81548152906001019060200180831161101557829003601f168201915b50505050509050919050565b60605f808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20600101805461108a9061179f565b80601f01602080910402602001604051908101604052809291908181526020018280546110b69061179f565b80156111015780601f106110d857610100808354040283529160200191611101565b820191905f5260205f20905b8154815290600101906020018083116110e457829003601f168201915b50505050509050919050565b60605f8273ffffffffffffffffffffffffffffffffffffffff165f1b90505f602a67ffffffffffffffff8111156111475761114661129c565b5b6040519080825280601f01601f1916602001820160405280156111795781602001600182028036833780820191505090505b5090505f5b601481101561120e575f8160086111959190611c41565b60026111a19190611db1565b845f1c6111ae9190611c41565b5f1b905080836002846111c19190611c41565b815181106111d2576111d1611dfb565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191690815f1a90535050808060010191505061117e565b508092505050919050565b5f604051905090565b5f80fd5b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6112538261122a565b9050919050565b61126381611249565b811461126d575f80fd5b50565b5f8135905061127e8161125a565b92915050565b5f80fd5b5f80fd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6112d28261128c565b810181811067ffffffffffffffff821117156112f1576112f061129c565b5b80604052505050565b5f611303611219565b905061130f82826112c9565b919050565b5f67ffffffffffffffff82111561132e5761132d61129c565b5b6113378261128c565b9050602081019050919050565b828183375f83830152505050565b5f61136461135f84611314565b6112fa565b9050828152602081018484840111156113805761137f611288565b5b61138b848285611344565b509392505050565b5f82601f8301126113a7576113a6611284565b5b81356113b7848260208601611352565b91505092915050565b5f80604083850312156113d6576113d5611222565b5b5f6113e385828601611270565b925050602083013567ffffffffffffffff81111561140457611403611226565b5b61141085828601611393565b9150509250929050565b5f805f805f805f60e0888a03121561143557611434611222565b5b5f6114428a828b01611270565b975050602088013567ffffffffffffffff81111561146357611462611226565b5b61146f8a828b01611393565b965050604088013567ffffffffffffffff8111156114905761148f611226565b5b61149c8a828b01611393565b955050606088013567ffffffffffffffff8111156114bd576114bc611226565b5b6114c98a828b01611393565b945050608088013567ffffffffffffffff8111156114ea576114e9611226565b5b6114f68a828b01611393565b93505060a088013567ffffffffffffffff81111561151757611516611226565b5b6115238a828b01611393565b92505060c088013567ffffffffffffffff81111561154457611543611226565b5b6115508a828b01611393565b91505092959891949750929550565b5f6020828403121561157457611573611222565b5b5f61158184828501611270565b91505092915050565b5f81519050919050565b5f82825260208201905092915050565b5f5b838110156115c15780820151818401526020810190506115a6565b5f8484015250505050565b5f6115d68261158a565b6115e08185611594565b93506115f08185602086016115a4565b6115f98161128c565b840191505092915050565b5f6020820190508181035f83015261161c81846115cc565b905092915050565b5f806040838503121561163a57611639611222565b5b5f83013567ffffffffffffffff81111561165757611656611226565b5b61166385828601611393565b925050602083013567ffffffffffffffff81111561168457611683611226565b5b61169085828601611393565b9150509250929050565b6116a381611249565b82525050565b5f60c0820190506116bc5f83018961169a565b81810360208301526116ce81886115cc565b905081810360408301526116e281876115cc565b905081810360608301526116f681866115cc565b9050818103608083015261170a81856115cc565b905081810360a083015261171e81846115cc565b9050979650505050505050565b5f602082840312156117405761173f611222565b5b5f82013567ffffffffffffffff81111561175d5761175c611226565b5b61176984828501611393565b91505092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f60028204905060018216806117b657607f821691505b6020821081036117c9576117c8611772565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f6008830261182b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826117f0565b61183586836117f0565b95508019841693508086168417925050509392505050565b5f819050919050565b5f819050919050565b5f61187961187461186f8461184d565b611856565b61184d565b9050919050565b5f819050919050565b6118928361185f565b6118a661189e82611880565b8484546117fc565b825550505050565b5f90565b6118ba6118ae565b6118c5818484611889565b505050565b5b818110156118e8576118dd5f826118b2565b6001810190506118cb565b5050565b601f82111561192d576118fe816117cf565b611907846117e1565b81016020851015611916578190505b61192a611922856117e1565b8301826118ca565b50505b505050565b5f82821c905092915050565b5f61194d5f1984600802611932565b1980831691505092915050565b5f611965838361193e565b9150826002028217905092915050565b61197e8261158a565b67ffffffffffffffff8111156119975761199661129c565b5b6119a1825461179f565b6119ac8282856118ec565b5f60209050601f8311600181146119dd575f84156119cb578287015190505b6119d5858261195a565b865550611a3c565b601f1984166119eb866117cf565b5f5b82811015611a12578489015182556001820191506020850194506020810190506119ed565b86831015611a2f5784890151611a2b601f89168261193e565b8355505b6001600288020188555050505b505050505050565b5f8115159050919050565b611a5881611a44565b82525050565b5f6040820190508181035f830152611a7681856115cc565b9050611a856020830184611a4f565b9392505050565b7f5573657220616c726561647920657869737473000000000000000000000000005f82015250565b5f611ac0601383611594565b9150611acb82611a8c565b602082019050919050565b5f6020820190508181035f830152611aed81611ab4565b9050919050565b5f81905092915050565b5f611b088261158a565b611b128185611af4565b9350611b228185602086016115a4565b80840191505092915050565b5f611b398284611afe565b915081905092915050565b7f50726976617465206b657920616c726561647920696e207573650000000000005f82015250565b5f611b78601a83611594565b9150611b8382611b44565b602082019050919050565b5f6020820190508181035f830152611ba581611b6c565b9050919050565b7f50726976617465206b657920616c7265616479206d61707065640000000000005f82015250565b5f611be0601a83611594565b9150611beb82611bac565b602082019050919050565b5f6020820190508181035f830152611c0d81611bd4565b9050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f611c4b8261184d565b9150611c568361184d565b9250828202611c648161184d565b91508282048414831517611c7b57611c7a611c14565b5b5092915050565b5f8160011c9050919050565b5f808291508390505b6001851115611cd757808604811115611cb357611cb2611c14565b5b6001851615611cc25780820291505b8081029050611cd085611c82565b9450611c97565b94509492505050565b5f82611cef5760019050611daa565b81611cfc575f9050611daa565b8160018114611d125760028114611d1c57611d4b565b6001915050611daa565b60ff841115611d2e57611d2d611c14565b5b8360020a915084821115611d4557611d44611c14565b5b50611daa565b5060208310610133831016604e8410600b8410161715611d805782820a905083811115611d7b57611d7a611c14565b5b611daa565b611d8d8484846001611c8e565b92509050818404811115611da457611da3611c14565b5b81810290505b9392505050565b5f611dbb8261184d565b9150611dc68361184d565b9250611df37fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8484611ce0565b905092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52603260045260245ffdfea2646970667358221220fd6e3fe2e84304e6bd050a573b288c52de751cecad971afd9579b404373e6cb264736f6c63430008160033"
contract_abi = [
	{
		"anonymous": False,
		"inputs": [
			{
				"indexed": True,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"indexed": False,
				"internalType": "string",
				"name": "newContact",
				"type": "string"
			},
			{
				"indexed": False,
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"name": "ContactUpdated",
		"type": "event"
	},
	{
		"anonymous": False,
		"inputs": [
			{
				"indexed": True,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"indexed": False,
				"internalType": "string",
				"name": "newDOB",
				"type": "string"
			},
			{
				"indexed": False,
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"name": "DOBUpdated",
		"type": "event"
	},
	{
		"anonymous": False,
		"inputs": [
			{
				"indexed": True,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"indexed": False,
				"internalType": "string",
				"name": "newEmail",
				"type": "string"
			},
			{
				"indexed": False,
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"name": "EmailUpdated",
		"type": "event"
	},
	{
		"anonymous": False,
		"inputs": [
			{
				"indexed": True,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"indexed": False,
				"internalType": "string",
				"name": "newImage",
				"type": "string"
			},
			{
				"indexed": False,
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"name": "ImageUpdated",
		"type": "event"
	},
	{
		"anonymous": False,
		"inputs": [
			{
				"indexed": True,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"indexed": False,
				"internalType": "string",
				"name": "newUsername",
				"type": "string"
			},
			{
				"indexed": False,
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"name": "UsernameUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_image",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_contact",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_dob",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_privateKey",
				"type": "string"
			}
		],
		"name": "createUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "getContactByAddress",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "getDOBByAddress",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "getEmailByAddress",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "getImageByAddress",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "getUsernameByAddress",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_privateKey",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_userAddress",
				"type": "string"
			}
		],
		"name": "mapPrivateKeyToPublicKey",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "privateKeyToPublicKey",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_newContact",
				"type": "string"
			}
		],
		"name": "updateContact",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_newDOB",
				"type": "string"
			}
		],
		"name": "updateDOB",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_newEmail",
				"type": "string"
			}
		],
		"name": "updateEmail",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_newImage",
				"type": "string"
			}
		],
		"name": "updateImage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_newUsername",
				"type": "string"
			}
		],
		"name": "updateUsername",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "users",
		"outputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "username",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "image",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "contact",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dob",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]



# deploying the contract
# Ethereum node endpoint (replace with your own endpoint)
ethereum_node_url = "https://goerli.infura.io/v3/b4e87e31b3df4aba9f33d76ec45a139d"

# Account private key (replace with your own private key)
private_key = "7fd14eed812ee800b2e7d536090d5d514a2341bea36b04efba90a8d9abaf94b1"

# Connect to the Ethereum node
w3 = Web3(Web3.HTTPProvider(ethereum_node_url))

account = "0x5780326e9F221afd01253C954b453ccCf4f2F30E"

# Build the contract
contract = w3.eth.contract(abi=contract_abi, bytecode=contract_bytecode)

# Estimate gas for the constructor
gas_estimate = contract.constructor().estimate_gas()

# Build the transaction
construct_txn = contract.constructor().build_transaction({
    'from': account,
    'gas':int(gas_estimate * 2),
    'gasPrice': w3.to_wei('40', 'gwei'),
    'nonce': w3.eth.get_transaction_count(account),
})

# Sign the transaction
signed_txn = w3.eth.account.sign_transaction(construct_txn, private_key)

# Send the transaction
transaction_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)

# Wait for the transaction to be mined
transaction_receipt = w3.eth.wait_for_transaction_receipt(transaction_hash, )

# Get the deployed contract address
contract_address = transaction_receipt['contractAddress']

print("Contract deployed at address:", contract_address)